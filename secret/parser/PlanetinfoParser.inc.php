<?php
require_once GALAXYTOOL_ROOT."/secret/includes/config/DatabaseConfig.inc.php";
/*
* Class to convert the XML content into php variables and to insert the content into
* corresponding datebase tables.
*
*/

class PlanetinfoParser extends XMLParserGlobal{

	private $reporttable = "";
	private $galaxytable = "";
	private $unknown_entries_error_object = null;
	private $unknown_entries_found = false;


	private $db_index = DB_INDEX_FIELDS;

	private $db_fieldnames = array(
	"metal","crystal","deuterium","energy", // 0-3
	"kt","gt","lj","sj","krz","ss","kolo","rec","spio","bomb","zerri","ds","skrz","sat","reaper","pathfinder", // 4-19
	"rak","ll","sl","ion","gauss","plasma","ksk","gsk","arak","irak", // 20-29
	"memi","krimi","deutsyn","solar","fusion","robo","nani","rawe","mesp","krissp","deutsp","folab","terra","allydep","raksilo","mbase","sensor","sprungtor","spacedock","crawler", // 30-49
	"spiolvl","computech","waffentech","schildtech","rpz","energytech","hypertech","vbt","impulse","hra","lasertech","iontech","plasmatech","forschungsnetz","expedition","gravi" // 50-65
	);

	// resources you will lose at fleet
	private $fleet_array = FLEET_ARRAY;

	// resources you will lose at def
	private $defence_array = DEFENCE_ARRAY;

	function __construct($reporttable,$galaxytable,$playertable,$utablename,$universe) {
		$this->xml_schema = "xml_schema/planetinfo.xsd";
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
		$xdoc = $this->validate_header($xml_content,XMLParserGlobal::content_type_planetinfo);
		if ($xdoc === false) {
			return false;
		}

		if ($this->unknown_entries_error_object == null) {
			$this->unknown_entries_error_object = new ErrorObject(ErrorObject::severity_warning , REPORTS_UNKNOWN_ENTRIES);
		}

		$result = $this->insert_planetinfo($xdoc,$this->userid);

		if ($result === true && $this->unknown_entries_found === true) {
			$this->error_object = $this->unknown_entries_error_object;
			$result = false;
		}

		// add error or success messages
		$this->check_result2($result);

		return $result;
	}

	private function insert_planetinfo($xdoc,$userid) {
		$planetinformation = $xdoc->getElementsByTagName("planetinfo");
		$planetinformation_data = array();

		foreach ($planetinformation as $planetinfo) {
			// extract information from XML file
			$planetinfo_data = $this->get_planetinfo_data($planetinfo);
			// store results
			$planetinformation_data[] = $planetinfo_data;
		}
		unset($planetinformation);
		unset($xdoc);

		if ($this->update_planetinfo_at_database($planetinformation_data,$userid)) {
			return true;
		} else {
			return false;
		}

	}

	private function get_planetinfo_data($planetinfo_DOMNode) {
		$return_value = array();
		$return_value["playername"] = trim($planetinfo_DOMNode->getAttribute("playername"));
		$return_value["planetname"] = trim($planetinfo_DOMNode->getAttribute("planetname"));
		$return_value["moon"]       = $planetinfo_DOMNode->getAttribute("moon");
		$return_value["galaxy"]     = $planetinfo_DOMNode->getAttribute("galaxy");
		$return_value["system"]     = $planetinfo_DOMNode->getAttribute("system");
		$return_value["planet"]     = $planetinfo_DOMNode->getAttribute("planet");
		$return_value["playerid"]   = intval($planetinfo_DOMNode->getAttribute("playerid"));

		$return_value["entries"]    = array();

		$planetinfo_entries_DOMNode = $planetinfo_DOMNode->getElementsByTagName("entry");
		foreach ($planetinfo_entries_DOMNode as $entry_DOMNode) {
			$return_value["entries"][] = [
                "name" => $entry_DOMNode->getAttribute("name"),
                "amount" => $entry_DOMNode->getAttribute("amount")
            ];
		}

		return $return_value;
	}

