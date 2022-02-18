<?php
require_once GALAXYTOOL_ROOT."/secret/includes/config/DatabaseConfig.inc.php";
/*
* Class to convert the XML content into php variables and to insert the content into
* corresponding datebase tables.
*
*/

class ReportParser extends XMLParserGlobal{

	private $reporttable = "";
	private $galaxytable = "";
	private $unknown_entries_error_object = null;
	private $unknown_entries_found = false;


	//private $db_index = DB_INDEX_FIELDS;

	// resources you will lose at fleet
    //private $fleet_array = FLEET_ARRAY;

	// resources you will lose at def
	//private $defence_array = DEFENCE_ARRAY;

	// attention - this is a copy of the $db_array in general.inc.php! Always adjust both files if needed
	//private $db_array = DB_ARRAY;



	function __construct($reporttable,$galaxytable,$playertable,$utablename,$universe) {
		$this->xml_schema = "xml_schema/reports.xsd";
		//  call super constructor
		$result = parent::__construct("DUMMY_TABLE_NAME",$playertable,$utablename,$universe);
		if ($result == false) {
			return false;
		}

		// local setup
		if (trim($galaxytable) == "") return false;
		if (trim($reporttable) == "") return false;

		$this->galaxytable = $galaxytable;
		$this->reporttable = $reporttable;

		return $this;
	}

	public function insert_data($xml_content) {
		$xdoc = $this->validate_header($xml_content,XMLParserGlobal::content_type_reports  );
		if ($xdoc === false) {
			return false;
		}

		if ($this->unknown_entries_error_object == null) {
			$this->unknown_entries_error_object = new ErrorObject(ErrorObject::severity_warning , REPORTS_UNKNOWN_ENTRIES);
		}


		$result = $this->insert_report($xdoc,$this->userid);

		if ($result === true && $this->unknown_entries_found === true) {
			$this->error_object = $this->unknown_entries_error_object;
			$result = false;
		}

		// add error or success messages
		$this->check_result2($result);

		return $result;
	}

	private function insert_report($xdoc,$userid) {
		$reports = $xdoc->getElementsByTagName("report");
		$reports_data = array();

		foreach($reports as $report) {
			// extract information from XML file
			$report_data = $this->get_report_data($report);
			// store results
			$reports_data[] = $report_data;
		}
		unset($reports);
		unset($xdoc);

		if ($this->update_reports_at_database($reports_data,$userid)) {
			return true;
		} else {
			return false;
		}
	}

	private function get_report_data($report_DOMNode) {
		$return_value = [];
		$return_value["playername"] = trim($report_DOMNode->getAttribute("playername"));
		$return_value["planetname"] = trim($report_DOMNode->getAttribute("planetname"));
		$return_value["moon"]       = $report_DOMNode->getAttribute("moon");
		$return_value["galaxy"]     = $report_DOMNode->getAttribute("galaxy");
		$return_value["system"]     = $report_DOMNode->getAttribute("system");
		$return_value["planet"]     = $report_DOMNode->getAttribute("planet");
		$return_value["datetime"]   = $report_DOMNode->getAttribute("datetime");
		$return_value["scandepth"]  = $report_DOMNode->getAttribute("scandepth");

		switch ($return_value["scandepth"]) {
			case "fleet": $return_value["scandepth"] = 2; break;
			case "defence": $return_value["scandepth"] = 3; break;
			case "buildings": $return_value["scandepth"] = 4; break;
			case "research": $return_value["scandepth"] = 5; break;
			default: $return_value["scandepth"] = 1; break;
		}

		if ($report_DOMNode->hasAttribute("msg_id")) {
			$return_value["msg_id"]     = $report_DOMNode->getAttribute("msg_id");
		} else {
			$return_value["msg_id"]     = null;
		}

		$return_value["entries"]    = array();

		$report_entries_DOMNode = $report_DOMNode->getElementsByTagName("entry");
		foreach ($report_entries_DOMNode as $entry_DOMNode) {
			$return_value["entries"][] = array(
                "name" => $entry_DOMNode->getAttribute("name"),
                "amount" => $entry_DOMNode->getAttribute("amount")
            );
		}

		return $return_value;
	}

