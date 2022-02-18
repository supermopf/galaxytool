<?php
require_once GALAXYTOOL_ROOT."/languages/english_probes.inc.php";

const DB_REPORT_ARRAY = [
        R_METAL => [
            "DBFIELD" => "metal",
            "INDEX" => 0,
        ],
        R_CRYSTAL => [
            "DBFIELD" => "crystal",
            "INDEX" => 1,
        ],
        R_DEUTERIUM => [
            "DBFIELD" => "deuterium",
            "INDEX" => 2,
        ],
        R_ENERGY => [
            "DBFIELD" => "energy",
            "INDEX" => 3,
        ],
        F_SMALLCARGOSHIP => [
            "TYPE" => "fleet",
            "DBFIELD" => "kt",
            "INDEX" => 4,
            "MATERIAL" => 4000,
        ],
        F_LARGECARGOSHIP => [
            "TYPE" => "fleet",
            "DBFIELD" => "gt",
            "INDEX" => 5,
            "MATERIAL" => 12000,
        ],
        F_LIGHFIGHTER => [
            "TYPE" => "fleet",
            "DBFIELD" => "lj",
            "INDEX" => 6,
            "MATERIAL" => 4000,
        ],
        F_HEAVYFIGHTER => [
            "TYPE" => "fleet",
            "DBFIELD" => "sj",
            "INDEX" => 7,
            "MATERIAL" => 10000,
        ],
        F_CRUISER => [
            "TYPE" => "fleet",
            "DBFIELD" => "krz",
            "INDEX" => 8,
            "MATERIAL" => 27000,
        ],
        F_BATTLESHIP => [
            "TYPE" => "fleet",
            "DBFIELD" => "ss",
            "INDEX" => 9,
            "MATERIAL" => 60000,
        ],
        F_COLONYSHIP => [
            "TYPE" => "fleet",
            "DBFIELD" => "kolo",
            "INDEX" => 10,
            "MATERIAL" => 30000,
        ],
        F_RECYCLER => [
            "TYPE" => "fleet",
            "DBFIELD" => "rec",
            "INDEX" => 11,
            "MATERIAL" => 18000,
        ],
        F_ESPIONAGEPROBE => [
            "TYPE" => "fleet",
            "DBFIELD" => "spio",
            "INDEX" => 12,
            "MATERIAL" => 1000,
        ],
        F_BOMBER => [
            "TYPE" => "fleet",
            "DBFIELD" => "bomb",
            "INDEX" => 13,
            "MATERIAL" => 22500,
        ],
        F_DESTROYER => [
            "TYPE" => "fleet",
            "DBFIELD" => "zerri",
            "INDEX" => 14,
            "MATERIAL" => 110000,
        ],
        F_DEATHSTAR => [
            "TYPE" => "fleet",
            "DBFIELD" => "ds",
            "INDEX" => 15,
            "MATERIAL" => 9000000,
        ],
        F_BATTLECRUISER=> [
            "TYPE" => "fleet",
            "DBFIELD" => "skrz",
            "INDEX" => 16,
            "MATERIAL" => 70000,
        ],
        F_SOLARSATELLITE => [
            "TYPE" => "fleet",
            "DBFIELD" => "sat",
            "INDEX" => 17,
            "MATERIAL" => 2000,
        ],
        F_REAPER => [
            "TYPE" => "fleet",
            "DBFIELD" => "reaper",
            "INDEX" => 18,
            "MATERIAL" => 140000,
        ],
        F_PATHFINDER => [
            "TYPE" => "fleet",
            "DBFIELD" => "pathfinder",
            "INDEX" => 19,
            "MATERIAL" => 23000,
        ],
        D_MISSILELAUNCHER => [
            "TYPE" => "defense",
            "DBFIELD" => "rak",
            "INDEX" => 20,
            "MATERIAL" => 600,
        ],
        D_SMALLLASER => [
            "TYPE" => "defense",
            "DBFIELD" => "ll",
            "INDEX" => 21,
            "MATERIAL" => 600,
        ],
        D_HEAVYLASER => [
            "TYPE" => "defense",
            "DBFIELD" => "sl",
            "INDEX" => 22,
            "MATERIAL" => 2400,
        ],
        D_IONCANNON => [
            "TYPE" => "defense",
            "DBFIELD" => "ion",
            "INDEX" => 23,
            "MATERIAL" => 2400,
        ],
        D_GAUSSCANNON => [
            "TYPE" => "defense",
            "DBFIELD" => "gauss",
            "INDEX" => 24,
            "MATERIAL" => 10500,
        ],
        D_PLASMACANNON => [
            "TYPE" => "defense",
            "DBFIELD" => "plasma",
            "INDEX" => 25,
            "MATERIAL" => 30000,
        ],
        D_SMALLSHIELDDOME => [
            "TYPE" => "defense",
            "DBFIELD" => "ksk",
            "INDEX" => 26,
            "MATERIAL" => 6000,
        ],
        D_LARGESHILDDOME => [
            "TYPE" => "defense",
            "DBFIELD" => "gsk",
            "INDEX" => 27,
            "MATERIAL" => 30000,
        ],
        D_ANTIBALLISTICMISSILE => [
            "TYPE" => "defense",
            "DBFIELD" => "arak",
            "INDEX" => 28,
            "MATERIAL" => 0,
        ],
        D_INTERPLANETARYMISSILE => [
            "TYPE" => "defense",
            "DBFIELD" => "irak",
            "INDEX" => 29,
            "MATERIAL" => 0,
        ],
        B_METALMINE => [
            "TYPE" => "building",
            "DBFIELD" => "memi",
            "INDEX" => 30,
        ],
        B_CRYSTALMINE => [
            "TYPE" => "building",
            "DBFIELD" => "krimi",
            "INDEX" => 31,
        ],
        B_DEUTERIUMSYNTHESIZER => [
            "TYPE" => "building",
            "DBFIELD" => "deutsyn",
            "INDEX" => 32,
        ],
        B_SOLARPLANT => [
            "TYPE" => "building",
            "DBFIELD" => "solar",
            "INDEX" => 33,
        ],
        B_FUSIONPLANT => [
            "TYPE" => "building",
            "DBFIELD" => "fusion",
            "INDEX" => 34,
        ],
        B_ROBOTFACTORY => [
            "TYPE" => "facility",
            "DBFIELD" => "robo",
            "INDEX" => 35,
        ],
        B_NANITEFACTORY => [
            "TYPE" => "facility",
            "DBFIELD" => "nani",
            "INDEX" => 36,
        ],
        B_SHIPYARD => [
            "TYPE" => "facility",
            "DBFIELD" => "rawe",
            "INDEX" => 37,
        ],
        B_METALSTORAGE => [
            "TYPE" => "building",
            "DBFIELD" => "mesp",
            "INDEX" => 38,
        ],
        B_CRYSTALSTORAGE => [
            "TYPE" => "building",
            "DBFIELD" => "krissp",
            "INDEX" => 39,
        ],
        B_DEUTERIUMTANK => [
            "TYPE" => "building",
            "DBFIELD" => "deutsp",
            "INDEX" => 40,
        ],
        B_RESAERCHLAB => [
            "TYPE" => "facility",
            "DBFIELD" => "folab",
            "INDEX" => 41,
        ],
        B_TERRAFORMER => [
            "TYPE" => "facility",
            "DBFIELD" => "terra",
            "INDEX" => 42,
        ],
        B_ALLIANCEDEPOT => [
            "TYPE" => "facility",
            "DBFIELD" => "allydep",
            "INDEX" => 43,
        ],
        B_ROCKETSILO => [
            "TYPE" => "facility",
            "DBFIELD" => "raksilo",
            "INDEX" => 44,
        ],
        B_LUNARBASE => [
            "TYPE" => "building",
            "DBFIELD" => "mbase",
            "INDEX" => 45,
        ],
        B_SENSORPHALANX => [
            "TYPE" => "facility",
            "DBFIELD" => "sensor",
            "INDEX" => 46,
        ],
        B_JUMPGATE => [
            "TYPE" => "facility",
            "DBFIELD" => "sprungtor",
            "INDEX" => 47,
        ],
        B_SPACEDOCK => [
            "TYPE" => "facility",
            "DBFIELD" => "spacedock",
            "INDEX" => 48,
        ],
        B_CRAWLER => [
            "TYPE" => "building",
            "DBFIELD" => "crawler",
            "INDEX" => 49,
        ],
        RS_ESPIONAGE => [
            "TYPE" => "research",
            "DBFIELD" => "spiolvl",
            "INDEX" => 50,
        ],
        RS_COMPUTER => [
            "TYPE" => "research",
            "DBFIELD" => "computech",
            "INDEX" => 51,
        ],
        RS_WEAPON => [
            "TYPE" => "research",
            "DBFIELD" => "waffentech",
            "INDEX" => 52,
        ],
        RS_SHIELDING => [
            "TYPE" => "research",
            "DBFIELD" => "schildtech",
            "INDEX" => 53,
        ],
        RS_ARMOUR => [
            "TYPE" => "research",
            "DBFIELD" => "rpz",
            "INDEX" => 54,
        ],
        RS_ENERGY => [
            "TYPE" => "research",
            "DBFIELD" => "energytech",
            "INDEX" => 55,
        ],
        RS_HYPERSPACE => [
            "TYPE" => "research",
            "DBFIELD" => "hypertech",
            "INDEX" => 56,
        ],
        RS_COMBUSTIONENGINE => [
            "TYPE" => "research",
            "DBFIELD" => "vbt",
            "INDEX" => 57,
        ],
        RS_IMPULSEENGINE => [
            "TYPE" => "research",
            "DBFIELD" => "impulse",
            "INDEX" => 58,
        ],
        RS_HYPERSPACEENGINE => [
            "TYPE" => "research",
            "DBFIELD" => "hra",
            "INDEX" => 59,
        ],
        RS_LASER => [
            "TYPE" => "research",
            "DBFIELD" => "lasertech",
            "INDEX" => 60,
        ],
        RS_ION => [
            "TYPE" => "research",
            "DBFIELD" => "iontech",
            "INDEX" => 61,
        ],
        RS_PLASMA => [
            "TYPE" => "research",
            "DBFIELD" => "plasmatech",
            "INDEX" => 62,
        ],
        RS_IRNETWORK => [
            "TYPE" => "research",
            "DBFIELD" => "forschungsnetz",
            "INDEX" => 63,
        ],
        RS_EXPEDITION => [
            "TYPE" => "research",
            "DBFIELD" => "expedition",
            "INDEX" => 64,
        ],
        RS_GRAVITON => [
            "TYPE" => "research",
            "DBFIELD" => "gravi",
			"INDEX" => 65,
		]
    ];

const REPORT_DB_FIELDS = '`galaxy`,`system`,`planet`,`planetname`,`moon`,`metal`,`crystal`,`deuterium`,`energy`,`kt`,`gt`,`lj`,`sj`,`krz`,`ss`,`kolo`,`rec`,`spio`,`bomb`,`zerri`,`ds`,`skrz`,`sat`,`reaper`,`pathfinder`,`rak`,`ll`,`sl`,`ion`,`gauss`,`plasma`,`ksk`,`gsk`,`arak`,`irak`,`memi`,`krimi`,`deutsyn`,`solar`,`fusion`,`robo`,`nani`,`rawe`,`mesp`,`krissp`,`deutsp`,`folab`,`terra`,`allydep`,`raksilo`,`mbase`,`sensor`,`sprungtor`,`spacedock`,`crawler`,`spiolvl`,`computech`,`waffentech`,`schildtech`,`rpz`,`energytech`,`hypertech`,`vbt`,`impulse`,`hra`,`lasertech`,`iontech`,`plasmatech`,`forschungsnetz`,`expedition`,`gravi`,`fleet_resis`,`defence_resis`,`scantime`,`user_id`,`scanned`,`min_phalanx`,`max_phalanx`,`min_rak`,`max_rak`';





