	private function update_planetinfo_at_database(array $planetinformation,$userid) {

		$query = "INSERT INTO $this->reporttable (".REPORT_DB_FIELDS.") VALUES ";

		foreach ($planetinformation as $report) {
			$unknown_entries_occured = false;

			// initialize entries array
			$entries_array = [];
			$fleet_df   = 0;
			$defence_df = 0;

			// use all english texts to determine the position in the entries array where to store the amount
			$unknown_entries = new ErrorObject(ErrorObject::severity_warning , REPORTS_UNKNOWN_ENTRIES." ".$report["galaxy"].":".$report["system"].":".$report["planet"]);
			$entry_block_initialized = false;
			$planetinfo_type = "";
			$sats_found = false;

            //Check which page we're on
			foreach ($report["entries"] as $entry) {
				if (isset(DB_REPORT_ARRAY[$entry["name"]])) {
                    // we have to initialize all fleets or defence or ... with zeroes which are currently to be updated
                    if ($entry["name"] != R_METAL
                        && $entry["name"] != R_CRYSTAL
                        && $entry["name"] != R_DEUTERIUM
                        && $entry["name"] != R_ENERGY
                        && $entry["name"] != F_SOLARSATELLITE)
                    {
                        $planetinfo_type = DB_REPORT_ARRAY[$entry["name"]]["TYPE"];
                        //Get all propertys of type
                        foreach (DB_REPORT_ARRAY as $key => $value) {
                            if ($value["TYPE"] == $planetinfo_type) {
                                if ($value["TYPE"] == "fleet" && $key == F_SOLARSATELLITE) {
                                    //solar sats are not on the fleet page
                                } else {
                                    $entries_array[DB_REPORT_ARRAY[$entry["name"]]["DBFIELD"]] = 0;
                                }
                            }
                        }
                        //stop the iteration
                        break;
                    }
                } else {
                    // unknown entries
                    $unknown_entries->add_child_message(new ErrorObject(ErrorObject::severity_warning , $entry["name"]));
                    $unknown_entries_occured = true;
                }
			}
            //Now fill the data!
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
            if ($entries_array[DB_REPORT_ARRAY[B_ROCKETSILO]["DBFIELD"]] > 3){
                //Player has Rockets lets look at his techs
                $playertech_query = "SELECT `impulse` FROM `".$this->playertable."` WHERE `ogame_playerid`=:ogame_playerid LIMIT 1";
                $stmt = DB::getDB()->prepare($playertech_query);
                $stmt->bindParam(":ogame_playerid", $report["playerid"]);
                $playertech_res = $this->execute($stmt);
                if (!$playertech_res || $stmt->rowCount() == 0) {
                    // use old values
                    //$entry_query .= "min_rak,max_rak"; // attention: no comma at the end as this is the last entry in the query
                } else {
                    $techs = $stmt->fetch(PDO::FETCH_OBJ);
                    $impulsetech = $techs->impulse;
                    if ($impulsetech > 0) {
                        $min_rak = ($report["system"] - (($impulsetech*5)-1));
                        if ($min_rak < 0){
                            $min_rak = 0; // to avoid problems with mysql unsigned data type
                        }
                        $max_rak = ($report["system"] + (($impulsetech*5)-1)); // as we may have universes with less then 499 systems, we do no change it to a max value
                    } else {
                        // use old values
                        //$entry_query .= "min_rak,max_rak"; // attention: no comma at the end as this is the last entry in the query
                    }
                }
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
            $entries_array["scantime"] = date("Y-m-d")." 12:00:00";
            $entries_array["user_id"] = intval($userid);
            $entries_array["scanned"] = 1;


            switch ($planetinfo_type){
                case "fleet":
                    $entries_array["fleet_resis"] = intval($fleet_df);
                    break;
                case "defense":
                    $entries_array["defence_resis"] = intval($defence_df);
                    break;
                case "facility":
                    if($moon){
                        $entries_array["min_phalanx"] = intval($min_phalanx);
                        $entries_array["max_phalanx"] = intval($max_phalanx);
                    }else{
                        $entries_array["min_rak"] = intval($min_rak);
                        $entries_array["max_rak"] = intval($max_rak);
                    }
                    break;
            }

			// store all unknown entries of this report
			if ($unknown_entries_occured === true) {
				$this->unknown_entries_error_object->add_child_message($unknown_entries);
				$this->unknown_entries_found = true;
			}
		}


        $OnDuplicateUpdate = "";
        $EntryFields = "";
        $EntryValues = "(";

        foreach ($entries_array as $key => $value){
            $EntryFields .= "`".$key."`,";
            $EntryValues .= ":".$key.",";
            $OnDuplicateUpdate .= $key.'=VALUES('.$key.'),';
        }

        $EntryFields = rtrim($EntryFields, ",");
        $EntryValues = rtrim($EntryValues, ",").")";
        $OnDuplicateUpdate = rtrim($OnDuplicateUpdate, ",");

        $sql = 'INSERT INTO '.$this->reporttable.' ('.$EntryFields.') VALUES '.$EntryValues.' ON DUPLICATE KEY UPDATE '.$OnDuplicateUpdate;

        $stmt = DB::getDB()->prepare($sql);

        foreach ($entries_array as $key=>$value){
            // $sql = str_replace(":".$key.",",$value.",",$sql);
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