	private function delete_existing_reports_from_array(array &$reports) {

		$report_ids = array();
		foreach ($reports as $report) {
			if ($report['msg_id'] != null) 	array_push($report_ids,$report['msg_id']);
		}

		// check which IDs exist on DB level
		$query = "SELECT `msg_id` FROM `".$this->reporttable."` WHERE `msg_id` IN ('".implode("','",$report_ids)."')";
		$stmt = $this->query($query);
		if (!$stmt) {
			$this->error_object = new ErrorObject(ErrorObject::severity_error , "DB error occurred while checking for existing reports");
			$this->error_object->add_child_message($this->get_db_error_object());
			return false;
		}

		$existing_reports = [];
		while ($line = $stmt->fetch(PDO::FETCH_OBJ)) {
			$existing_reports[$line->msg_id] = "";
		}
		unset($res);
		unset($line);
		unset($report_ids);


		foreach ($reports as $key => &$report) {
			if (isset($existing_reports[$report['msg_id']])) {
				// delete message from array
				unset($reports[$key]);
			}
		}

	}

	private function update_reports_at_database(array $reports,$userid) {
		$this->delete_existing_reports_from_array($reports);

		if (count($reports) == 0) return true;

		foreach ($reports as $report) {
			$unknown_entries_occured = false;

			// initialize entries array
			$entries_array = [];
			$fleet_df   = 0;
			$defence_df = 0;

			// use all english texts to determine the position in the entries array where to store the amount
			$unknown_entries = new ErrorObject(ErrorObject::severity_warning , REPORTS_UNKNOWN_ENTRIES." ".$report["galaxy"].":".$report["system"].":".$report["planet"]);

            foreach ($report["entries"] as $entry) {
				if (isset(DB_REPORT_ARRAY[$entry["name"]])) {
					$entries_array[DB_REPORT_ARRAY[$entry["name"]]["DBFIELD"]] = intval($entry["amount"]);

					// calculate fleet debris
					if (isset(DB_REPORT_ARRAY[$entry["name"]]["TYPE"]) && DB_REPORT_ARRAY[$entry["name"]]["TYPE"] == "fleet") {
						$fleet_df += (DB_REPORT_ARRAY[$entry["name"]]["MATERIAL"] * $entry["amount"]);
					}
					// calculate defense debris
					if (isset(DB_REPORT_ARRAY[$entry["name"]]["TYPE"]) && DB_REPORT_ARRAY[$entry["name"]]["TYPE"] == "defense") {
						$defence_df += (DB_REPORT_ARRAY[$entry["name"]]["MATERIAL"] * $entry["amount"]);
					}
				} else {
					// unknown entries
					$unknown_entries->add_child_message(new ErrorObject(ErrorObject::severity_warning , $entry["name"]));
					$unknown_entries_occured = true;
				}
			}

			// second moon detection (Lunarbase, sensorphalanx or jumpgate exist)
			$moon = $report["moon"];
			if (
                    $entries_array[DB_REPORT_ARRAY[B_LUNARBASE]["DBFIELD"]] > 0
                ||  $entries_array[DB_REPORT_ARRAY[B_SENSORPHALANX]["DBFIELD"]] > 0
                ||  $entries_array[DB_REPORT_ARRAY[B_JUMPGATE]["DBFIELD"]] > 0
            ) {
				$moon = "true";
			}

            // calculate max range for phalanx
            if ($entries_array[DB_REPORT_ARRAY[B_SENSORPHALANX]["DBFIELD"]] > 0) {
                $min_phalanx = ($report["system"] - (($entries_array[DB_REPORT_ARRAY[B_SENSORPHALANX]["DBFIELD"]]*$entries_array[DB_REPORT_ARRAY[B_SENSORPHALANX]["DBFIELD"]])-1));
                if ($min_phalanx < 0){
                    $min_phalanx = 0;
                }
                $max_phalanx = ($report["system"] + (($entries_array[DB_REPORT_ARRAY[B_SENSORPHALANX]["DBFIELD"]]*$entries_array[DB_REPORT_ARRAY[B_SENSORPHALANX]["DBFIELD"]])-1));
            } else {
                $min_phalanx = 0;
                $max_phalanx = 0;
            }

            // calculate max range for rockets
            if ($entries_array[DB_REPORT_ARRAY[B_ROCKETSILO]["DBFIELD"]] > 3 && $entries_array[DB_REPORT_ARRAY[RS_IMPULSEENGINE]["DBFIELD"]] > 0) { // rocket silo and impulse tech
                $min_rak = ($report["system"] - (($entries_array[DB_REPORT_ARRAY[RS_IMPULSEENGINE]["DBFIELD"]]*5)-1));
                if ($min_rak < 0){
                    $min_rak = 0; // to avoid problems with mysql unsigned data type
                }
                $max_rak = ($report["system"] + (($entries_array[DB_REPORT_ARRAY[RS_IMPULSEENGINE]["DBFIELD"]]*5)-1));
            } else {
                $min_rak = 0;
                $max_rak = 0;
            }

			// start building the query information
            $entries_array["galaxy"] = intval($report["galaxy"]);
            $entries_array["system"] = intval($report["system"]);
            $entries_array["planet"] = intval($report["planet"]);
            $entries_array["planetname"] = $report["planetname"];
            $entries_array["moon"] = $moon;
            $entries_array["msg_id"] = intval($report["msg_id"]);
            $entries_array["fleet_resis"] = intval($fleet_df);
            $entries_array["defence_resis"] = intval($defence_df);
            $entries_array["scantime"] = str_replace(".","-",$report["datetime"]);
            $entries_array["user_id"] = intval($userid);
            $entries_array["scanned"] = intval($report["scandepth"]);
            $entries_array["min_phalanx"] = intval($min_phalanx);
            $entries_array["max_phalanx"] = intval($max_phalanx);
            $entries_array["min_rak"] = intval($min_rak);
            $entries_array["max_rak"] = intval($max_rak);

			// store all unknown entries of this report
			if ($unknown_entries_occured === true) {
				$this->unknown_entries_error_object->add_child_message($unknown_entries);
				$this->unknown_entries_found = true;
			}
		}


        //Get the SQL Ready
        $general_fields = ['galaxy','system','planet','planetname','moon','msg_id','fleet_resis',
            'defence_resis','scantime','user_id','scanned','min_phalanx','max_phalanx','min_rak','max_rak'];

        $OnDuplicateUpdate = "";
        $EntryFields = "";
        $EntryValues = "(";
        //Add all general Values
        foreach ($general_fields as $field) {
            $EntryFields .= "`".$field."`,";
            if(isset($entries_array[$field])){
                $EntryValues .= ":".$field.",";
            }else{
                $EntryValues .= "0,";
            }
            if($field != "galaxy" && $field != "system" && $field != "planet"){
                $OnDuplicateUpdate .= $field.'=VALUES('.$field.'),';
            }
        }
        //Add our Game Objects Values
        foreach (DB_REPORT_ARRAY as $entryobject) {
            $EntryFields .= "`".$entryobject["DBFIELD"]."`,";
            $OnDuplicateUpdate .= $entryobject["DBFIELD"].'=VALUES('.$entryobject["DBFIELD"].'),';
            if(isset($entries_array[$entryobject["DBFIELD"]])){
                $EntryValues .= ":".$entryobject["DBFIELD"].",";
            }else{
                $EntryValues .= "0,";
            }
        }
        $EntryFields = rtrim($EntryFields, ",");
        $EntryValues = rtrim($EntryValues, ",").")";
        $OnDuplicateUpdate = rtrim($OnDuplicateUpdate, ",");

        $sql = 'INSERT INTO '.$this->reporttable.' ('.$EntryFields.') VALUES '.$EntryValues.' ON DUPLICATE KEY UPDATE '.$OnDuplicateUpdate;

        $stmt = DB::getDB()->prepare($sql);

        //PDO reads everthing as strings if not bind directly...
        foreach ($entries_array as $key=>$value){
            //$sql = str_replace(":".$key.",",$value.",",$sql);
           // echo ":$key - $value - ".gettype($value)."#";
            switch (gettype($value)) {
                case "integer":
                    $stmt->bindValue($key,$value, PDO::PARAM_INT);
                    break;
                default:
                    $stmt->bindValue($key,$value, PDO::PARAM_STR);
                    break;
            }
        }

        $res = $stmt->execute();

		if ($res === false) {
			$this->error_object = new ErrorObject(ErrorObject::severity_error , "DB error occurred while inserting or updating reports");
			$this->error_object->add_child_message($this->get_db_error_object());
			return false;
		}

		return true;
	}

}