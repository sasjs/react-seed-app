/**
  @file
  @brief Service initialisation
  @details Ensure source data is available, and assign the library
  @cond
**/

libname mydb (work);

data mydb.springs ;
attrib
Latitude                         length= 8
Longitude                        length= 8
Name                             length= $34
Area                             length= $14
Type                             length= $9
Farenheit                        length= 8
Celsius                          length= 8
;
infile cards dsd;
input
  Latitude
  Longitude
  Name                             :$char.
  Area                             :$char.
  Type                             :$char.
  Farenheit
  Celsius
;
missing a b c d e f g h i j k l m n o p q r s t u v w x y z _;
datalines4;
51.925,-177.16,Fumaroles on Kanaga Island,Adak,Hotspring,219,104
65.858,-164.71,Serpentine Hot Springs,Bendeleben,Hotspring,171,77
53.851,-166.918,Hot Springs Near Makushin Volcano,Unalaska,Hotspring,H,H
53.877,-166.448,Hot Springs Near Summer Bay,Unalaska,Hotspring,H,H
52.27,-174.042,Hot Springs on Atka Island,Atka,Hotspring,H,H
52.34,-174.26,Hot Springs on Atka Island,Atka,Hotspring,H,H
52.358,-172.317,Hot Spring on Seguam Island,Seguam,Hotspring,H,H
52.84,-169.9,Chuginadak Hot Springs,Samalga Island,Hotspring,H,H
52.96,-169.71,Hot Spring on Kagamil Island,Samalga Island,Hotspring,H,H
51.94,-178.5,Hot Spring on Little Sitkin Island,Rat Islands,Hotspring,H,H
51.963,-178.491,Fumaroles on Little Sitkin Island,Rat Islands,Hotspring,H,H
51.775,-178.793,Fumaroles on Gareloi Island,Gareloi Island,Hotspring,H,H
53.207,-168.445,Hot Springs Near Geyser Bight,Umnak,Hotspring,H,H
53.892,-166.93,Makushin Volcano Fumaroles,Unalaska,Hotspring,310,154
54.9,-162.885,Hot Spring on Amagat Island,False Pass,Hotspring,H,H
53.213,-168.463,Hot Springs Near Geyser Bight,Umnak,Hotspring,216,102
53.223,-168.477,Hot Springs Near Geyser Bight,Umnak,Hotspring,214,101
53.443,-168.092,Thermal Springs In Okmok Caldera,Umnak,Hotspring,212,100
52.042,-176.108,Hot Springs on Great Sitkin Island,Adak,Hotspring,210,99
55.983,-131.661,Bailey Hot Spring,Ketchikan,Hotspring,198,92
53.242,-168.365,Hot Springs Near Hot Springs Cove,Umnak,Hotspring,192,89
54.157,-165.85,Hot Springs Near Hot Springs Bay,Unimak,Hotspring,181,83
58.033,-136.017,Hot Springs North End Tenakee Inle,Mt. Fairweathe,Hotspring,180,82
65.093,-164.922,Pilgrim Springs,Bendeleben,Hotspring,178,81
57.831,-156.513,W Ukinek Spring,Ugashik,Hotspring,178,81
65.459,-153.312,Little Melozitna Hot Springs,Melozitna,Hotspring,176,80
51.81,-177.79,Hot Spring on Tanaga Island,Adak,Hotspring,H,H
65.233,-144.483,Hot Springs on Big Windy Creek,Circle,Hotspring,H,H
55.334,-162.137,Hot Spring at West End Emmons Lake,Cold Bay,Hotspring,68,20
66.197,-154.006,Tunalkten Lake Hot Spring,Hughes,Hotspring,.,.
67.403,-153.883,Hot Spring Near Arrigetch Peaks,Survey Pass,Hotspring,W,W
65.047,-142.848,Hot Spring on Flat Creek,Charley River,Hotspring,W,W
63.683,-151.233,Hot Springs Near Glacier,Mt. Mckinley,Hotspring,W,W
63.883,-150.717,Hot Springs East of Diamond,Mt. Mckinley,Hotspring,W,W
62.45,-157.933,Hot Spring Near Flat,Iditarod,Hotspring,W,W
60.837,-142.42,Hot Spring on Twelvemile Creek,Bering Glacier,Hotspring,W,W
56.58,-132.18,South Stikine Spring,Petersburg,Hotspring,W,W
52.87,-173.13,Hot Spring on Attu Island,Attu,Hotspring,W,W
65.908,-154.993,Deniktow Ridge Hot Springs,Melozitna,Hotspring,H,H
53.95,-168.037,Hot Springs on Bogoslof Island,Umnak,Hotspring,H,H
65.45,-150,Hot Spring Near Little Minook Cr,Tanana,Hotspring,H,H
51.967,-178.444,Fumaroles on Little Sitkin Island,Rat Islands,Hotspring,H,H
64.002,-156.3,Hot Spring on Tributary of Innoko,Nulato,Hotspring,H,H
61.058,-160.692,Hot Spring Near Tuluksak River,Russian Missio,Hotspring,H,H
61.363,-157.733,Hot Springs on Upper Chuilnuk Rive,Sleetmute,Hotspring,H,H
61.267,-151.238,Hot Lake In Bottom of Crater Peak,Tyonek,Hotspring,H,H
58.24,-155.09,Hot Spring Near Katmai Pass,Mt. Katmai,Hotspring,H,H
58.27,-154.89,Hot Springs Near Mt Katmai,Mt. Katmai,Hotspring,H,H
58.92,-153.98,Hot Spring West of Cape Douglas,Afognak,Hotspring,H,H
55.368,-161.961,Fumarole,Port Moller,Hotspring,H,H
54.18,-165.41,Hot Springs on Akun Island,Unimak,Hotspring,H,H
54.23,-165.66,Hot Springs on Akun Island,Unimak,Hotspring,H,H
54.66,-164.55,Hot Spring on Unimak Island,Unimak,Hotspring,H,H
65.97,-154.033,Pocahontas Hot Springs,Melozitna,Hotspring,H,H
65.216,-149.993,Hutlinana Hot Springs,Livengood,Hotspring,109,43
57.085,-134.839,Baranof Warm Springs,Sitka,Hotspring,124,51
67.283,-155.067,Reed River Hot Spring,Survey Pass,Hotspring,122,50
66.15,-157.117,Hot Springs Near South Bm,Shungnak,Hotspring,122,50
66.233,-157.583,Hot Springs on Hawk River,Shungnak,Hotspring,122,50
65.81,-151.237,Kilo Hot Spring,Tanana,Hotspring,122,50
56.717,-132.005,Chief Shakes Hot Springs,Petersburg,Hotspring,122,50
69.33,-144.044,Okpilak Springs,Mt. Michelson,Hotspring,119,49
65.367,-161.25,Granite Mountain Hot Springs,Candle,Hotspring,120,49
57.644,-135.333,Nylen Hot Springs,Sitka,Hotspring,120,49
65.963,-150.919,Ray River Hot Spring,Tanana,Hotspring,117,47
64.924,-154.837,Horner Hot Springs,Ruby,Hotspring,117,47
65.267,-155.28,Hot Springs Near Dulbi River,Melozitna,Hotspring,126,52
57.807,-136.341,White Sulphur Springs (Hooniah H S,Sitka,Hotspring,111,44
57.781,-135.217,Tenakee Hot Springs,Sitka,Hotspring,109,43
52.19,-174.25,Hot Springs on Atka Island,Atka,Hotspring,167,75
55.334,-133.641,Dalton (Craig) Hot Springs,Craig,Hotspring,109,43
51.944,-178.547,Fumaroles on Little Sitkin Island,Rat Islands,Hotspring,H,H
57.771,-135.82,Hot Spring North Arm Peril Strait,Sitka,Hotspring,100,38
53.848,-166.873,Hot Springs Near Makushin Volcano,Unalaska,Hotspring,94,34
69.627,-146.027,Red Hill Spring,Mt. Michelson,Hotspring,91,33
62.081,-145.007,Upper Klawasi Warm Springs,Gulkana,Hotspring,86,30
62.058,-145.222,Mineral Spring (Lower Klawasi Cone,Gulkana,Hotspring,82,28
56.68,-131.882,Barnes Lake Hot Springs,Bradfield Cana,Hotspring,79,26
56.928,-158.12,Surprise Lake Hot Spring,Chignik,Hotspring,73,23
56.667,-132.28,Twin Lakes Hot Springs,Petersburg,Hotspring,70,21
66.383,-157.517,Warm Spring Near Purcell Mountain,Shungnak,Hotspring,68,20
57.348,-135.385,Hot Spring Near Fish Bay,Sitka,Hotspring,117,47
65.983,-150.56,Hot Springs on Lower Ray River,Tanana,Hotspring,142,61
55.863,-160.493,Hot Spring Near Port Moller,Port Moller,Hotspring,160,71
53.253,-168.358,Hot Springs Near Hot Springs Cove,Umnak,Hotspring,158,70
51.97,-176.61,Hot Springs on Adak Island,Adak,Hotspring,154,68
65.053,-146.057,Chena Hot Springs,Circle,Hotspring,153,67
58.37,-137.09,Hot Springs Near Icy Point,Mt. Fairweathe,Hotspring,153,67
56.836,-135.374,Goddard Hot Springs,Port Alexander,Hotspring,153,67
66.342,-150.85,Kanuti Hot Springs,Bettles,Hotspring,151,66
64.85,-162.3,Clear Creek Hot Springs,Solomon,Hotspring,149,65
53.233,-168.3,Hot Spring on Umnak Island,Umnak,Hotspring,149,65
61.2,-159.863,Hot Springs Near Ophir Creek,Russian Missio,Hotspring,145,63
57.865,-156.499,Gas Rocks Hot Spring,Ugashik,Hotspring,127,53
51.762,-178.77,Fumaroles on Gareloi Island,Gareloi Island,Hotspring,144,62
66.367,-156.767,Hot Springs Near Division Bm,Shungnak,Hotspring,140,60
64.7,-162.467,Hot Spring Near Kwiniuk River,Solomon,Hotspring,106,41
65.274,-148.847,Tolovana Hot Springs,Livengood,Hotspring,140,60
55.933,-131.559,Bell Island Hot Springs,Ketchikan,Hotspring,165,74
57.178,-157.015,Hot Spring Near Mother Goose Lake,Ugashik,Hotspring,138,59
65.483,-144.637,Circle Hot Springs,Circle,Hotspring,135,57
56.233,-131.267,Bradfield Canal Hot Springs,Bradfield Cana,Hotspring,135,57
65.006,-150.633,Manley Hot Springs,Tanana,Hotspring,133,56
65.129,-154.692,Melozi (Melozitna) Springs,Melozitna,Hotspring,131,55
66.217,-149.547,Dall Hot Springs,Beaver,Hotspring,129,54
55.217,-162.483,Hot Springs East of Cold Bay,Cold Bay,Hotspring,129,54
65.217,-162.9,Hot Springs Near Lava Creek,Bendeleben,Hotspring,127,53
54.944,-163.251,Hot Springs Near Morzhovoi,False Pass,Hotspring,145,63
36.48,-91.053,Warm Springs,Poplar Bluff,Hotspring,82,28
34.384,-93.607,Caddo Gap Springs,Little Rock,Hotspring,95,35
34.321,-93.739,Spring on Redland Mountain,Little Rock,Hotspring,77,25
34.406,-93.908,Spring on Little Missouri River,Little Rock,Hotspring,74,23
34.542,-93.024,Big Chalybeate Spring,Little Rock,Hotspring,79,26
34.513,-93.053,Hot Springs,Little Rock,Hotspring,147,64
33.008,-109.778,Grapevine Spring,Clifton,Hotspring,91,33
32.984,-113.324,Agua Caliente Springs,Ajo,Hotspring,102,39
34.563,-113.497,Kaiser Hot Spring,Prescott,Hotspring,99,37
34.076,-111.708,Spring (Hot),Holbrook,Hotspring,99,37
33.17,-110.528,Coolidge Dam Warm Spring,Mesa,Hotspring,99,37
34.695,-113.572,Cofer Hot Spring,Prescott,Hotspring,97,36
33.209,-110.818,Pioneer Spring,Mesa,Hotspring,91,33
33.988,-112.362,Castle Hot Springs,Phoenix,Hotspring,115,46
32.345,-110.247,Warm Springs,Tucson,Hotspring,91,33
36.196,-113.081,Lava Warm Springs,Grand Canyon,Hotspring,90,32
33.068,-109.975,Warm Spring,Clifton,Hotspring,90,32
31.943,-113.013,Quitobaquito Springs,Lukeville,Hotspring,90,32
31.695,-110.963,Agua Caliente Spring,Nogales,Hotspring,90,32
33.075,-109.298,Seep,Clifton,Hotspring,95,35
34.357,-111.71,Verde Hot Springs,Holbrook,Hotspring,104,40
32.998,-109.901,Indian Hot Springs,Silver City,Hotspring,118,48
33.669,-111.165,Roosevelt Dam Springs,Mesa,Hotspring,118,48
32.336,-110.24,Hookers Hot Springs,Tucson,Hotspring,127,53
33.4,-109.152,Hannah Hot Spring,Clifton,Hotspring,133,56
33.08,-109.303,Hot Spring,Clifton,Hotspring,138,59
32.741,-114.068,Radium Hot Springs,El Centro,Hotspring,140,60
32.971,-109.35,Gillard Hot Springs,Silver City,Hotspring,180,82
35.984,-114.742,Hot Spring,Kingman,Hotspring,H,H
33.78,-110.317,Warm Spring,Mesa,Hotspring,W,W
36.418,-113.956,Pakoon Springs,Grand Canyon,Hotspring,86,30
33.493,-112.94,El Dorado Hot Springs,Phoenix South,Hotspring,112,44
34.896,-114.308,Oatman Warm Springs,Needles,Hotspring,91,33
33.055,-109.295,Clifton Hot Springs,Clifton,Hotspring,102,39
34.445,-112.693,Spring,Prescott,Hotspring,72,22
32.337,-110.708,Mercer Spring,Tucson,Hotspring,77,25
34.649,-111.744,Soda Spring,Holbrook,Hotspring,75,24
33.253,-110.703,Spring,Mesa,Hotspring,75,24
31.362,-109.265,Astin Spring,Douglas,Hotspring,75,24
35.169,-113.851,Frost Mine Spring,Williams,Hotspring,70,21
31.673,-109.902,Antelope Spring,Douglas,Hotspring,79,26
35.213,-113.425,Casa Grande Spring,Williams,Hotspring,72,22
33.51,-110.403,Cassadore Spring,Mesa,Hotspring,73,23
34.32,-111.453,Tonto Natural Bridge Spring,Holbrook,Hotspring,72,22
34.405,-111.602,Spring,Holbrook,Hotspring,72,22
34.436,-109.402,Salado Springs,Saint Johns,Hotspring,72,22
31.592,-109.51,Lewis Spring,Douglas,Hotspring,68,20
33.046,-109.44,Eagle Creek Hot Springs,Clifton,Hotspring,97,36
36.509,-111.852,Colorado Pool,Marble Canyon,Hotspring,86,30
33.062,-109.482,Warm Spring,Clifton,Hotspring,73,23
31.637,-110.703,Monkey Spring,Nogales,Hotspring,82,28
32.281,-110.73,Agua Caliente,Tucson,Hotspring,86,30
32.327,-110.228,N-O Spring,Tucson,Hotspring,73,23
32.983,-110.373,Warm Spring,Tucson,Hotspring,79,26
33.152,-110.639,Mescal Warm Spring,Mesa,Hotspring,84,29
33.163,-110.662,Spring,Mesa,Hotspring,82,28
35.077,-113.267,Trout Creek Spring,Williams,Hotspring,81,27
33.438,-110.213,Warm Springs,Mesa,Hotspring,86,30
36.895,-113.913,Springs,Grand Canyon,Hotspring,79,26
35.96,-114.725,Hot Spring,Kingman,Hotspring,86,30
34.925,-114.221,Caliche Spring,Needles,Hotspring,79,26
33.915,-112.332,Mitchell Spring,Phoenix,Hotspring,79,26
33.831,-110.574,Salt Banks,Mesa,Hotspring,78,26
34.91,-113.608,Tom Brown Warm Spring,Prescott,Hotspring,82,28
38.873,-122.689,Seigler Springs,Santa Rosa,Hotspring,126,52
36.814,-117.763,Palm Spring,Death Valley,Hotspring,120,49
34.498,-119.341,Stingleys Hot Springs,Los Angeles,Hotspring,123,51
33.67,-117.325,"Wrenden Hot Sprs, Elsinore Hot Spr",Santa Ana,Hotspring,125,52
37.253,-118.373,Keough Hot Springs,Mariposa,Hotspring,124,51
36.229,-118.302,Jordan Hot Springs,Fresno,Hotspring,124,51
34.502,-119.346,Vickers Hot Springs,Los Angeles,Hotspring,124,51
36.123,-121.64,Slates Hot Springs,Santa Cruz,Hotspring,122,50
35.881,-118.67,California Hot Springs,Bakersfield,Hotspring,122,50
38.788,-122.777,Sulphur Creek,Santa Rosa,Hotspring,120,49
37.648,-118.806,Hot Springs,Mariposa,Hotspring,129,54
36.703,-120.86,Mercey Hot Springs,Santa Cruz,Hotspring,119,48
33.589,-117.511,San Juan Hot Springs,Santa Ana,Hotspring,120,49
38.785,-122.655,Harbin Springs,Santa Rosa,Hotspring,120,49
37.677,-118.79,Dehy Hot Spring,Mariposa,Hotspring,134,57
39.183,-122.7,Bartlett Springs,Ukiah,Hotspring,144,62
36.234,-121.546,Tassajara Hot Springs,Santa Cruz,Hotspring,144,62
36.144,-120.555,Coalinga Mineral Springs,Santa Cruz,Hotspring,112,44
39.033,-122.445,Jones Fountain of Life Spring,Ukiah,Hotspring,142,61
35.575,-118.534,"Miracle Hot Sprs, Hobo Hot Sprs",Bakersfield,Hotspring,119,48
33.284,-116.631,Warner Hot Spring,Santa Ana,Hotspring,138,59
38.237,-119.326,Buckeye Hot Spring,Walker Lake,Hotspring,140,60
41.266,-120.08,Hot Springs (Menlo Baths),Alturas,Hotspring,135,57
33.753,-117.495,Glen Ivy Hot Springs,Santa Ana,Hotspring,131,55
37.802,-118.532,Benton Hot Springs,Mariposa,Hotspring,134,57
38.691,-123.024,Skaggs Springs,Santa Rosa,Hotspring,135,56
35.62,-118.473,Scovern Hot Springs,Bakersfield,Hotspring,133,56
34.538,-119.56,Agua Caliente Spring,Los Angeles,Hotspring,133,56
33.558,-117.154,Murrietta Hot Springs,Santa Ana,Hotspring,132,56
39.226,-120.01,Brockway Hot Springs,Chico,Hotspring,131,55
41.036,-121.926,Hunt Hot Spring,Alturas,Hotspring,136,58
34.582,-119.044,Willett Hot Springs,Los Angeles,Hotspring,108,42
37.234,-118.881,Blaney Meadows Hot Springs,Mariposa,Hotspring,109,43
36.477,-118.404,Kern Hot Spring,Fresno,Hotspring,109,43
36.806,-117.771,Lower Warm Springs,Death Valley,Hotspring,110,43
34.482,-119.302,Matilija Hot Springs,Los Angeles,Hotspring,109,43
34.537,-119.879,San Marcos Hot Spring,Los Angeles,Hotspring,110,43
33.896,-117.057,Eden Hot Springs,Santa Ana,Hotspring,109,43
39.573,-120.348,Campbell Hot Springs,Chico,Hotspring,111,44
38.994,-122.742,Horseshoe Spring,Santa Rosa,Hotspring,108,42
33.969,-116.942,Highland Springs,Santa Ana,Hotspring,112,44
34.34,-117.173,"Warm Spring, Hot Spring",San Bernardino,Hotspring,108,42
41.219,-120.066,Squaw Baths,Alturas,Hotspring,106,41
40.142,-120.935,Indian Valley Hot Springs,Susanville,Hotspring,106,41
39.292,-122.821,Crabtree Hot Springs,Ukiah,Hotspring,106,41
37.108,-121.478,Gilroy Hot Springs,San Jose,Hotspring,106,41
39.227,-123.362,Orrs Springs,Ukiah,Hotspring,104,40
38.773,-122.705,Anderson Springs,Santa Rosa,Hotspring,108,42
38.858,-122.671,Howard Springs,Santa Rosa,Hotspring,113,45
34.461,-119.637,Montecito Hot Springs,Los Angeles,Hotspring,118,48
33.551,-117.167,Temecula Hot Springs,Santa Ana,Hotspring,116,47
33.835,-116.988,Gilman Hot Springs,Santa Ana,Hotspring,117,47
37.618,-119.074,Reds Meadow Hot Springs,Mariposa,Hotspring,115,46
35.528,-118.665,Democrat Hot Springs,Bakersfield,Hotspring,115,46
33.731,-118.348,Whites Point Hot Springs,Long Beach,Hotspring,115,46
37.532,-119.025,Fish Creek Hot Springs,Mariposa,Hotspring,110,43
39.032,-122.432,"Blank Spring, Manzanita Mine Sprs",Ukiah,Hotspring,112,45
37.327,-119.018,Mono Hot Springs,Mariposa,Hotspring,109,43
38.225,-119.217,The Hot Springs,Walker Lake,Hotspring,113,45
35.727,-118.408,Hot Spring,Bakersfield,Hotspring,113,45
41.6,-120.088,Leonards Hot Springs,Alturas,Hotspring,144,62
38.874,-123.518,Point Arena Hot Springs,Santa Rosa,Hotspring,111,44
41.126,-121.028,Kellog Hot Springs,Alturas,Hotspring,172,78
35.558,-118.612,Delonegha Hot Springs,Bakersfield,Hotspring,112,44
35.871,-116.23,Tecopa Hot Springs,Trona,Hotspring,118,48
41.86,-120.158,Fort Bidwell Hot Spring,Alturas,Hotspring,113,45
41.534,-120.078,Hot Springs (Surprise Valley),Alturas,Hotspring,208,98
33.345,-115.588,Mud Volcanoes,Salton Sea,Hotspring,W,W
41.012,-121.274,Hot Springs,Alturas,Hotspring,H,H
39.922,-120.024,Zamboni Hot Springs,Chico,Hotspring,H,H
38.979,-122.659,Fumarole,Santa Rosa,Hotspring,H,H
37.622,-119.028,Fumaroles,Mariposa,Hotspring,H,H
40.364,-120.243,Hot Spring,Susanville,Hotspring,204,96
38.767,-122.748,Little Geysers,Santa Rosa,Hotspring,210,99
33.328,-115.583,Mud Volcanoes,Salton Sea,Hotspring,W,W
41.67,-120.206,Lake City Hot Springs,Alturas,Hotspring,207,97
36.036,-117.802,Devils Kitchen,Death Valley,Hotspring,207,97
36.045,-117.769,Coso Hot Springs,Death Valley,Hotspring,207,97
40.382,-121.513,Morgan Hot Spring,Susanville,Hotspring,205,96
40.421,-121.375,Terminal Geyser,Susanville,Hotspring,205,96
41.19,-120.383,West Valley Reservoir Hot Spring,Alturas,Hotspring,171,77
38.802,-122.81,The Geysers,Santa Rosa,Hotspring,214,101
35.888,-116.258,Springs,Trona,Hotspring,W,W
34.185,-117.262,"Arrowhead Springs, Waterman Hot Sp",San Bernardino,Hotspring,194,90
33.823,-116.542,Palm Springs (Agua Caliente Spring,Santa Ana,Hotspring,104,40
41.196,-120.475,Springs,Alturas,Hotspring,W,W
41.959,-120.936,Warm Spring,Alturas,Hotspring,W,W
37.929,-121.965,Springs,San Jose,Hotspring,W,W
36.83,-117.736,Upper Warm Spring,Death Valley,Hotspring,W,W
33.343,-115.573,Mud Volcanoes,Salton Sea,Hotspring,W,W
35.536,-118.651,Spring (Hot),Bakersfield,Hotspring,W,W
33.332,-115.575,Mud Volcanoes,Salton Sea,Hotspring,W,W
35.967,-116.931,Warm Spring,Trona,Hotspring,W,W
33.28,-115.592,Mud Volcanoes,Salton Sea,Hotspring,W,W
33.288,-115.575,Mud Volcanoes,Salton Sea,Hotspring,W,W
33.312,-115.577,Mud Volcanoes,Salton Sea,Hotspring,W,W
33.313,-115.605,Mud Volcanoes,Salton Sea,Hotspring,W,W
40.393,-121.507,Growler Hot Spring,Susanville,Hotspring,203,95
35.148,-118.783,Warm Spring,Bakersfield,Hotspring,W,W
41.973,-122.202,Klamath Hot Spring,Weed,Hotspring,156,69
41.143,-121.11,Bassett Hot Springs,Alturas,Hotspring,174,79
38.58,-122.575,Calistoga Hot Springs,Santa Rosa,Hotspring,172,78
37.656,-118.834,Hot Creek Springs,Mariposa,Hotspring,171,77
41.229,-121.405,Little Hot Spring,Alturas,Hotspring,169,76
37.664,-118.802,The Tub,Mariposa,Hotspring,167,75
40.355,-120.257,Wendel Hot Springs,Susanville,Hotspring,205,96
38.768,-122.717,Castle Rock Springs,Santa Rosa,Hotspring,163,73
38.245,-119.205,Travertine Hot Springs,Walker Lake,Hotspring,180,82
39.002,-122.664,Sulphur Bank,Ukiah,Hotspring,156,69
39.057,-122.475,Elgin Mine,Ukiah,Hotspring,156,69
39.039,-122.421,Wilbur Springs,Ukiah,Hotspring,153,67
40.444,-121.409,Drakesbad,Susanville,Hotspring,151,66
40.457,-121.545,Mill Creek Springs,Susanville,Hotspring,150,66
38.048,-119.081,Hot Spring,Walker Lake,Hotspring,151,66
37.647,-118.859,Casa Diablo Hot Pool,Mariposa,Hotspring,165,74
41.607,-121.523,Hot Spot,Alturas,Hotspring,191,88
40.44,-121.434,Devils Kitchen,Susanville,Hotspring,203,95
40.302,-120.195,Amedee Hot Springs,Susanville,Hotspring,203,95
36.031,-117.833,Fumarole,Death Valley,Hotspring,203,95
40.447,-121.536,"Sulphur Works, Tophet Hot Springs",Susanville,Hotspring,199,93
40.455,-121.501,Bumpass Hell,Susanville,Hotspring,199,93
37.648,-118.914,Casa Diablo Hot Springs And Geyser,Mariposa,Hotspring,199,93
37.692,-118.839,Little Hot Creek Spring,Mariposa,Hotspring,180,82
34.596,-118.998,Sespe Hot Springs,Los Angeles,Hotspring,194,90
38.348,-119.4,Fales Hot Springs,Walker Lake,Hotspring,180,82
40.434,-121.399,Boiling Springs Lake,Susanville,Hotspring,190,88
41.615,-120.102,Seyferth Hot Springs,Alturas,Hotspring,185,85
41.407,-122.197,"Hot Spring, Fumaroles",Weed,Hotspring,183,84
37.993,-119.028,Paoha Island Springs,Mariposa,Hotspring,181,83
41.025,-121.924,Big Bend Hot Springs,Alturas,Hotspring,180,82
38.699,-119.846,Grovers Hot Springs,Walker Lake,Hotspring,147,64
37.665,-118.828,Hot Creek Gorge Springs,Mariposa,Hotspring,199,93
39.43,-122.538,"Sulphur Spring, Salt Spring",Ukiah,Hotspring,75,24
38.925,-122.77,Hildebrande Spring,Santa Rosa,Hotspring,77,25
38.203,-119.118,Warm Spring,Walker Lake,Hotspring,77,25
36.938,-121.565,Sargent Estate Warm Spring,Santa Cruz,Hotspring,77,25
34.826,-116.677,Newberry Spring,San Bernardino,Hotspring,77,25
41.919,-122.369,Bogus Soda Springs,Weed,Hotspring,76,24
39.053,-122.597,Quigley Soda Spring,Ukiah,Hotspring,82,28
41.252,-120.521,Warm Spring,Alturas,Hotspring,75,24
38.85,-122.693,Pine Cone Spring,Santa Rosa,Hotspring,78,26
38.339,-122.259,Napa Vichy Springs,Santa Rosa,Hotspring,76,24
38.892,-122.533,Baker Soda Spring,Santa Rosa,Hotspring,76,24
38.897,-122.882,England Springs,Santa Rosa,Hotspring,76,24
38.916,-122.799,Carlsbad Spring,Santa Rosa,Hotspring,76,24
38.192,-120.827,Valley Springs,Sacramento,Hotspring,75,24
38.85,-120.025,Myers Warm Spring,Sacramento,Hotspring,75,24
37.708,-118.813,Hot Spring,Mariposa,Hotspring,68,20
36.122,-117.217,Warm Sulphur Springs,Death Valley,Hotspring,80,27
35.682,-116.422,Saratoga Spring,Trona,Hotspring,82,28
33.733,-114.907,Mccoy Spring,Salton Sea,Hotspring,82,28
41.484,-120.764,Spring,Alturas,Hotspring,81,27
39.657,-123.585,Jackson Valley Mud Springs,Ukiah,Hotspring,80,27
39.198,-122.505,Pseudo Complexion Spring,Ukiah,Hotspring,81,27
38.85,-122.667,Bad Creek Spring,Santa Rosa,Hotspring,81,27
32.97,-116.423,Vallecitos Spring,San Diego,Hotspring,79,26
36.765,-120.901,Spring,Santa Cruz,Hotspring,81,27
34.159,-118.499,El Encino Springs,Los Angeles,Hotspring,79,26
35.879,-116.153,Resting Spring,Trona,Hotspring,80,27
41.828,-120.917,Pothole Spring,Alturas,Hotspring,78,26
39.348,-122.668,Fouts Springs,Ukiah,Hotspring,79,26
38.519,-122.26,"Napa Rock Soda Spring, Phillips So",Santa Rosa,Hotspring,78,26
38.838,-122.653,Spiers Springs,Santa Rosa,Hotspring,79,26
35.141,-116.101,Soda Station Springs,Trona,Hotspring,75,24
37.503,-121.904,Alameda Warm Springs,San Jose,Hotspring,80,27
39.429,-123.308,Muir Springs,Ukiah,Hotspring,68,20
37.924,-122.046,Sulphur Spring,San Francisco,Hotspring,75,24
40.58,-120.265,Tipton Springs,Susanville,Hotspring,70,21
39.697,-123.478,Pinches Spring,Ukiah,Hotspring,70,21
38.755,-122.285,Zim Zim Spring,Santa Rosa,Hotspring,70,21
37.083,-121.042,Spring In Oneill Forebay,San Jose,Hotspring,70,21
37.632,-121.762,Crohare Spring,San Jose,Hotspring,70,21
33.625,-115.325,Corn Spring,Salton Sea,Hotspring,72,22
36.117,-118.776,Ward Spring,Fresno,Hotspring,70,21
34.423,-119.538,Boron Spring,Los Angeles,Hotspring,72,22
39.002,-122.498,Grizzly Spring,Ukiah,Hotspring,68,20
39.088,-122.525,Sulphur Spring,Ukiah,Hotspring,68,20
38.125,-122.188,Vallejo White Sulphur Springs,Santa Rosa,Hotspring,68,20
38.31,-122.053,Tolenas Springs,Santa Rosa,Hotspring,68,20
41.45,-120.834,Kelly Hot Spring,Alturas,Hotspring,198,92
36.512,-116.821,Nevares Springs,Death Valley,Hotspring,102,39
37.888,-118.487,Bertrand Ranch Springs,Mariposa,Hotspring,70,21
35.483,-119.917,Mize Spring,Bakersfield,Hotspring,73,23
36.698,-117.848,Little Hunter Canyon Springs,Death Valley,Hotspring,81,27
38.995,-122.642,Davis Soda Spring,Santa Rosa,Hotspring,73,23
37.432,-121.308,Salt Grass Springs,San Jose,Hotspring,73,23
37.573,-121.445,Lone Tree Mineral Spring,San Jose,Hotspring,73,23
37.638,-118.887,Chance Spring,Mariposa,Hotspring,73,23
36.295,-120.985,Sulphur Springs,Santa Cruz,Hotspring,73,23
41.16,-120.403,Warm Spring,Alturas,Hotspring,70,21
35.4,-120.25,Cameta Warm Spring,San Luis Obisp,Hotspring,73,23
37.719,-118.735,Springs,Mariposa,Hotspring,75,24
35.588,-116.359,Sheep Creek Spring,Trona,Hotspring,73,23
40.568,-120.325,Sellicks Springs,Susanville,Hotspring,72,22
38.833,-122.357,One Shot Mining Co,Santa Rosa,Hotspring,72,22
38.95,-122.572,Soda Spring In Cache Formation,Santa Rosa,Hotspring,72,22
37.635,-118.72,Springs,Mariposa,Hotspring,72,22
36.13,-118.816,Soda Spring,Fresno,Hotspring,72,22
36.773,-120.898,Iridat Spring,Santa Cruz,Hotspring,73,23
33.545,-115.654,Canyon Spring,Salton Sea,Hotspring,97,36
36.675,-116.923,Keane Wonder Spring,Death Valley,Hotspring,93,34
36.331,-121.367,Paraiso Springs (Sulphur Spring),Santa Cruz,Hotspring,98,37
35.122,-120.542,Newsom Springs,San Luis Obisp,Hotspring,99,37
34.503,-120.219,Las Cruces Hot Springs,Santa Maria,Hotspring,99,37
38.49,-122.498,St Helena White Sulphur Spring,Santa Rosa,Hotspring,97,36
35.946,-116.189,Chappo Spring,Trona,Hotspring,80,27
40.019,-121.036,Spring,Susanville,Hotspring,99,37
40.44,-121.42,Hot Springs Valley,Susanville,Hotspring,83,28
32.947,-116.305,Agua Caliente Springs,San Diego,Hotspring,101,38
39.196,-122.714,Newman Springs,Ukiah,Hotspring,94,35
37.63,-118.808,Whitmore Hot Springs,Mariposa,Hotspring,95,35
35.269,-120.851,Pecho Warm Springs,San Luis Obisp,Hotspring,95,35
33.514,-117.604,Spring,Santa Ana,Hotspring,95,35
38.958,-122.701,Riviera Beach Spring,Santa Rosa,Hotspring,93,34
36.33,-117.948,Dirty Socks Hot Spring,Death Valley,Hotspring,93,34
37.847,-121.635,Byron Hot Springs,San Jose,Hotspring,96,36
35.433,-118.478,Yates Hot Springs,Bakersfield,Hotspring,100,38
35.663,-120.692,Paso Robles Artesian Spring,San Luis Obisp,Hotspring,102,39
34.507,-119.291,Wheeler Springs,Los Angeles,Hotspring,102,39
33.8,-116.927,Soboda Hot Springs,Santa Ana,Hotspring,102,39
40.223,-122.747,Stinking Springs,Redding,Hotspring,101,38
38.8,-123.17,Hoods Hot Springs,Santa Rosa,Hotspring,100,38
37.029,-117.383,Grapevine Springs,Goldfield,Hotspring,100,38
36.084,-121.584,Dolans Hot Spring,Santa Cruz,Hotspring,98,37
36.21,-118.176,Soda Springs,Fresno,Hotspring,100,38
33.664,-117.913,Fairview Hot Spring,Santa Ana,Hotspring,96,36
35.143,-116.813,Paradise Spring,Trona,Hotspring,100,38
33.837,-117.145,Lakeview Hot Springs,Santa Ana,Hotspring,100,38
33.201,-115.577,Mud Pots,Salton Sea,Hotspring,100,38
33.212,-115.591,Mud Pots,Salton Sea,Hotspring,100,38
33.217,-115.58,Wister Mud Pot,Salton Sea,Hotspring,100,38
32.617,-116.189,Jacumba Hot Springs,San Diego,Hotspring,101,38
36.618,-121.845,Sulphur Hot Spring,Santa Cruz,Hotspring,100,38
36.495,-117.893,Springs,Death Valley,Hotspring,86,30
38.033,-118.902,Mono Basin Warm Springs,Walker Lake,Hotspring,88,31
35.908,-120.367,Table Mountain (Spring),San Luis Obisp,Hotspring,88,31
34.271,-116.838,Pan Hot Springs,San Bernardino,Hotspring,88,31
40.238,-122.11,Tuscan Springs,Redding,Hotspring,86,30
40.245,-120.007,High Rock Spring,Susanville,Hotspring,86,30
38.55,-122.72,Mark West Springs,Santa Rosa,Hotspring,88,31
43.513,-119.903,Springs at Tecolote Tunnel,Los Angeles,Hotspring,93,34
39.728,-120.547,Mclear Warm Springs,Chico,Hotspring,86,30
38.835,-122.731,Gordon Warm Springs,Santa Rosa,Hotspring,97,36
39.166,-123.159,Vichy Springs,Ukiah,Hotspring,85,29
38.936,-122.907,Highland Springs,Santa Rosa,Hotspring,84,29
37.398,-121.794,Mineral Springs,San Jose,Hotspring,84,29
33.436,-117.324,De Luz Warm Springs,Santa Ana,Hotspring,85,29
33.512,-115.827,Dos Palmas Spring,Salton Sea,Hotspring,84,29
39.022,-122.444,Abbott Mine,Ukiah,Hotspring,86,30
34.605,-118.561,Warm Spring,Los Angeles,Hotspring,92,33
41.659,-123.319,Sulphur Springs,Weed,Hotspring,84,29
38.394,-122.552,Los Guilicos Warm Springs,Santa Rosa,Hotspring,88,31
41.492,-120.7,Essex Springs,Alturas,Hotspring,91,33
38.654,-122.484,Aetna Springs,Santa Rosa,Hotspring,91,33
35.842,-117.38,Bainter Spring,Trona,Hotspring,92,33
34.228,-117.483,Tylers Bath Spring,San Bernardino,Hotspring,92,33
33.363,-117.017,Agua Tibia Spring,Santa Ana,Hotspring,92,33
41.167,-120.032,Bare Ranch Spring,Alturas,Hotspring,90,32
35.978,-116.273,Shoshone Spring,Trona,Hotspring,90,32
33.407,-116.035,Fish Springs,Santa Ana,Hotspring,90,32
35.582,-120.666,Santa Ysabel Springs (Sulphur Spr),San Luis Obisp,Hotspring,92,33
34.537,-119.613,Little Caliente Spring,Los Angeles,Hotspring,90,32
39.006,-122.787,Big Soda Spring,Ukiah,Hotspring,90,32
35.439,-119.846,Carneros Spring,Bakersfield,Hotspring,90,32
36.441,-116.829,Travertine Springs,Death Valley,Hotspring,90,32
37.88,-122.627,Rocky Point Springs,San Francisco,Hotspring,90,32
39.227,-107.224,Penny Hot Springs,Leadville,Hotspring,133,56
38.732,-106.178,Hortense Hot Spring,Montrose,Hotspring,181,83
37.4,-107.849,Tripp Hot Springs,Durango,Hotspring,111,44
40.073,-106.113,Hot Sulphur Springs,Craig,Hotspring,111,44
39.739,-105.512,Idaho Springs,Denver,Hotspring,115,46
39.552,-107.412,South Canyon Hot Springs,Leadville,Hotspring,118,48
39.548,-107.322,Glenwood Springs,Leadville,Hotspring,124,51
38.133,-107.736,Orvis Hot Spring,Montrose,Hotspring,126,52
39.017,-105.793,Hartsel Hot Springs,Denver,Hotspring,126,52
38.733,-106.162,Mount Princeton Hot Springs,Montrose,Hotspring,133,56
37.752,-108.131,Paradise Warm Spring,Cortez,Hotspring,115,46
37.747,-106.831,Wagon Wheel Gap Hot Springs,Durango,Hotspring,135,57
37.263,-107.011,Pagosa Springs,Durango,Hotspring,136,58
38.812,-106.226,Cottonwood Hot Springs,Montrose,Hotspring,136,58
38.168,-105.924,Mineral Hot Springs,Pueblo,Hotspring,140,60
40.559,-106.849,Routt Hot Springs,Craig,Hotspring,147,64
38.021,-107.672,Ouray Hot Springs,Montrose,Hotspring,156,69
38.498,-106.076,Poncha Hot Springs,Montrose,Hotspring,160,71
38.514,-106.508,Upper Waunita Hot Springs,Montrose,Hotspring,176,80
38.272,-107.1,Cebolla Hot Springs,Montrose,Hotspring,106,41
37.313,-107.344,Piedra River Hot Springs,Durango,Hotspring,108,42
38.517,-106.515,Lower Waunita Hot Springs,Montrose,Hotspring,167,75
38.816,-106.873,Ranger Hot Spring,Montrose,Hotspring,81,27
37.294,-105.784,Dexter Spring,Trinidad,Hotspring,68,20
38.634,-106.072,Browns Grotto Warm Spring,Montrose,Hotspring,73,23
39.164,-106.062,Rhodes Warm Spring,Leadville,Hotspring,75,24
38.836,-106.825,Cement Creek Hot Spring,Montrose,Hotspring,77,25
38.653,-106.056,Browns Canyon Warm Spring,Montrose,Hotspring,77,25
37.033,-106.805,Stinking Springs,Durango,Hotspring,81,27
37.747,-108.117,Geyser Warm Spring,Cortez,Hotspring,82,28
38.479,-105.891,Swissvale Warm Springs,Pueblo,Hotspring,82,28
37.751,-106.317,Shaw Springs,Durango,Hotspring,86,30
37.728,-107.054,Birdsie Warm Spring,Durango,Hotspring,86,30
37.741,-107.034,Antelope Spring,Durango,Hotspring,90,32
39.628,-107.106,Dotsero Warm Springs,Leadville,Hotspring,90,32
38.485,-105.91,Wellsville Warm Spring,Pueblo,Hotspring,91,33
38.014,-108.054,Lemon Hot Spring,Moab,Hotspring,91,33
37.391,-107.846,"Trimble Hot Spr, Stratten Warm Spr",Durango,Hotspring,97,36
38.192,-105.816,Valley View Hot Springs,Pueblo,Hotspring,99,37
38.433,-105.261,Canon City Hot Springs,Pueblo,Hotspring,104,40
39.012,-106.891,Conundrum Hot Springs,Leadville,Hotspring,100,38
37.511,-106.945,Rainbow Hot Springs,Durango,Hotspring,104,40
40.467,-107.952,Juniper Hot Springs,Craig,Hotspring,100,38
40.483,-106.827,Steamboat Springs,Craig,Hotspring,102,39
37.771,-108.091,Dunton Hot Spring,Cortez,Hotspring,108,42
37.453,-107.803,Pinkerton Hot Springs,Durango,Hotspring,90,32
39.932,-105.277,Eldorado Springs,Denver,Hotspring,79,26
27.074,-82.233,Little Salt Spring,Tampa,Hotspring,81,27
27.06,-82.261,Warm Mineral Springs (Big Salt Spr,Tampa,Hotspring,86,30
32.92,-84.438,Barker Spring,Phenix City,Hotspring,73,23
32.964,-84.499,Thundering Spring,Phenix City,Hotspring,75,24
33.018,-84.327,Taylor Spring,Atlanta,Hotspring,75,24
32.862,-84.65,Parkman Spring,Phenix City,Hotspring,77,25
33.037,-84.374,Lifsey Spring,Atlanta,Hotspring,79,26
32.893,-84.69,Warm Springs,Phenix City,Hotspring,88,31
32.873,-84.547,Tom Brown Spring,Phenix City,Hotspring,68,20
19.407,-155.277,Steam Vents,Hawaii,Hotspring,H,H
19.46,-154.847,Isaac Hale Park Spring,Hawaii,Hotspring,97,36
19.496,-154.876,Warm Vapor,Hawaii,Hotspring,W,W
19.373,-155.188,Steam Vents,Hawaii,Hotspring,H,H
19.39,-155.311,Steam Vents,Hawaii,Hotspring,H,H
19.434,-155.272,Steam Vents,Hawaii,Hotspring,H,H
19.486,-155.598,Steam Vents,Hawaii,Hotspring,H,H
19.466,-154.943,Steam Vents,Hawaii,Hotspring,H,H
19.421,-155.62,Steam Vents,Hawaii,Hotspring,H,H
19.201,-155.384,Waiwelawela Point Spring,Hawaii,Hotspring,90,32
19.593,-154.928,Akins Spring,Hawaii,Hotspring,84,29
44.721,-115.01,Thomas Creek Ranch Hot Spring,Challis,Hotspring,138,59
45.431,-116.015,Cow Flats Hot Spring,Grangeville,Hotspring,138,59
44.062,-115.685,Pine Flat Hot Springs,Challis,Hotspring,138,59
44.382,-115.841,Dash Creek Hot Springs,Challis,Hotspring,138,59
44.077,-115.553,Haven Lodge Hot Spring,Challis,Hotspring,147,64
43.647,-114.816,Skillern Hot Springs,Hailey,Hotspring,140,60
43.789,-115.434,Dutch Frank Hot Spring,Hailey,Hotspring,149,65
43.54,-115.288,Bridge Hot Springs,Hailey,Hotspring,138,59
43.72,-115.617,Smith Cabin Hot Spring,Hailey,Hotspring,138,59
42.688,-114.826,Banbury Hot Spring,Twin Falls,Hotspring,138,59
45.035,-115.561,Sheep Creek Hot Spring,Elk City,Hotspring,136,58
44.245,-114.885,Elkhorn Hot Spring,Challis,Hotspring,136,58
44.642,-115.693,Mollys Hot Spring,Challis,Hotspring,138,59
43.811,-115.116,Atlanta Hot Springs,Hailey,Hotspring,140,60
44.679,-116.231,White Licks Hot Spring,Baker,Hotspring,140,60
45.512,-115.046,Barth Hot Springs,Elk City,Hotspring,140,60
43.696,-115.658,Sheep Creek Bridge Hot Spring,Hailey,Hotspring,142,61
44.914,-115.722,Teapot Hot Spring,Challis,Hotspring,142,61
43.788,-115.444,Straight Creek Hot Spring,Hailey,Hotspring,144,62
43.116,-115.305,Latty Hot Spring,Hailey,Hotspring,144,62
45.039,-116.291,Zims Resort Hot Springs,Grangeville,Hotspring,144,62
43.049,-114.952,White Arrow Hot Spring,Hailey,Hotspring,145,63
44.645,-114.739,Upper Loon Creek Hot Springs,Challis,Hotspring,145,63
43.383,-114.931,Wardrop Hot Spring,Hailey,Hotspring,147,64
44.531,-116.754,Fairchild Hot Spring,Baker,Hotspring,126,52
44.661,-114.652,Foster Ranch Hot Springs,Challis,Hotspring,135,57
44.051,-115.829,Dan Hodges Hot Spring,Challis,Hotspring,140,60
43.506,-114.354,Hailey Hot Springs,Hailey,Hotspring,131,55
43.982,-114.486,West Pass Hot Spring,Hailey,Hotspring,124,51
43.641,-114.487,Warfield Hot Spring,Hailey,Hotspring,124,51
44.145,-112.554,Lidy Hot Springs,Dubois,Hotspring,124,51
44.054,-115.907,Hot Spring Campground,Challis,Hotspring,124,51
42.032,-115.363,Murphy Hot Springs,Twin Falls,Hotspring,126,52
43.561,-114.415,Clarendon Hot Springs,Hailey,Hotspring,126,52
43.423,-114.627,Elk Creek Hot Spring,Hailey,Hotspring,126,52
43.553,-115.267,Paradise Hot Springs,Hailey,Hotspring,126,52
42.308,-111.707,Maple Grove Hot Springs,Preston,Hotspring,172,78
45.013,-113.605,Sharkey Hot Spring,Dillon,Hotspring,126,52
44.73,-114.993,Sunflower Hot Springs,Challis,Hotspring,149,65
43.974,-114.499,Lower Bowery Hot Spring,Hailey,Hotspring,129,54
43.724,-115.604,Loftus Hot Spring,Hailey,Hotspring,129,54
44.676,-115.943,Gold Fork Hot Spring,Challis,Hotspring,127,53
44.044,-115.851,Donlay Ranch Hot Spring,Challis,Hotspring,131,55
44.264,-114.818,Basin Creek Hot Spring,Challis,Hotspring,133,56
44.652,-114.734,Owen Cabin Hot Spring,Challis,Hotspring,133,56
43.605,-115.664,Rattlesnake Hot Spring,Hailey,Hotspring,133,56
43.605,-114.948,Lightfoot Hot Springs,Hailey,Hotspring,133,56
45.788,-115.198,Red River Hot Springs,Elk City,Hotspring,131,55
44.632,-115.697,South Fork Plunge,Challis,Hotspring,129,54
44.853,-116.442,Starkey Hot Springs,Baker,Hotspring,131,55
42.692,-114.859,Hot Sulphur (Miracle Hot) Springs,Twin Falls,Hotspring,131,55
44.045,-115.842,Corder Hot Spring,Challis,Hotspring,131,55
44.247,-114.676,Robinson Bar Hot Springs,Challis,Hotspring,131,55
44.785,-114.855,Cox Hot Springs,Challis,Hotspring,131,55
43.637,-115.13,Willow Creek Hot Spring,Hailey,Hotspring,131,55
43.803,-115.401,Granite Creek Hot Spring,Hailey,Hotspring,131,55
43.129,-115.34,Coyote Hot Spring,Hailey,Hotspring,135,57
44.211,-116.71,Cove Creek Hot Spring,Baker,Hotspring,131,55
44.16,-115.167,Grandjean Hot Spring,Challis,Hotspring,H,H
43.755,-115.571,Ninemeyer Hot Springs,Hailey,Hotspring,169,76
43.701,-114.738,Big Smokey Hot Spring,Hailey,Hotspring,H,H
43.831,-115.192,Queens River Hot Spring,Hailey,Hotspring,H,H
43.817,-115.046,Leggit Creek Hot Spring,Hailey,Hotspring,H,H
43.718,-115.563,Basset Hot Spring,Hailey,Hotspring,H,H
43.588,-115.988,Mores Creek Hot Spring,Hailey,Hotspring,H,H
44.951,-114.704,Mormon Ranch Warm Spring,Challis,Hotspring,H,H
44.896,-114.563,Forge Creek Hot Springs,Challis,Hotspring,H,H
44.77,-115.663,Billy Hot Spring,Challis,Hotspring,H,H
44.628,-115.197,Sheepeater Hot Springs,Challis,Hotspring,H,H
44.585,-115.072,Sulphur Creek Hot Spring,Challis,Hotspring,H,H
44.554,-115.301,Sulphur Creek Hot Spring,Challis,Hotspring,H,H
42.107,-113.39,Blm Well (Frazier Hot Spring),Pocatello,Hotspring,203,95
44.4,-115.82,Goat Hot Springs,Challis,Hotspring,H,H
45.307,-114.338,Big Creek Hot Springs,Elk City,Hotspring,199,93
44.583,-116.112,Cascade Reservoir Hot Spring,Baker,Hotspring,H,H
45.17,-115.807,Secesh Hot Spring,Elk City,Hotspring,H,H
46.235,-114.707,Prospector Hot Springs,Hamilton,Hotspring,H,H
46.138,-115.09,Stuart Hot Springs,Hamilton,Hotspring,H,H
46.006,-115.021,Marten Hot Springs,Hamilton,Hotspring,H,H
42.374,-111.726,Mound Valley Warm Spring,Preston,Hotspring,W,W
43.255,-114.829,Mormon Reservoir Warm Spring,Hailey,Hotspring,W,W
44.639,-115.671,Warm Lake Springs,Challis,Hotspring,W,W
44.445,-115.239,Bear Valley Hot Spring,Challis,Hotspring,W,W
44.354,-117.071,Old Homestead Warm Spring,Baker,Hotspring,W,W
43.327,-113.918,Condie Hot Springs,Idaho Falls,Hotspring,124,51
43.038,-112.004,Alkali Flats Warm Spring,Idaho Falls,Hotspring,93,34
44.43,-115.762,Bull Creek Hot Springs,Challis,Hotspring,H,H
42.119,-111.928,Squaw Hot Springs,Preston,Hotspring,163,73
42.333,-111.716,Cleveland Hot Springs,Preston,Hotspring,151,66
43.671,-115.696,Twin Springs,Hailey,Hotspring,151,66
43.951,-116.353,Roystone Hot Springs,Boise,Hotspring,151,66
42.704,-114.856,Salmon Falls Hot Spring,Twin Falls,Hotspring,153,67
44.16,-115.177,Sacajawea Hot Springs,Challis,Hotspring,153,67
43.738,-115.583,Vaughn Hot Spring,Hailey,Hotspring,154,68
44.669,-116.305,Council Mtn Hot Springs,Baker,Hotspring,154,68
44.831,-115.215,Kwiskwis Hot Spring,Challis,Hotspring,156,69
43.684,-114.41,Guyer Hot Springs,Hailey,Hotspring,158,70
43.155,-115.518,Hot Springs,Hailey,Hotspring,158,70
44.586,-116.63,Lakey Hot Spring,Baker,Hotspring,158,70
42.333,-115.65,Indian Hot Springs,Twin Falls,Hotspring,160,71
42.637,-114.892,Poison Springs,Twin Falls,Hotspring,H,H
44.813,-115.123,Middle Fork Indian Creek Hot Sprin,Challis,Hotspring,162,72
44.072,-115.543,Kirkham Hot Springs,Challis,Hotspring,149,65
43.328,-114.399,Magic Hot Springs,Hailey,Hotspring,163,73
43.293,-114.908,Barrons Hot Spring,Hailey,Hotspring,167,75
44.154,-115.993,Warm Springs Creek Hot Springs,Challis,Hotspring,167,75
44.268,-114.748,Sunbeam Hot Springs,Challis,Hotspring,169,76
44.092,-116.052,Deer Hot Springs,Baker,Hotspring,176,80
43.563,-114.798,Worswick Hot Springs,Hailey,Hotspring,180,82
42.133,-111.928,Battle Creek Hot Springs,Preston,Hotspring,183,84
44.364,-115.856,Boiling Springs,Challis,Hotspring,185,85
44.157,-115.314,Bonneville Hot Springs,Challis,Hotspring,185,85
44.799,-115.129,Indian Creek Hot Spring,Challis,Hotspring,190,88
44.568,-115.695,Vulcan Hot Springs,Challis,Hotspring,190,88
44.306,-116.745,Crane Creek Hot Springs,Baker,Hotspring,198,92
44.416,-116.031,Cabarton Hot Spring,Baker,Hotspring,160,71
42.781,-111.983,Portneuf River Warm Spring,Preston,Hotspring,93,34
44.621,-115.985,Badley Warm Spring,Challis,Hotspring,100,38
45.201,-116.312,Boulder Creek Spring,Grangeville,Hotspring,82,28
42.24,-113.588,Sears Spring,Pocatello,Hotspring,84,29
44.257,-112.639,Warm Springs,Dubois,Hotspring,84,29
42.911,-111.556,Henry Warm Spring,Preston,Hotspring,86,30
43.021,-111.695,Wilson Lake Warm Spring,Driggs,Hotspring,86,30
44.495,-116.732,Keithly Warm Spring,Baker,Hotspring,86,30
42.655,-111.643,Steamboat Hot Spring,Preston,Hotspring,88,31
45.152,-116.296,Stinky Warm Spring,Grangeville,Hotspring,88,31
42.725,-112.872,Indian Springs,Pocatello,Hotspring,90,32
43.114,-112.167,Yandell Springs,Idaho Falls,Hotspring,90,32
44.64,-116.045,Arling Hot Spring,Baker,Hotspring,90,32
42.657,-111.604,Soda Springs,Preston,Hotspring,82,28
45.07,-115.826,Lick Creek Warm Spring,Elk City,Hotspring,91,33
42.337,-111.726,Treasureton Hot Springs,Preston,Hotspring,95,35
44.382,-114.088,Little Antelope Flat Warm Spring,Challis,Hotspring,93,34
43.21,-111.495,Brockman Creek Hot Spring,Driggs,Hotspring,95,35
44.398,-115.149,Cape Horn Warm Springs,Challis,Hotspring,95,35
42.337,-114.509,Nat-Soo-Pah Warm Spring,Twin Falls,Hotspring,97,36
44.9,-115.505,Hot Creek Warm Spring,Challis,Hotspring,97,36
42.405,-114.142,Artesian City Hot Springs,Twin Falls,Hotspring,99,37
42.762,-115.739,Indian Bathtub Hot Springs,Twin Falls,Hotspring,99,37
43.227,-111.109,Alpine Warm Spring,Driggs,Hotspring,99,37
42.545,-112.906,Rockland Warm Springs,Pocatello,Hotspring,100,38
43.805,-114.585,Russian John Hot Spring,Hailey,Hotspring,100,38
43.779,-114.539,Easley Hot Springs,Hailey,Hotspring,100,38
44.26,-114.838,Mormon Bend Hot Spring,Challis,Hotspring,100,38
44.64,-113.504,Big Eightmile Creek Warm Spring,Dubois,Hotspring,91,33
42.339,-112.436,Kent Warm Spring,Pocatello,Hotspring,75,24
42.957,-112.458,Tadpole Warm Spring,Pocatello,Hotspring,68,20
43.607,-111.189,Taylor Springs,Driggs,Hotspring,68,20
43.972,-116.325,Sweet Warm Spring,Boise,Hotspring,68,20
44.717,-115.703,Dollar Creek Warm Spring,Challis,Hotspring,68,20
42.625,-113.107,Lake Walcott Hot Spring,Pocatello,Hotspring,70,21
42.015,-114.237,Thoroughbred Warm Springs,Twin Falls,Hotspring,69,21
42.928,-111.592,Blackfoot Reservoir Warm Spring,Preston,Hotspring,72,22
42.286,-113.446,"Rice Spring, Ward Spring",Pocatello,Hotspring,72,22
42.085,-113.564,Grape Creek Warm Spring,Pocatello,Hotspring,72,22
43.66,-111.715,Elkhorn Warm Spring,Driggs,Hotspring,72,22
43.367,-113.884,Rush Warm Spring,Idaho Falls,Hotspring,72,22
44.306,-117.042,Weiser Warm Springs,Baker,Hotspring,72,22
45.344,-114.463,Owl Creek Hot Springs,Elk City,Hotspring,122,50
44.454,-112.696,Big Spring,Dubois,Hotspring,73,23
44.269,-113.449,Barney Hot Springs,Dubois,Hotspring,82,28
43.5,-115.308,Towne Creek Warm Spring,Hailey,Hotspring,75,24
43.161,-116.332,Thomas Flats Warm Spring,Boise,Hotspring,75,24
44.612,-113.363,Whittaker Warm Springs,Dubois,Hotspring,75,24
42.173,-112.239,Malad Warm Spring,Pocatello,Hotspring,77,25
42.156,-112.348,Pleasantview Warm Springs,Pocatello,Hotspring,77,25
42.025,-112.226,Prices Warm Spring,Pocatello,Hotspring,77,25
42.865,-116.368,Lower Birch Spring,Jordan Valley,Hotspring,77,25
43.423,-111.414,Fall Creek Mineral Springs,Driggs,Hotspring,77,25
42.986,-111.743,Blackfoot River Warm Spring,Preston,Hotspring,79,26
42.426,-111.378,Pescadero Warm Spring,Preston,Hotspring,79,26
44.091,-111.458,Ashton Warm Spring,Ashton,Hotspring,79,26
42.056,-112.246,Woodruff Hot Spring,Pocatello,Hotspring,81,27
43.831,-116.396,Highland Land Co Warm Spring,Boise,Hotspring,73,23
44.847,-115.696,Holdover Hot Spring,Challis,Hotspring,117,47
43.047,-114.929,Hot Sulphur Lake,Hailey,Hotspring,81,27
43.603,-115.07,Baumgartner Hot Spring,Hailey,Hotspring,111,44
44.465,-116.037,Belvidere Hot Spring,Baker,Hotspring,111,44
42.621,-112.008,Lava Hot Springs,Pocatello,Hotspring,113,45
43.823,-115.327,Weatherby Hot Spring,Hailey,Hotspring,113,45
43.335,-115.044,Wolf Hot Spring,Hailey,Hotspring,113,45
44.905,-113.929,Goldbug Hot Spring,Dubois,Hotspring,113,45
45.095,-113.836,Salmon Hot Spring,Dillon,Hotspring,113,45
45.277,-115.912,Burgdorf Hot Springs,Elk City,Hotspring,113,45
44.836,-114.79,Hospital Hot Spring,Challis,Hotspring,115,46
44.72,-114.016,Cronks Canyon Hot Spring,Challis,Hotspring,115,46
44.721,-115.207,Pistol Creek Hot Springs,Challis,Hotspring,115,46
43.791,-111.435,Pincock (Green Canyon) Hot Springs,Driggs,Hotspring,111,44
43.414,-116.707,Givens Hot Springs,Boise,Hotspring,117,47
45.503,-114.463,Horse Creek Hot Springs,Elk City,Hotspring,109,43
46.464,-115.035,Weir Creek Hot Springs,Hamilton,Hotspring,117,47
42.115,-111.264,Bear Lake Hot Springs,Preston,Hotspring,118,48
42.173,-113.861,Oakley Hot Spring,Pocatello,Hotspring,118,48
46.463,-114.872,Jerry Johnson Hot Springs,Hamilton,Hotspring,118,48
43.644,-111.687,Heise Hot Springs,Driggs,Hotspring,120,49
44.799,-114.806,Lower Loon Creek Hot Spring,Challis,Hotspring,120,49
44.253,-115.891,Rocky Canyon Hot Springs,Challis,Hotspring,120,49
46.316,-115.258,Stanley Hot Springs,Hamilton,Hotspring,120,49
43.779,-115.486,Brown Creek Hot Spring,Hailey,Hotspring,122,50
44.628,-114.601,Shower Bath Springs,Challis,Hotspring,122,50
44.171,-114.624,Slate Creek Hot Spring,Challis,Hotspring,122,50
44.392,-115.834,Ground Hog Hot Springs,Challis,Hotspring,100,38
42.797,-115.723,"Bat Hot Spring, Pence Hot Spring",Twin Falls,Hotspring,117,47
42.767,-115.725,Lower Indian Bathtub Hot Springs,Twin Falls,Hotspring,108,42
42.102,-113.632,Durfee Spring,Pocatello,Hotspring,102,39
44.33,-115.802,Silver Creek Hot Spring,Challis,Hotspring,102,39
42.447,-113.523,Marsh Creek Hot Spring,Pocatello,Hotspring,104,40
42.449,-113.511,Marsh Gully Hot Springs,Pocatello,Hotspring,106,41
42.798,-115.742,Bruneau Hot Spring,Twin Falls,Hotspring,106,41
43.576,-114.83,Preis Hot Spring,Hailey,Hotspring,106,41
43.677,-116.208,Terteling Hot Springs,Boise,Hotspring,106,41
44.254,-114.443,Sullivan Hot Springs,Challis,Hotspring,106,41
44.224,-114.929,Stanley Hot Spring,Challis,Hotspring,106,41
44.101,-114.865,Rosalys Warm Spring,Challis,Hotspring,106,41
44.06,-115.819,Danskin Creek Hot Spring,Challis,Hotspring,106,41
45.852,-114.937,Running Warm Springs,Elk City,Hotspring,106,41
43.363,-113.779,Milford Sweat Hot Spring,Idaho Falls,Hotspring,111,44
46.466,-114.939,Colgate Warm Springs,Hamilton,Hotspring,106,41
44.626,-115.749,Trail Creek Hot Spring,Challis,Hotspring,122,50
43.816,-115.863,Warm Springs,Hailey,Hotspring,108,42
43.76,-115.56,Pool Creek Hot Spring,Hailey,Hotspring,108,42
45.042,-114.616,Snowshoe Johnsons Hot Spring,Elk City,Hotspring,108,42
42.388,-112.085,Downata Hot Springs,Pocatello,Hotspring,109,43
42.013,-114.504,Magic Hot Springs,Twin Falls,Hotspring,109,43
42.779,-115.715,Buckaroo Hot Spring,Twin Falls,Hotspring,109,43
43.99,-114.8,Pierson Hot Springs,Hailey,Hotspring,109,43
43.038,-114.988,Tschanne Hot Spring,Hailey,Hotspring,109,43
44.523,-114.173,Beardsley Hot Springs,Challis,Hotspring,109,43
44.733,-115.018,Sunflower Flat Hot Spring,Challis,Hotspring,109,43
44.516,-115.295,Dagger Creek Hot Spring,Challis,Hotspring,110,43
44.971,-116.203,Krigbaum Hot Springs,Baker,Hotspring,109,43
45.416,-116.172,Riggins Hot Springs,Grangeville,Hotspring,106,41
42.735,-73.2,Sand Spring,Albany,Hotspring,75,24
46.106,-114.004,Sleeping Child Hot Springs,Hamilton,Hotspring,122,50
45.697,-114.365,Blue Joint Hot Springs 2,Elk City,Hotspring,84,29
44.769,-111.649,Sloan Cow Camp Spring,Ashton,Hotspring,86,30
47.632,-112.855,Medicine (Sun River) Springs,Choteau,Hotspring,86,30
45.75,-113.938,Gallogly Spring,Dillon,Hotspring,100,38
47.33,-114.789,Quinns Hot Springs,Wallace,Hotspring,109,43
45.171,-112.153,Puller Hot Springs,Dillon,Hotspring,111,44
46.728,-114.533,"Lolo Hot Springs, Granite Springs",Hamilton,Hotspring,111,44
45.337,-110.691,Chico Hot Springs,Bozeman,Hotspring,113,45
47.607,-114.663,Camas Hot Springs,Wallace,Hotspring,113,45
45.841,-114.038,Medicine Hot Springs,Elk City,Hotspring,117,47
45.458,-113.109,Elkhorn Hot Springs,Dillon,Hotspring,118,48
45.027,-112.844,Mcmenomey Ranch Spring,Dillon,Hotspring,68,20
45.792,-112.126,Renova Hot Springs,Dillon,Hotspring,122,50
44.701,-111.878,Staudenmeyer Springs,Ashton,Hotspring,82,28
45.602,-111.9,Potosi Warm Springs,Bozeman,Hotspring,124,51
45.575,-111.683,Norris Hot Springs,Bozeman,Hotspring,127,53
45.462,-112.475,New Biltmore Hot Springs,Dillon,Hotspring,127,53
45.66,-111.186,Bozeman Hot Springs,Bozeman,Hotspring,131,55
45.896,-112.233,Pipestone Hot Springs,Dillon,Hotspring,135,57
46.547,-110.903,White Sulphur Springs,White Sulphur,Hotspring,136,58
46.448,-111.982,Alhambra Hot Springs,White Sulphur,Hotspring,138,59
45.757,-110.256,Hunters Hot Springs,Bozeman,Hotspring,140,60
45.368,-113.403,Jardine Hot Spring,Dillon,Hotspring,140,60
46.596,-112.108,Broadwater (Helena) Hot Springs,Butte,Hotspring,151,66
44.984,-111.613,Wolf Creek Hot Springs,Ashton,Hotspring,154,68
45.685,-112.295,Silver Star Hot Springs,Dillon,Hotspring,163,73
45.59,-111.899,Potosi Hot Springs,Bozeman,Hotspring,122,50
45.105,-112.751,Browns Springs,Dillon,Hotspring,75,24
46.718,-113.306,Bearmouth Warm Spring 2,Butte,Hotspring,68,20
46.717,-113.32,Bearmouth Warm Spring 1,Butte,Hotspring,68,20
47.217,-109.471,Brooks Warm Spring,Lewistown,Hotspring,68,20
45.708,-110.976,Bridger Canyon Warm Spring,Bozeman,Hotspring,70,21
46.795,-108.883,Durfee Creek Springs,Roundup,Hotspring,70,21
46.704,-113.452,Nimrod Springs,Butte,Hotspring,70,21
47.876,-108.656,Landusky Springs,Lewistown,Hotspring,70,21
45.032,-110.667,Bear Creek Springs,Bozeman,Hotspring,72,22
45.111,-112.714,Lovells Hot Spring,Dillon,Hotspring,72,22
46.106,-112.903,Anaconda Hot Springs,Butte,Hotspring,72,22
45.235,-112.135,Trudau Warm Springs,Dillon,Hotspring,73,23
45.698,-114.382,Blue Joint Hot Spring 1,Elk City,Hotspring,84,29
45.037,-111.953,Vigilante Spring,Bozeman,Hotspring,75,24
45.608,-110.571,Carter Bridge Warm Springs,Bozeman,Hotspring,82,28
46.355,-111.565,Bedford Hot Springs,White Sulphur,Hotspring,74,24
45.553,-110.142,Anderson Springs,Bozeman,Hotspring,77,25
45.42,-112.692,Apex Warm Spring,Dillon,Hotspring,77,25
46.607,-112.776,Garrison Warm Springs,Butte,Hotspring,77,25
47.843,-108.598,The (Landusky) Plunge,Lewistown,Hotspring,77,25
44.785,-111.649,West Fork Swimming Hole,Ashton,Hotspring,79,26
46.61,-112.555,Avon Warm Spring,Butte,Hotspring,79,26
46.334,-112.886,Deerlodge Prison Ranch Springs,Butte,Hotspring,79,26
47.994,-108.445,Lodgepole (Big Warm) Springs,Lewistown,Hotspring,79,26
47.451,-114.648,Green Springs,Wallace,Hotspring,79,26
45.392,-112.452,Beaverhead Rock Spring,Dillon,Hotspring,81,27
44.704,-111.892,Andersons Pasture Springs,Ashton,Hotspring,82,28
47.971,-108.395,Little Warm Springs,Lewistown,Hotspring,73,23
46.198,-112.094,Boulder Hot Springs,Butte,Hotspring,169,76
46.178,-112.794,Warm Springs (State Hospital),Butte,Hotspring,172,78
45.367,-111.726,Ennis Hot Springs,Bozeman,Hotspring,181,83
46.044,-112.811,Gregson Hot Springs,Butte,Hotspring,158,70
45.09,-110.774,Laduke (Corwin) Hot Spring,Bozeman,Hotspring,154,68
35.897,-82.826,Hot Springs,Knoxville,Hotspring,108,42
32.644,-108.128,Apache Tejo Warm Spring,Silver City,Hotspring,97,36
33.135,-107.254,Truth Or Consequences,Tularosa,Hotspring,113,45
36.305,-106.053,Ojo Caliente (Arsenic Spring),Aztec,Hotspring,111,44
33.162,-108.209,Spring (Hot),Clifton,Hotspring,111,44
36.508,-105.722,Manby Hot Springs,Raton,Hotspring,100,38
35.849,-106.629,Spence Hot Springs,Albuquerque,Hotspring,100,38
35.972,-106.56,San Antonio Warm Spring,Albuquerque,Hotspring,101,38
35.82,-106.627,Mccauley Hot Springs,Albuquerque,Hotspring,99,37
35.793,-106.685,Soda Dam Hot Springs,Albuquerque,Hotspring,117,47
33.831,-108.8,(Upper) Frisco Hot Spring,Clifton,Hotspring,98,37
35.646,-106.888,Warm Springs,Albuquerque,Hotspring,129,54
36.324,-105.606,Ponce De Leon Springs,Raton,Hotspring,93,34
34.038,-106.94,"Socorro Spring, Sedillo Spring",Socorro,Hotspring,93,34
33.293,-108.282,"Spring Mfg Two, Spring Mfg Three",Clifton,Hotspring,99,37
35.592,-106.753,Indian Springs,Albuquerque,Hotspring,123,51
32.501,-106.926,Radium Springs,Las Cruces,Hotspring,127,53
33.274,-108.25,Spring Mfg Four,Clifton,Hotspring,93,34
35.938,-106.646,San Antonio Hot Spring,Albuquerque,Hotspring,129,54
33.244,-108.88,San Francisco Hot Springs,Clifton,Hotspring,120,49
32.748,-107.836,Mimbres Hot Springs,Las Cruces,Hotspring,136,58
35.653,-105.29,Montezuma Hot Springs,Santa Fe,Hotspring,138,59
33.233,-108.235,Spring (Hot),Clifton,Hotspring,149,65
33.199,-108.209,Gila Hot Springs,Clifton,Hotspring,151,66
33.108,-108.483,Turkey Creek Hot Spring,Clifton,Hotspring,165,74
35.772,-106.69,Jemez Springs,Albuquerque,Hotspring,169,76
35.908,-106.615,Sulphur Springs,Albuquerque,Hotspring,189,87
33.237,-108.88,Hot Springs,Clifton,Hotspring,H,H
32.562,-108.027,Kennecott Warm Springs,Silver City,Hotspring,W,W
32.554,-107.994,Faywood Hot Springs,Las Cruces,Hotspring,129,54
33.898,-108.501,Aragon Springs,Clifton,Hotspring,70,21
34.847,-107.091,Spring (Salt),Socorro,Hotspring,76,24
34.903,-107.085,El Ojo Escondido,Socorro,Hotspring,73,23
35.06,-107.133,Alamos Spring,Albuquerque,Hotspring,72,22
34.912,-108.951,Rainbow Spring,Saint Johns,Hotspring,71,22
34.698,-107.129,Spring,Socorro,Hotspring,71,22
32.455,-104.489,Indian Big Spring,Carlsbad,Hotspring,79,26
34.995,-106.454,Clear Water Spring,Socorro,Hotspring,69,21
32.821,-108.408,Ash Spring,Silver City,Hotspring,72,22
32.83,-109.047,Goat Camp Spring,Silver City,Hotspring,69,21
35.548,-106.827,San Ysidro Warm Springs,Albuquerque,Hotspring,68,20
34.116,-106.98,Ojitos Springs,Socorro,Hotspring,68,20
32.248,-104.411,Mosley Spring,Carlsbad,Hotspring,68,20
33.708,-109.025,Frieborn Canyon Spring,Clifton,Hotspring,92,33
33.192,-108.18,Lyons Hunting Lodge Hot Springs,Clifton,Hotspring,126,52
35.601,-106.86,Phillips Springs,Albuquerque,Hotspring,70,21
33.285,-108.262,Spring Mfg One,Clifton,Hotspring,88,31
33.306,-108.324,The Meadows Warm Spring,Clifton,Hotspring,91,33
34.049,-106.939,Cook Spring,Socorro,Hotspring,70,21
32.795,-107.276,Derry Warm Springs,Las Cruces,Hotspring,92,33
32.884,-108.358,Allen Springs,Silver City,Hotspring,78,26
33.279,-107.563,Warm Springs,Tularosa,Hotspring,87,31
32.606,-107.19,Souse Springs,Las Cruces,Hotspring,88,31
34.808,-107.091,Spring (Salt),Socorro,Hotspring,86,30
35.54,-106.854,San Ysidro Hot Springs,Albuquerque,Hotspring,85,29
36.368,-106.059,Statue Spring,Aztec,Hotspring,83,28
34.833,-107.091,Laguna Pueblo Seeps,Socorro,Hotspring,82,28
33.572,-107.593,Ojo Caliente,Tularosa,Hotspring,83,28
34.854,-107.088,Laguna Pueblo Springs,Socorro,Hotspring,80,27
32.843,-108.512,Mangas Springs,Silver City,Hotspring,81,27
34.769,-107.085,Spring (Salt),Socorro,Hotspring,78,26
34.032,-106.777,Ojo De Las Canas,Socorro,Hotspring,79,26
40.972,-119.007,Black Rock Hot Spring,Lovelock,Hotspring,136,58
38.899,-119.41,Nevada (Hinds) Hot Springs,Walker Lake,Hotspring,144,62
38.922,-118.198,Wedell Hot Springs,Walker Lake,Hotspring,144,62
41.183,-114.991,Hot Springs,Wells,Hotspring,142,61
38.437,-116.277,Hot Creek Valley Spring,Tonopah,Hotspring,142,61
41.788,-114.735,Mineral Hot Spring,Wells,Hotspring,140,60
37.825,-117.337,Alkali Hot Spring,Goldfield,Hotspring,140,60
41.412,-114.675,Wine Cup Ranch Springs,Wells,Hotspring,138,59
40.404,-116.517,Crescent Valley Hot Springs,Winnemucca,Hotspring,138,59
40.417,-116.507,Crescent Valley Hot Springs,Winnemucca,Hotspring,138,59
40.603,-116.463,Horseshoe Ranch Springs,Winnemucca,Hotspring,136,58
41.378,-119.182,Springs (Hot),Vya,Hotspring,136,58
39.883,-114.893,Cherry Creek Hot Springs,Ely,Hotspring,144,62
40.922,-117.108,Hot Pot (Blossom Hot Springs),Winnemucca,Hotspring,136,58
41.721,-118.505,Howard Hot Spring,Vya,Hotspring,135,57
41.421,-117.388,The Hot Springs,Mcdermitt,Hotspring,135,57
40.418,-117.415,Buffalo Springs,Winnemucca,Hotspring,162,72
39.031,-116.666,Dianas Punch Bowl,Millett,Hotspring,138,59
39.404,-116.347,Klobe (Bartholomae) Hot Spring,Millett,Hotspring,156,69
36.975,-116.721,Hicks Hot Springs,Death Valley,Hotspring,109,43
40.178,-117.496,Home Station Ranch Hot Spring,Winnemucca,Hotspring,135,57
39.797,-118.067,Dixie Hot Springs,Reno,Hotspring,162,72
39.904,-116.588,Walti Hot Springs,Millett,Hotspring,162,72
38.981,-119.833,Walleys Hot Springs,Walker Lake,Hotspring,160,71
38.464,-115.792,Chimney Warm Spring,Lund,Hotspring,160,71
39.328,-116.858,Spencer Hot Springs,Millett,Hotspring,162,72
41.108,-117.578,Hot Springs,Mcdermitt,Hotspring,158,70
36.002,-114.742,Spring,Las Vegas,Hotspring,145,63
41.576,-115.181,Hot Creek Springs,Wells,Hotspring,151,66
40.954,-117.488,Golconda Hot Spring (South),Winnemucca,Hotspring,151,66
40.22,-116.068,Bruffeys Hot Springs,Winnemucca,Hotspring,149,65
40.249,-115.409,Smith Ranch Springs,Elko,Hotspring,149,65
41.867,-114.692,San Jacinto Ranch Spring,Wells,Hotspring,148,64
40.765,-116.04,Hot Sulphur Springs,Winnemucca,Hotspring,147,64
38.188,-116.373,Warm Springs,Tonopah,Hotspring,145,63
41.567,-118.564,Dyke Hot Springs,Vya,Hotspring,158,70
38.365,-115.867,Abel Spring,Lund,Hotspring,115,46
41.929,-114.071,Nile Spring,Wells,Hotspring,109,43
39.193,-119.752,Carson Hot Springs,Reno,Hotspring,120,49
39.512,-119.907,Lawton Hot Springs,Reno,Hotspring,120,49
39.944,-119.509,Anaho Island Spring,Reno,Hotspring,120,49
37.761,-117.632,Silverpeak Hot Spring,Goldfield,Hotspring,118,48
37.621,-114.51,Caliente Hot Springs,Caliente,Hotspring,118,48
39.058,-119.742,Saratoga Hot Spring,Reno,Hotspring,122,50
39.308,-117.552,Hot Springs,Millett,Hotspring,115,46
40.673,-116.838,Hot Springs,Winnemucca,Hotspring,122,50
39.08,-116.639,Potts Ranch Hot Springs,Millett,Hotspring,113,45
38.388,-115.866,Coyote Hole Spring,Lund,Hotspring,113,45
41.753,-118.841,Warm Springs,Vya,Hotspring,112,44
41.386,-114.165,Spring (Hot),Wells,Hotspring,111,44
40.961,-117.494,Golconda Hot Spring (North),Winnemucca,Hotspring,165,74
40.313,-117.07,Mound Springs,Winnemucca,Hotspring,109,43
40.585,-115.285,Sulphur Hot Springs,Elko,Hotspring,205,96
39.059,-119.815,Hobo Hot Springs,Reno,Hotspring,114,46
40.191,-117.107,Hot Springs,Winnemucca,Hotspring,127,53
40.819,-115.777,Hot Hole,Elko,Hotspring,133,56
39.286,-119.84,Bowers Mansion Hot Spring,Reno,Hotspring,133,56
41.809,-118.861,Painted Hills Mine,Vya,Hotspring,131,55
41.925,-118.805,Bog Hot Springs,Vya,Hotspring,131,55
41.647,-115.775,Wild Horse Hot Springs,Wells,Hotspring,129,54
40.183,-117.102,Hot Springs Ranch,Winnemucca,Hotspring,129,54
40.08,-117.604,Mccoy Springs,Winnemucca,Hotspring,120,49
41.353,-119.216,Spring (Hot),Vya,Hotspring,127,53
41.357,-119.188,Springs (Hot),Vya,Hotspring,133,56
40.198,-117.103,Hot Springs,Winnemucca,Hotspring,127,53
39.42,-119.738,Dimonte Spring,Reno,Hotspring,127,53
38.952,-115.23,Williams Hot Spring,Lund,Hotspring,127,53
41.261,-115.305,Hot Springs,Wells,Hotspring,126,52
39.041,-116.663,Hot Spring,Millett,Hotspring,124,51
41.365,-119.221,Spring (Hot),Vya,Hotspring,122,50
41.159,-114.986,"Threemile Spring, Sulphur Hot Spr",Wells,Hotspring,122,50
41.339,-119.192,Springs (Hot),Vya,Hotspring,127,53
39.893,-116.649,Little Hot Springs,Millett,Hotspring,H,H
39.787,-119.011,Bradys Hot Springs,Reno,Hotspring,209,98
41.175,-115.278,Hot Spring,Wells,Hotspring,H,H
41.145,-114.994,Hot Spring,Wells,Hotspring,H,H
40.864,-117.349,Sulphur Spring,Winnemucca,Hotspring,H,H
39.733,-119.039,Eagle Salt Works Spring,Reno,Hotspring,H,H
39.281,-118.42,Sand Springs,Reno,Hotspring,H,H
38.81,-116.397,Fish Springs,Tonopah,Hotspring,W,W
39.559,-117.427,Petersons Mill Hot Spring,Millett,Hotspring,H,H
38.339,-116.662,Warm Spring,Tonopah,Hotspring,W,W
38.859,-119.175,Hot Spring,Walker Lake,Hotspring,H,H
39.995,-117.854,Senator Fumaroles,Millett,Hotspring,B,B
39.565,-118.856,(Soda Lake Area),Reno,Hotspring,210,99
40.141,-119.687,The Needle Rocks Hot Springs,Lovelock,Hotspring,208,98
40.146,-119.673,The Needle Rocks Hot Spring,Lovelock,Hotspring,208,98
40.662,-119.365,Great Boiling Spring (Gerlach),Lovelock,Hotspring,208,98
39.388,-119.743,Steamboat Springs,Reno,Hotspring,205,96
39.866,-118.017,Dixie Comstock Mine,Reno,Hotspring,H,H
40.746,-116.689,White House Spring,Winnemucca,Hotspring,W,W
39.98,-119.502,Pyramid Island Hot Spring,Reno,Hotspring,.,.
41.934,-118.808,Warm Springs,Vya,Hotspring,W,W
41.385,-116.058,Petaini Springs,Mcdermitt,Hotspring,W,W
41.064,-115.389,Warm Springs,Wells,Hotspring,W,W
41.066,-114.99,Spring,Wells,Hotspring,W,W
41.355,-114.133,Warm Springs,Wells,Hotspring,W,W
41.148,-116.733,Hot Lake,Mcdermitt,Hotspring,H,H
40.684,-116.153,Ellison Ranch Warm Spring,Winnemucca,Hotspring,W,W
40.604,-117.648,Leach Hot Springs,Winnemucca,Hotspring,207,97
40.751,-115.035,Warm Springs,Elko,Hotspring,W,W
40.782,-115.363,Warm Spring,Elko,Hotspring,W,W
39.529,-116.388,Warm Spring,Millett,Hotspring,W,W
39.072,-115.635,Big Blue Spring,Ely,Hotspring,W,W
38.95,-119.388,Spring,Walker Lake,Hotspring,W,W
38.965,-118.689,Double Spring,Walker Lake,Hotspring,W,W
38.458,-117.303,Indian Springs,Tonopah,Hotspring,W,W
40.592,-116.157,Raine Ranch Springs,Winnemucca,Hotspring,W,W
39.941,-116.681,Hot Springs,Millett,Hotspring,180,82
40.567,-116.588,Beowawe Hot Springs (The Geysers),Winnemucca,Hotspring,208,98
40.761,-117.492,Hot Springs,Winnemucca,Hotspring,185,85
40.653,-119.378,Mud Springs,Lovelock,Hotspring,184,84
38.768,-119.174,Wilson Hot Spring,Walker Lake,Hotspring,183,84
41.921,-118.709,Baltazor Hot Spring,Vya,Hotspring,181,83
40.857,-119.328,Fly Ranch (Wards) Hot Springs,Lovelock,Hotspring,180,82
39.597,-119.11,Patua Hot Springs (Fernley),Reno,Hotspring,187,86
39.028,-117.136,Mcleod Ranch Hot Spring,Millett,Hotspring,180,82
40.316,-116.433,Hot Spring,Winnemucca,Hotspring,186,86
38.521,-116.365,Hot Creek Ranch Hot Spring,Tonopah,Hotspring,180,82
41.051,-119.028,Double Hot Springs,Vya,Hotspring,178,81
40.003,-117.718,Hyder Hot Springs,Winnemucca,Hotspring,176,80
39.665,-114.807,Monte Neva Hot Springs,Ely,Hotspring,176,80
40.368,-117.327,Buffalo Valley Hot Springs,Winnemucca,Hotspring,174,79
40.699,-116.133,Hot Springs (Carlin),Winnemucca,Hotspring,174,79
41.052,-118.717,Macfarlane Hot Spring,Vya,Hotspring,170,77
39.342,-118.578,Borax Spring,Reno,Hotspring,180,82
39.484,-119.804,Moana Springs,Reno,Hotspring,199,93
41.243,-114.947,Twelvemile Spring,Wells,Hotspring,102,39
39.38,-119.74,Steamboat Springs,Reno,Hotspring,205,96
39.558,-116.36,Bartine Hot Springs,Millett,Hotspring,108,42
39.954,-117.917,Fumaroles,Millett,Hotspring,204,96
40.389,-119.402,Hot Seeps (San Emidio Desert),Lovelock,Hotspring,203,95
38.822,-117.183,Darroughs Hot Springs,Tonopah,Hotspring,203,95
40.088,-117.725,Sou (Seven Devils) Hot Springs,Winnemucca,Hotspring,185,85
41.363,-118.788,Pinto Hot Springs,Vya,Hotspring,199,93
40.408,-117.883,Kyle Hot Springs,Winnemucca,Hotspring,171,77
41.357,-118.809,West Pinto Hot Spring,Vya,Hotspring,198,92
39.316,-117.549,Hot Springs,Millett,Hotspring,198,92
41.468,-116.15,Hot Sulphur Springs (Tuscarora),Mcdermitt,Hotspring,194,90
40.813,-115.778,Elko Hot Spring,Elko,Hotspring,190,88
39.208,-118.723,"Lee Hot Springs, Allen Springs",Reno,Hotspring,190,88
40.262,-119.379,Boiling Springs,Lovelock,Hotspring,187,86
40.77,-119.113,Butte Springs (Trego Hot Springs),Lovelock,Hotspring,187,86
39.161,-119.183,Wabuska Hot Springs,Reno,Hotspring,201,94
39.814,-115.612,Giocoecha Warm Springs,Ely,Hotspring,76,24
36.389,-114.433,Blue Point Spring,Las Vegas,Hotspring,82,28
37.016,-117.211,Seep,Goldfield,Hotspring,77,25
37.751,-116.274,Cedar Spring,Goldfield,Hotspring,77,25
37.896,-114.227,Flatnose Ranch Spring,Caliente,Hotspring,77,25
36.207,-115.983,Pahrump (Bennetts) Spring,Las Vegas,Hotspring,77,25
41.775,-115.921,Rizzi Ranch Hot Spring,Wells,Hotspring,106,41
35.944,-114.731,Hot Spring,Kingman,Hotspring,78,26
41.884,-114.117,Gambles Hole,Wells,Hotspring,104,40
36.565,-115.671,Indian Springs,Las Vegas,Hotspring,78,26
39.547,-114.915,Campbell Ranch Springs,Ely,Hotspring,76,24
38.423,-115.022,Flag Springs,Lund,Hotspring,75,24
38.44,-115.011,Butterfield Springs,Lund,Hotspring,75,24
37.997,-118.039,Fish Spring,Mariposa,Hotspring,75,24
37.029,-116.719,Springs,Goldfield,Hotspring,75,24
36.426,-116.411,Ash Tree Spring,Death Valley,Hotspring,75,24
36.033,-115.888,Browns Spring,Las Vegas,Hotspring,75,24
41.322,-119.206,Springs,Vya,Hotspring,75,24
41.706,-118.261,Ninemile Springs,Vya,Hotspring,79,26
35.964,-114.743,Hot Spring,Kingman,Hotspring,82,28
41.763,-118.279,Fivemile Spring,Vya,Hotspring,81,27
39.457,-119.722,Huffaker Springs,Reno,Hotspring,81,27
38.992,-117.042,Charnock (Big Blue) Springs,Tonopah,Hotspring,80,27
36.402,-116.302,Davis Ranch Springs,Death Valley,Hotspring,81,27
36.45,-116.313,Spring,Death Valley,Hotspring,81,27
39.792,-114.692,Lower Shellbourne Spring,Ely,Hotspring,77,25
41.338,-119.168,Springs,Vya,Hotspring,79,26
41.022,-119.275,Caine Spring,Vya,Hotspring,73,23
41.05,-117.1,Hot Springs Ranch Springs,Mcdermitt,Hotspring,79,26
40.079,-116.035,Flynn Ranch Springs,Winnemucca,Hotspring,78,26
40.325,-116.058,Hot Springs,Winnemucca,Hotspring,79,26
36.414,-116.292,Spring,Death Valley,Hotspring,79,26
36.173,-115.191,Las Vegas Springs,Las Vegas,Hotspring,79,26
36.174,-115.479,White Rock Spring,Las Vegas,Hotspring,78,26
36.565,-115.623,Spring,Las Vegas,Hotspring,79,26
36.491,-116.342,"Fairbanks Spring, Soda Spring",Death Valley,Hotspring,81,27
38.654,-114.633,Geyser Ranch Springs,Lund,Hotspring,70,21
36.363,-116.271,Bole Spring,Death Valley,Hotspring,72,22
36.999,-116.706,Spring,Death Valley,Hotspring,72,22
36.942,-115.425,Ash Creek Spring,Las Vegas,Hotspring,72,22
38.796,-119.65,Doud Springs,Walker Lake,Hotspring,70,21
38.622,-115.047,Emigrant Springs,Lund,Hotspring,70,21
38.927,-115.082,Preston Springs,Lund,Hotspring,70,21
36.147,-115.893,Manse Ranch Spring,Las Vegas,Hotspring,75,24
38.645,-114.632,Geyser Ranch Springs,Lund,Hotspring,70,21
38.574,-115.522,Tom Spring,Lund,Hotspring,72,22
38.671,-114.628,Geyser Ranch Springs,Lund,Hotspring,70,21
37.783,-114.528,Bennett Springs,Caliente,Hotspring,70,21
37.86,-114.321,Delmues Springs,Caliente,Hotspring,70,21
36.408,-116.313,Davis Ranch Spring,Death Valley,Hotspring,70,21
36.567,-114.446,Seep,Las Vegas,Hotspring,70,21
41.369,-114.187,Gamble Spring,Wells,Hotspring,69,20
39.901,-115.868,Thompson Ranch Spring,Ely,Hotspring,68,20
38.633,-114.638,Wambolt Springs,Lund,Hotspring,70,21
37.906,-118.171,Sand Spring,Mariposa,Hotspring,74,23
36.486,-114.329,Springs,Las Vegas,Hotspring,77,25
41.354,-119.116,Mustang Springs,Vya,Hotspring,73,23
41.746,-119.791,Warm Springs,Vya,Hotspring,73,23
41.258,-118.937,Cane Springs,Vya,Hotspring,74,23
40.103,-119.884,Fish Springs,Lovelock,Hotspring,73,23
39.853,-119.719,Spring,Reno,Hotspring,73,23
39.832,-116.069,Sulphur Spring,Millett,Hotspring,74,23
36.363,-116.263,Spring,Death Valley,Hotspring,72,22
38.554,-115.531,Kate Spring,Lund,Hotspring,73,23
37.074,-116.691,Spring,Goldfield,Hotspring,72,22
37.979,-117.993,Gap Spring,Goldfield,Hotspring,73,23
41.591,-119.862,Twin (Vya) Spring,Vya,Hotspring,71,22
40.763,-119.172,Coyote Spring,Lovelock,Hotspring,72,22
40.127,-116.884,Springs,Winnemucca,Hotspring,72,22
40.187,-116.805,Spring,Winnemucca,Hotspring,72,22
40.967,-114.515,Johnson Ranch Springs,Elko,Hotspring,72,22
36.205,-115.141,Kyle Spring,Las Vegas,Hotspring,75,24
39.8,-114.653,Upper Shellbourne Spring,Ely,Hotspring,74,23
36.428,-116.303,Button Springs,Death Valley,Hotspring,93,34
38.383,-115.153,Hot Creek Ranch Spring,Lund,Hotspring,90,32
39.283,-114.866,Lackawanna Hot Springs,Ely,Hotspring,95,35
38.532,-116.465,Upper Warm Spring,Tonopah,Hotspring,95,35
38.823,-116.717,South Mosquito Creek Ranch Springs,Tonopah,Hotspring,95,35
40.829,-117.306,Brooks Spring,Winnemucca,Hotspring,93,34
40.992,-117.763,Spring,Winnemucca,Hotspring,93,34
41.971,-114.574,Warm Springs,Wells,Hotspring,95,35
38.95,-115.7,Big Warm Spring,Lund,Hotspring,93,34
37.463,-115.192,Ash Springs,Caliente,Hotspring,97,36
36.464,-116.319,Parent Springs,Death Valley,Hotspring,93,34
38.352,-115.181,Moon River Spring,Lund,Hotspring,92,33
36.402,-116.274,"Point of Rocks Springs, King Sprin",Death Valley,Hotspring,91,33
36.421,-116.322,Crystal Pool,Death Valley,Hotspring,91,33
36.425,-116.291,Devils Hole,Death Valley,Hotspring,92,33
39.068,-119.786,Springs,Reno,Hotspring,90,32
38.954,-117.049,Big Blue (A) Spring,Tonopah,Hotspring,90,32
40.087,-114.647,Collar And Elbow Spring,Elko,Hotspring,93,34
36.378,-114.443,Rogers Spring,Las Vegas,Hotspring,82,28
39.943,-116.073,Shipley Hot Spring,Millett,Hotspring,106,41
38.698,-116.435,"Upper Warm Spring, Warm Spring",Tonopah,Hotspring,106,41
41.53,-118.57,Spring,Vya,Hotspring,104,40
41.877,-115.628,Rowland Hot Springs,Wells,Hotspring,104,40
40.035,-117.604,Lower Ranch Hot Springs,Winnemucca,Hotspring,104,40
40.187,-116.79,Chillis Hot Spring,Winnemucca,Hotspring,102,39
39.988,-116.044,Siri Ranch Spring,Millett,Hotspring,95,35
39.421,-119.758,Zolezzi Spring,Reno,Hotspring,102,39
38.531,-116.405,Old Dugan Ranch Hot Springs,Tonopah,Hotspring,102,39
36.968,-116.723,Burrell Hot Spring,Death Valley,Hotspring,102,39
38.343,-118.103,Soda Springs,Walker Lake,Hotspring,100,38
38.556,-115.767,"Lockes Big Spring, Hay Corral Spr",Lund,Hotspring,100,38
38.594,-115.138,Moorman Spring,Lund,Hotspring,100,38
38.398,-115.862,Storm Spring,Lund,Hotspring,99,37
41.19,-115.287,Hot Spring,Wells,Hotspring,97,36
37.822,-117.48,Pearl Hot Springs,Goldfield,Hotspring,97,36
39.159,-119.737,Nevada State Prison Spring,Reno,Hotspring,75,24
40.025,-117.646,Spring,Winnemucca,Hotspring,83,28
40.83,-119.538,Springs,Lovelock,Hotspring,84,29
39.442,-119.743,Double Diamond Spring,Reno,Hotspring,84,29
39.413,-114.779,Mcgill Spring,Ely,Hotspring,84,29
39.458,-114.756,Schoolhouse Spring,Ely,Hotspring,84,29
36.375,-116.274,Big (Ash Meadows) Spring,Death Valley,Hotspring,83,28
38.292,-114.272,Hammond Ranch Spring,Lund,Hotspring,84,29
41.398,-119.165,Spring,Vya,Hotspring,84,29
41.732,-119.785,Seeps (Hills Warm Spring),Vya,Hotspring,83,28
38.563,-115.528,Blue Eagle Springs,Lund,Hotspring,84,29
40.873,-117.937,Rose Creek Spring,Winnemucca,Hotspring,83,28
39.917,-114.667,Spring,Ely,Hotspring,83,28
36.39,-116.278,Jack Rabbit Spring,Death Valley,Hotspring,82,28
36.437,-116.206,Spring,Death Valley,Hotspring,82,28
38.937,-115.695,Little Warm Spring,Lund,Hotspring,90,32
36.479,-116.326,Rogers Spring,Death Valley,Hotspring,82,28
40.29,-116.049,Carlotti Ranch Springs,Winnemucca,Hotspring,102,39
36.468,-116.325,Longstreet Spring,Death Valley,Hotspring,82,28
36.722,-114.716,Muddy Spring,Las Vegas,Hotspring,90,32
37.532,-115.233,Crystal Springs,Caliente,Hotspring,90,32
37.598,-115.215,Hiko Spring,Caliente,Hotspring,90,32
36.404,-116.383,Spring,Death Valley,Hotspring,90,32
37.996,-116.389,Reveille Mill Spring,Goldfield,Hotspring,84,29
36.71,-114.714,Moapa Warm Springs,Las Vegas,Hotspring,90,32
35.982,-114.748,Hot Springs,Kingman,Hotspring,86,30
40.929,-116.895,Izzenhood Ranch Springs,Winnemucca,Hotspring,88,31
37.807,-114.38,Panaca Spring,Caliente,Hotspring,88,31
36.942,-116.729,Spring,Death Valley,Hotspring,88,31
41.98,-114.376,Hot Spring,Wells,Hotspring,86,30
36.433,-116.308,Scruggs Springs,Death Valley,Hotspring,86,30
40.952,-114.751,Ralphs Warm Springs,Elko,Hotspring,86,30
39.526,-118.876,Soda Lake,Reno,Hotspring,86,30
38.027,-116.683,Spring,Tonopah,Hotspring,86,30
37.741,-115.753,Sand Spring,Caliente,Hotspring,86,30
36.918,-116.744,Beatty Municipal Spring,Death Valley,Hotspring,88,31
38.255,-116.829,Saulsbury Warm Spring,Tonopah,Hotspring,86,30
42.48,-73.37,Lebanon Spring,Albany,Hotspring,72,22
44.241,-122.058,Bigelow Hot Springs,Salem,Hotspring,142,61
44.862,-121.201,Kahneeta Hot Springs,Bend,Hotspring,126,52
44.927,-117.939,Radium Hot Springs,Baker,Hotspring,135,57
44.354,-118.574,Blue Mountain Hot Springs,Canyon City,Hotspring,136,58
44.936,-122.173,Bagby Hot Springs,Salem,Hotspring,136,58
43.944,-118.136,Beulah Hot Springs,Burns,Hotspring,140,60
43.763,-117.156,Mitchell Butte Hot Spring,Boise,Hotspring,144,62
42.116,-121.287,Oregon Hot Springs (Big Hot Spring,Klamath Falls,Hotspring,142,61
45.151,-118.659,Lehman Springs,Pendleton,Hotspring,142,61
43.719,-121.209,East Lake Hot Springs,Crescent,Hotspring,144,62
43.469,-118.202,Luce Hot Springs,Burns,Hotspring,145,63
45.018,-117.625,Medical Hot Springs,Grangeville,Hotspring,140,60
44.867,-121.228,Springs,Bend,Hotspring,125,52
42.188,-118.383,Flagstaff Butte Hot Spring,Adel,Hotspring,126,52
44.451,-119.105,Mount Vernon Hot Springs,Canyon City,Hotspring,121,49
42.977,-117.061,Canters Hot Spring,Jordan Valley,Hotspring,120,49
43.294,-122.367,Umpqua Hot Springs,Roseburg,Hotspring,117,47
44.002,-119.647,Weberg Hot Spring,Canyon City,Hotspring,115,46
43.739,-117.178,Deer Butte Hot Spring,Boise,Hotspring,115,46
43.795,-117.958,Jonesboro Warm Spring,Boise,Hotspring,112,45
42.075,-119.927,Hallinan Spring,Adel,Hotspring,113,45
42.297,-119.776,Fisher Hot Springs,Adel,Hotspring,154,68
45.013,-117.885,Kropp Hot Spring,Grangeville,Hotspring,109,43
42.221,-120.368,Hunters Hot Springs,Klamath Falls,Hotspring,205,96
44.083,-122.233,Cougar Reservoir Hot Springs,Salem,Hotspring,111,44
44.023,-117.46,Neal Hot Springs,Baker,Hotspring,189,87
42.431,-121.963,Eagle Point Spring,Klamath Falls,Hotspring,95,35
43.689,-122.372,Kitson Hot Springs,Roseburg,Hotspring,109,43
44.813,-117.765,Spring (Hot),Baker,Hotspring,W,W
43.776,-118.047,Warm Spring,Burns,Hotspring,W,W
43.793,-118.472,Sitz Warm Spring,Burns,Hotspring,W,W
43.86,-118.288,Altnow Hot Spring,Burns,Hotspring,W,W
43.893,-117.596,Springs,Boise,Hotspring,W,W
45.206,-117.912,Union Station Hot Springs,Grangeville,Hotspring,H,H
44.208,-117.455,Jamieson Hot Springs,Baker,Hotspring,H,H
42.338,-118.602,Hot Springs,Adel,Hotspring,207,97
44.782,-121.975,Breitenbush Hot Springs,Bend,Hotspring,198,92
42.219,-119.877,Warner Valley Ranch,Adel,Hotspring,198,92
42.156,-120.345,Barry Ranch Hot Springs,Klamath Falls,Hotspring,190,88
44.193,-122.049,Belknap Springs,Salem,Hotspring,160,71
45.021,-122.009,Austin Hot Springs,Vancouver,Hotspring,186,86
42.676,-118.344,Mickey Springs,Adel,Hotspring,187,86
44.153,-122.098,Foley Springs,Salem,Hotspring,178,81
45.244,-117.958,Hot Lake Springs,Grangeville,Hotspring,176,80
42.544,-118.533,Alvord Hot Springs,Adel,Hotspring,174,79
43.441,-118.638,Crane Hot Springs,Burns,Hotspring,172,78
42.226,-119.881,Crump Geyser (Crump Spring),Adel,Hotspring,172,78
43.727,-117.203,Snively Hot Spring,Boise,Hotspring,170,77
42.174,-121.615,Olene Gap Hot Springs,Klamath Falls,Hotspring,165,74
43.708,-122.288,Mccredie Springs,Roseburg,Hotspring,163,73
43.982,-117.233,Vale Hot Springs,Boise,Hotspring,163,73
42.162,-120.344,Leithead Hot Spring,Klamath Falls,Hotspring,162,72
45.372,-121.697,Mount Hood Fumaroles,The Dalles,Hotspring,194,90
43.264,-119.015,Dunn Spring,Burns,Hotspring,70,21
42.873,-122.167,Annie Spring,Medford,Hotspring,77,25
42.133,-121.219,Wilkersons Hot Spring,Klamath Falls,Hotspring,76,24
43.272,-119.293,Basque Spring,Burns,Hotspring,74,23
43.276,-119.34,Double O Spring,Burns,Hotspring,74,23
44.073,-119.427,Brisbois Ranch Springs,Canyon City,Hotspring,72,22
43.265,-119.276,Johnson Spring,Burns,Hotspring,72,22
43.281,-119.311,Double O Barnyard Spring,Burns,Hotspring,72,22
43.501,-119.091,Roadland Spring,Burns,Hotspring,72,22
43.529,-119.081,Goodman Spring,Burns,Hotspring,72,22
43.703,-117.19,South Black Willow Spring,Boise,Hotspring,71,22
42.307,-119.875,Moss Ranch Spring,Adel,Hotspring,72,22
43.758,-118.067,Juntura Warm Spring 1,Burns,Hotspring,77,25
43.732,-121.252,Paulina Springs,Crescent,Hotspring,70,21
42.176,-121.828,Howard Holiday,Klamath Falls,Hotspring,77,25
43.477,-119.075,Baker Spring,Burns,Hotspring,70,21
42.178,-121.801,Hardboard Spring,Klamath Falls,Hotspring,70,21
42.325,-120.327,White Rock Ranch Hot Spring,Klamath Falls,Hotspring,71,21
43.252,-119.258,Hughet Spring,Burns,Hotspring,68,20
42.38,-120.33,Bean Hot Spring,Klamath Falls,Hotspring,69,20
42.933,-120.642,Lost Cabin Spring,Klamath Falls,Hotspring,68,20
42.998,-120.725,Buckhorn Creek Springs,Klamath Falls,Hotspring,68,20
42.688,-117.905,Tudors Spring,Jordan Valley,Hotspring,68,20
42.756,-117.55,Scott Spring,Jordan Valley,Hotspring,68,20
42.725,-120.646,Summer Lake Hot Spring,Klamath Falls,Hotspring,109,43
43.757,-118.092,Juntura Warm Spring 2,Burns,Hotspring,95,35
44.374,-118.738,Limekiln Hot Spring,Canyon City,Hotspring,70,21
42.221,-122.742,Jackson Hot Springs,Medford,Hotspring,95,35
44.892,-119.141,Ritter Hot Springs,Canyon City,Hotspring,106,41
43.808,-122.309,Wall Creek Warm Springs,Roseburg,Hotspring,106,41
43.395,-118.308,Springs (Hot),Burns,Hotspring,106,41
43.302,-117.383,Hot Spring,Boise,Hotspring,106,41
44.28,-118.956,Joaquin Miller Hot Springs,Canyon City,Hotspring,104,40
42.501,-119.693,Antelope Hot Springs,Adel,Hotspring,104,40
45.129,-118.738,Hidaway Springs,Pendleton,Hotspring,100,38
44.975,-118.044,Fisher Hot Springs,Canyon City,Hotspring,99,37
44.033,-117.449,Bully Creek Spring,Baker,Hotspring,99,37
42.93,-120.798,Pardon Warm Spring,Klamath Falls,Hotspring,76,24
42.327,-118.602,Borax Lake (Hot Lake),Adel,Hotspring,97,36
42.161,-121.627,Crystal Spring,Klamath Falls,Hotspring,78,26
45.741,-118.233,Bingham Springs,Pendleton,Hotspring,93,34
42.889,-118.898,Fivemile Spring (Hoghouse Hot Sprs,Adel,Hotspring,80,27
43.54,-119.081,Millpond Hot Spring,Burns,Hotspring,79,26
45.891,-116.873,Cook Creek Hot Spring,Grangeville,Hotspring,97,36
45.295,-121.731,Swim Warm Springs,The Dalles,Hotspring,79,26
42.04,-120.924,Warm Spring,Klamath Falls,Hotspring,92,33
44.779,-117.811,Sam O Spring,Baker,Hotspring,80,27
44.538,-117.417,Nelson Spring,Baker,Hotspring,80,27
45.631,-119.703,Well Spring,Pendleton,Hotspring,80,27
42.287,-119.867,Moss Ranch Springs,Adel,Hotspring,83,28
45.061,-118.455,Warm Mineral Spring,Pendleton,Hotspring,83,28
43.95,-119.634,Warm Springs,Burns,Hotspring,84,29
45.295,-117.806,Warm Spring,Grangeville,Hotspring,85,29
42.815,-118.899,Warm Springs,Adel,Hotspring,89,32
43.452,-103.508,Hot Brook Springs,Hot Springs,Hotspring,75,24
43.442,-103.481,Hot Springs,Hot Springs,Hotspring,87,31
29.178,-102.953,Rio Grande Village Spring,Emory Peak,Hotspring,97,36
30.823,-105.315,Indian Hot Springs,Marfa,Hotspring,117,47
30.038,-104.598,Ruidosa Hot Springs,Marfa,Hotspring,113,45
29.182,-102.992,Hot Springs,Emory Peak,Hotspring,106,41
30.21,-104.562,Capote Springs,Marfa,Hotspring,99,37
30.133,-104.602,Nixon Spring,Marfa,Hotspring,90,32
29.787,-104.462,Springs (Las Cienegas),Presidio,Hotspring,86,30
30.861,-105.34,Red Bull Spring,Marfa,Hotspring,99,37
38.85,-112.49,Hatton Hot Spring,Richfield,Hotspring,100,38
40.176,-111.801,Bird Island,Salt Lake City,Hotspring,86,30
41.917,-111.958,Gancheff Spring,Ogden,Hotspring,88,31
37.942,-112.438,Lefevre,Cedar City,Hotspring,90,32
37.335,-113.687,Veyo Hot Spring,Cedar City,Hotspring,90,32
40.332,-111.891,Fault Zone Spring,Salt Lake City,Hotspring,90,32
40.146,-111.806,Lincoln Point Warm Springs,Salt Lake City,Hotspring,90,32
38.186,-112.912,Us Blm,Richfield,Hotspring,91,33
41.833,-112.454,Blue Creek Spring,Brigham City,Hotspring,82,28
40.526,-111.488,Midway Hot Springs,Salt Lake City,Hotspring,100,38
40.525,-111.468,Midway Hot Springs,Salt Lake City,Hotspring,104,40
40.038,-111.529,Castilla Springs,Salt Lake City,Hotspring,104,40
38.217,-112.904,Dotsons (Radium) Warm Spring,Richfield,Hotspring,91,33
40.465,-109.221,Split Mountain Warm Springs,Vernal,Hotspring,86,30
40.788,-112.017,Hobo Warm Spring,Tooele,Hotspring,84,29
40.788,-111.899,Wasatch Hot Springs,Salt Lake City,Hotspring,108,42
39.35,-113.515,Tule Spring,Delta,Hotspring,82,28
39.424,-113.485,Coyote Spring,Delta,Hotspring,82,28
39.842,-113.392,Fish Springs,Delta,Hotspring,82,28
39.887,-113.413,North Springs,Delta,Hotspring,82,28
41.756,-113.603,Warm Spring,Brigham City,Hotspring,81,27
41.038,-111.656,Como Springs,Ogden,Hotspring,81,27
40.397,-112.421,Morgans Warm Spring,Tooele,Hotspring,80,27
39.464,-114.038,Gandy Warm Springs,Ely,Hotspring,81,27
40.447,-110.828,Warm Springs,Salt Lake City,Hotspring,79,26
37.7,-110.421,Warm Spring,Escalante,Hotspring,79,26
40.502,-114.038,Blue Lake Spring,Elko,Hotspring,84,29
38.503,-112.849,Roosevelt Hot Springs,Richfield,Hotspring,133,56
38.774,-112.096,Richfield Warm Springs,Richfield,Hotspring,73,23
40.488,-111.911,Crystal Hot Springs,Salt Lake City,Hotspring,187,86
38.186,-113.197,Thermo Hot Springs,Richfield,Hotspring,185,85
38.172,-113.204,Thermo Hot Springs,Richfield,Hotspring,181,83
39.613,-112.729,"Baker (Abraham, Crater) Hot Spring",Delta,Hotspring,180,82
38.639,-112.098,Red Hill Hot Spring,Richfield,Hotspring,171,77
38.633,-112.107,Monroe (Cooper) Hot Springs,Richfield,Hotspring,169,76
38.613,-112.202,Joseph Hot Springs,Richfield,Hotspring,147,64
39.906,-113.43,Wilson Health Springs,Delta,Hotspring,142,61
41.138,-112.175,Hooper Hot Springs,Brigham City,Hotspring,140,60
41.338,-112.031,Utah Hot Springs,Brigham City,Hotspring,138,59
38.864,-112.506,Meadow Hot Springs,Richfield,Hotspring,106,41
40.815,-111.918,Becks Hot Spring,Salt Lake City,Hotspring,133,56
37.189,-113.272,Dixie (Laverkin) Hot Springs,Cedar City,Hotspring,108,42
41.659,-112.087,Crystal (Madsens) Hot Springs,Brigham City,Hotspring,129,54
41.855,-112.158,Udy Hot Springs,Brigham City,Hotspring,124,51
41.578,-112.23,Stinking Hot Springs,Brigham City,Hotspring,118,48
40.517,-111.475,Midway Hot Spring,Salt Lake City,Hotspring,115,46
40.536,-111.478,Warm Ditch Spring,Salt Lake City,Hotspring,115,46
40.35,-111.905,Saratoga Hot Springs,Salt Lake City,Hotspring,111,44
40.353,-111.895,Crater Hot Spring,Salt Lake City,Hotspring,111,44
41.901,-112.999,Coyote Spring,Brigham City,Hotspring,109,43
41.687,-113.986,Spring (Hot),Brigham City,Hotspring,108,42
41.582,-112.256,Little Mountain Hot Spring,Brigham City,Hotspring,108,42
41.822,-113.263,L.G. Carter Springs,Brigham City,Hotspring,77,25
41.236,-111.924,Ogden Hot Spring,Ogden,Hotspring,135,57
37.178,-113.634,Snow Spring,Cedar City,Hotspring,70,21
38.34,-113.22,Woodhouse Spring,Richfield,Hotspring,72,22
38.155,-112.901,Willow Spring,Richfield,Hotspring,72,22
38.56,-112.578,Sulphurdale,Richfield,Hotspring,72,22
38.981,-111.829,Salt Spring,Salina,Hotspring,72,22
37.174,-112.535,Red Canyon,Cedar City,Hotspring,72,22
41.808,-113.327,W.R. Carter Springs,Brigham City,Hotspring,70,21
41.818,-113.311,Larson Springs,Brigham City,Hotspring,70,21
41.829,-113.654,Head Spring,Brigham City,Hotspring,70,21
40.653,-112.907,Redlum Spring,Tooele,Hotspring,70,21
40.458,-111.929,Camp Williams,Salt Lake City,Hotspring,70,21
40.647,-112.524,Grantsville Warm Springs,Tooele,Hotspring,77,25
39.183,-111.691,Sterling (Peacock) Warm Spring,Price,Hotspring,72,22
39.246,-111.645,Livingston Warm Springs,Price,Hotspring,73,23
38.138,-112.863,Big Maple Spring,Richfield,Hotspring,70,21
37.393,-113.61,Irvine Spring,Cedar City,Hotspring,70,21
41.563,-113.954,Kimber (Rose) Spring,Brigham City,Hotspring,68,20
41.614,-113.613,Warm Spring,Brigham City,Hotspring,68,20
41.328,-111.826,Patio Springs,Ogden,Hotspring,68,20
40.172,-112.426,Davis,Tooele,Hotspring,68,20
40.118,-111.337,Diamond Fork Warm Springs,Salt Lake City,Hotspring,68,20
39.249,-113.877,Knoll Springs,Delta,Hotspring,68,20
39.403,-113.863,Twin Springs,Delta,Hotspring,68,20
39.788,-111.881,Ray Lunt Spring,Price,Hotspring,68,20
38.762,-112.87,Springs,Richfield,Hotspring,68,20
38.77,-112.871,Coyote Spring,Richfield,Hotspring,68,20
37.937,-112.424,Tebbs,Cedar City,Hotspring,68,20
37.096,-113.447,Warner Valley Spring,Cedar City,Hotspring,70,21
40.565,-112.738,Deseret Livestock South Springs,Tooele,Hotspring,73,23
37.158,-113.399,Virgin River Spring,Cedar City,Hotspring,70,21
39.899,-112.045,Springs,Delta,Hotspring,72,22
38.603,-112.111,Johnson Warm Spring,Richfield,Hotspring,77,25
41.722,-112.266,Bothwell Warm Springs,Brigham City,Hotspring,75,24
40.538,-112.747,Deseret Livestock,Tooele,Hotspring,75,24
40.733,-112.621,Utah Fish And Game Dept,Tooele,Hotspring,75,24
40.228,-111.867,Warm Springs,Salt Lake City,Hotspring,75,24
37.137,-113.513,Warm Spring,Cedar City,Hotspring,75,24
37.138,-113.528,Green Spring,Cedar City,Hotspring,75,24
37.166,-113.383,Berry Springs,Cedar City,Hotspring,75,24
41.834,-112.054,Cutler Warm Spring,Brigham City,Hotspring,73,23
40.614,-112.709,Horseshoe Springs,Tooele,Hotspring,73,23
41.239,-112.413,Compton Spring,Brigham City,Hotspring,72,22
40.743,-112.642,Big Warm Springs,Tooele,Hotspring,72,22
40.558,-112.739,Deseret Livestock South Spring,Tooele,Hotspring,72,22
40.39,-112.424,Russells Warm Springs,Tooele,Hotspring,72,22
41.831,-113.391,Pugsley,Brigham City,Hotspring,73,23
41.449,-112.442,Poulsen Spring (Salt),Brigham City,Hotspring,72,22
40.167,-111.622,Wood Springs,Salt Lake City,Hotspring,73,23
40.234,-111.865,Warm Springs,Salt Lake City,Hotspring,77,25
39.955,-111.858,Goshen Warm Srings,Price,Hotspring,73,23
39.334,-113.518,South Tule Spring,Delta,Hotspring,77,25
39.616,-112.803,Fumarole Butte,Delta,Hotspring,73,23
40.545,-111.928,East Jordan Canal,Salt Lake City,Hotspring,73,23
41.643,-112.281,Springs,Brigham City,Hotspring,72,22
37.29,-80.619,New River White Sulphur Springs,Bluefield,Hotspring,85,29
37.997,-79.83,Hot Springs,Roanoke,Hotspring,106,41
37.898,-79.462,Rockbridge Baths,Roanoke,Hotspring,72,22
38.055,-79.78,Warm Springs,Charlottesvill,Hotspring,95,35
37.963,-79.861,Healing Springs,Roanoke,Hotspring,86,30
38.238,-79.65,Bragg Spring,Charlottesvill,Hotspring,75,24
37.645,-80.238,Sweet Chalybeate Spring,Bluefield,Hotspring,75,24
38.218,-79.673,Bolar Spring,Charlottesvill,Hotspring,73,23
37.86,-79.988,Layton Spring,Roanoke,Hotspring,72,22
37.87,-79.933,Falling Spring,Roanoke,Hotspring,77,25
37.16,-80.806,Alum Springs,Bluefield,Hotspring,72,22
46.852,-121.758,Mt Rainier Fumaroles,Yakima,Hotspring,162,72
46.738,-121.562,Ohanapecosh Hot Springs,Yakima,Hotspring,122,50
47.707,-121.155,Scenic Hot Springs,Wenatchee,Hotspring,122,50
47.969,-123.864,Sol Duc Hot Springs,Seattle,Hotspring,122,50
48.974,-119.475,Hot Lake,Okanogan,Hotspring,122,50
45.658,-121.962,Moffetts (Bonneville) Hot Springs,The Dalles,Hotspring,97,36
48.906,-119.455,Poison Lake,Okanogan,Hotspring,122,50
45.701,-121.728,Collins Hot Springs,The Dalles,Hotspring,122,50
47.484,-121.391,Goldmeyer Hot Springs,Wenatchee,Hotspring,127,53
46.202,-121.492,Mount Adams Fumaroles,Yakima,Hotspring,150,66
46.198,-122.197,Mt St Helens Fumaroles,Hoquiam,Hotspring,190,88
48.789,-121.804,Dorr Fumarole Field,Concrete,Hotspring,194,90
48.77,-121.813,Sherman Crater Fumaroles,Concrete,Hotspring,266,130
45.723,-121.927,Rock Creek Hot Springs,The Dalles,Hotspring,H,H
48.15,-121.062,Gamma Hot Springs,Concrete,Hotspring,140,60
46.378,-122.265,Green River Soda Spring,Hoquiam,Hotspring,86,30
46.575,-121.706,Packwood Hot Spring,Yakima,Hotspring,100,38
47.201,-121.536,Lester Hot Springs,Wenatchee,Hotspring,120,49
46.024,-118.771,Warm Springs Canyon Warm Spring,Walla Walla,Hotspring,72,22
46.345,-121.6,Orr Creek Warm Springs,Yakima,Hotspring,72,22
46.041,-121.181,Fish Hatchery Warm Spring,Yakima,Hotspring,75,24
46.752,-121.814,Longmire Mineral Springs,Yakima,Hotspring,77,25
47.892,-121.342,Garland Mineral Springs,Wenatchee,Hotspring,84,29
46.452,-120.956,Simcoe Soda Springs,Yakima,Hotspring,90,32
48.254,-121.17,Sulphur Creek Hot Springs,Concrete,Hotspring,99,37
48.118,-121.192,Kennedy Hot Spring,Concrete,Hotspring,100,38
48.763,-121.667,Baker Hot Spring,Concrete,Hotspring,108,42
47.977,-123.682,Olympic Hot Springs,Seattle,Hotspring,118,48
45.728,-121.8,St Martins Hot Springs,The Dalles,Hotspring,120,49
45.821,-121.133,Klickitat Mineral Springs,The Dalles,Hotspring,81,27
38.163,-79.975,Minnehaha Springs,Charlottesvill,Hotspring,70,21
37.63,-80.24,Old Sweet Spring,Bluefield,Hotspring,73,23
39.618,-78.23,Berkeley Springs,Cumberland,Hotspring,72,22
38.605,-79.353,Thorn Spring,Charlottesvill,Hotspring,72,22
39.471,-77.877,Swan Pond Spring,Baltimore,Hotspring,72,22
44.29,-110.504,"Hot Springs,heart Lake Geyser Basi",Ashton,Hotspring,201,94
44.691,-110.728,Geyser Springs Group,Ashton,Hotspring,201,94
44.554,-110.812,Fountain Group,Ashton,Hotspring,201,94
44.543,-110.859,Fairy Springs,Ashton,Hotspring,201,94
44.485,-110.852,"Biscuit Basin, Sapphire Pool",Ashton,Hotspring,201,94
44.48,-110.85,Cascade Group,Ashton,Hotspring,201,94
44.46,-110.844,Black Sand Basin,Ashton,Hotspring,201,94
44.459,-110.835,Myriad Group,Ashton,Hotspring,201,94
44.307,-110.526,"Hot Springs,heart Lake Geyser Basi",Ashton,Hotspring,201,94
44.354,-110.8,Shoshone Geyser Basin,Ashton,Hotspring,203,95
44.568,-110.805,Quagmire Group,Ashton,Hotspring,203,95
44.537,-110.801,"White Dome Geyser, Surprise Pool",Ashton,Hotspring,203,95
44.52,-110.828,Flood Group,Ashton,Hotspring,203,95
44.471,-110.843,"Daisy Group, Sentinel Geysers",Ashton,Hotspring,203,95
44.466,-110.839,"Middle Group,tortoise Shell,inkwel",Ashton,Hotspring,203,95
44.46,-110.828,"Geyser Hill Group, Old Faithful Ge",Ashton,Hotspring,203,95
44.908,-110.393,Calcite Springs,Ashton,Hotspring,201,94
44.417,-110.57,West Thumb Geyser Basin,Ashton,Hotspring,203,95
44.459,-110.817,Southeastern Group,Ashton,Hotspring,198,92
44.433,-110.581,Potts Hot Spring Basin,Ashton,Hotspring,203,95
44.421,-110.952,Smoke Jumper Hot Springs,Ashton,Hotspring,198,92
44.684,-110.753,Monument Geyser Basin,Ashton,Hotspring,197,92
44.679,-110.746,Beryl Spring,Ashton,Hotspring,198,92
44.544,-110.258,Turbid Springs,Ashton,Hotspring,198,92
44.53,-110.297,Steamboat Springs,Ashton,Hotspring,198,92
44.518,-110.813,"Hot Springs, Rabbit Creek Group",Ashton,Hotspring,198,92
44.514,-110.828,Rabbit Creek Group,Ashton,Hotspring,198,92
44.484,-110.873,Mystic Falls Springs,Ashton,Hotspring,198,92
44.739,-110.324,Josephs Coat Springs,Ashton,Hotspring,199,93
44.75,-110.714,Gas Vent,Ashton,Hotspring,H,H
44.282,-110.506,Rustic Geyser,Ashton,Hotspring,199,93
44.571,-110.811,Morning Mist Springs,Ashton,Hotspring,205,96
44.733,-110.703,Cistern Spring,Ashton,Hotspring,199,93
44.697,-110.724,Gibbon Hill Geyser,Ashton,Hotspring,199,93
44.693,-110.738,Artists Paintpots,Ashton,Hotspring,199,93
44.69,-110.384,Hot Springs on Bog Creek,Ashton,Hotspring,199,93
44.526,-110.835,Excelsior Geyser Crater,Ashton,Hotspring,199,93
44.418,-110.805,Lone Star Geyser,Ashton,Hotspring,199,93
44.309,-110.654,Hot Springs on Lewis Lake,Ashton,Hotspring,199,93
44.469,-110.828,Solitary Geyser,Ashton,Hotspring,198,92
44.433,-110.813,Hot Springs,Ashton,Hotspring,H,H
44.766,-110.3,Hot Springs,Ashton,Hotspring,H,H
44.61,-110.438,Hot Springs,Ashton,Hotspring,H,H
44.607,-110.617,Hot Springs East of Mary Lake,Ashton,Hotspring,H,H
44.601,-110.632,Gas Vent East of Mary Lake,Ashton,Hotspring,H,H
44.595,-110.622,Gas Vents Southeast of Mary Lake,Ashton,Hotspring,H,H
44.572,-110.691,Hot Springs,Ashton,Hotspring,H,H
44.553,-110.301,Beach Springs,Ashton,Hotspring,H,H
44.551,-110.85,Springs on Fairy Creek,Ashton,Hotspring,H,H
44.616,-110.616,Highland Hot Springs,Ashton,Hotspring,H,H
44.438,-110.977,Hot Springs on Continental Divide,Ashton,Hotspring,H,H
44.617,-110.432,Mud Geysers,Ashton,Hotspring,H,H
44.404,-110.824,Hot Springs on Upper Firehole Rive,Ashton,Hotspring,H,H
44.498,-109.193,Buffalo Bill Reservoir Springs,Cody,Hotspring,W,W
44.495,-109.222,Buffalo Bill Reservoir Springs,Cody,Hotspring,W,W
44.482,-109.204,Buffalo Bill Reservoir Springs,Cody,Hotspring,W,W
44.841,-110.167,"Hot, on Lamar River",Ashton,Hotspring,W,W
44.734,-110.029,Hot Springs,Ashton,Hotspring,W,W
44.708,-110.471,Warm Spring,Ashton,Hotspring,W,W
44.701,-110.036,Hot Springs,Ashton,Hotspring,W,W
44.508,-110.832,Midway Picnic Ground,Ashton,Hotspring,H,H
44.715,-110.555,Gas Vents,Ashton,Hotspring,H,H
44.563,-110.834,River Group,Ashton,Hotspring,205,96
44.544,-110.788,"Black Warrior Group, Shelf Spring",Ashton,Hotspring,205,96
44.115,-110.684,Huckleberry Hot Springs,Ashton,Hotspring,B,B
44.842,-110.732,Apollinaris Spring,Ashton,Hotspring,H,H
44.825,-110.675,Gas Vents at Horseshoe Hill,Ashton,Hotspring,H,H
44.781,-110.738,Steam Vents at Roaring Mountain,Ashton,Hotspring,H,H
44.743,-110.242,Hot Spring Basin Group,Ashton,Hotspring,198,92
44.752,-110.256,Hot Spring,Ashton,Hotspring,H,H
44.612,-110.618,Gas Vent,Ashton,Hotspring,H,H
44.741,-110.699,Gas Vent,Ashton,Hotspring,H,H
44.566,-110.871,"Flat Cone Spring, Steep Cone",Ashton,Hotspring,205,96
44.711,-110.468,Hot Springs,Ashton,Hotspring,H,H
44.708,-110.461,Forest Springs,Ashton,Hotspring,H,H
44.672,-110.236,Hot Springs,Ashton,Hotspring,H,H
44.667,-110.282,Hot Springs,Ashton,Hotspring,H,H
44.656,-110.572,Violet Springs,Ashton,Hotspring,H,H
44.642,-110.238,Hot Spring,Ashton,Hotspring,H,H
44.634,-110.234,The Mudkettles,Ashton,Hotspring,H,H
44.634,-110.226,The Mushpots,Ashton,Hotspring,H,H
44.532,-110.874,"Imperial Geyser, Spray Geyser",Ashton,Hotspring,192,89
42.545,-106.725,Alcova Hot Springs,Casper,Hotspring,129,54
42.75,-109.616,Steele Hot Springs,Lander,Hotspring,102,39
43.37,-110.445,Granite Hot Spring,Driggs,Hotspring,106,41
43.008,-108.835,Washakie Mineral Hot Springs,Thermopolis,Hotspring,111,44
43.907,-110.198,North Buffalo Fork Springs,Driggs,Hotspring,113,45
43.365,-110.443,Granite Falls Hot Springs,Driggs,Hotspring,112,45
42.817,-110.997,Johnson Springs,Preston,Hotspring,115,46
44.723,-110.358,Hot Spring on Moss Creek,Ashton,Hotspring,115,46
44.681,-110.326,Hot Springs on Upper Sour Creek,Ashton,Hotspring,194,90
41.45,-106.804,Saratoga Hot Springs,Rawlins,Hotspring,129,54
44.671,-110.786,Secret Valley Hot Springs,Ashton,Hotspring,95,35
44.625,-110.433,Mud Volcano,Ashton,Hotspring,131,55
43.654,-108.194,Thermopolis Hot Springs,Thermopolis,Hotspring,133,56
44.985,-110.689,Hot River,Ashton,Hotspring,136,58
44.588,-110.341,Ebro Springs,Ashton,Hotspring,136,58
44.55,-110.805,Fountain Paint Pot,Ashton,Hotspring,136,58
44.169,-110.583,Snake Hot Springs,Ashton,Hotspring,136,58
44.157,-110.699,Crawfish Creek Hot Springs,Ashton,Hotspring,136,58
44.165,-110.723,Crawfish Creek Hot Springs,Ashton,Hotspring,138,59
44.711,-110.741,Chocolate Pots,Ashton,Hotspring,124,51
43.56,-109.732,Geyser (Warm Spring Creek Springs),Thermopolis,Hotspring,84,29
43.489,-109.605,Jakeys Fork Spring,Thermopolis,Hotspring,68,20
44.749,-108.188,Little Sheep Mountain Spring,Cody,Hotspring,68,20
42.249,-104.781,Warm Springs (Immigrants Washtub),Torrington,Hotspring,70,21
44.608,-108.138,Sheep Mountain Springs,Cody,Hotspring,70,21
43.583,-108.213,Wind River Canyon Spring,Thermopolis,Hotspring,72,22
42.702,-107.105,Horse Creek Springs,Casper,Hotspring,75,24
44.511,-109.156,Needle Hot Springs,Cody,Hotspring,75,24
43.52,-109.669,Little Warm Spring,Thermopolis,Hotspring,77,25
43.3,-110.775,Astoria Mineral Hot Springs,Driggs,Hotspring,99,37
43.543,-110.741,Abercrombie Warm Springs,Driggs,Hotspring,81,27
44.513,-109.115,De Maris Springs,Cody,Hotspring,97,36
42.665,-105.394,Douglas Hot Springs,Torrington,Hotspring,86,30
43.471,-110.835,Boyles Hill Springs,Driggs,Hotspring,86,30
43.282,-110.019,Kendall Warm Spring,Driggs,Hotspring,86,30
44.662,-110.768,Iron Spring,Ashton,Hotspring,86,30
42.492,-108.172,Sweetwater Station Warm Springs,Lander,Hotspring,90,32
44.742,-110.579,Wolf Lake Springs,Ashton,Hotspring,91,33
44.513,-109.129,Shoshone Hot Springs,Cody,Hotspring,95,35
42.828,-110.999,Auburn Hot Springs,Preston,Hotspring,144,62
43.639,-110.615,Kelly Warm Spring,Driggs,Hotspring,81,27
44.532,-110.796,Five Sisters Springs,Ashton,Hotspring,192,89
44.582,-110.314,Vermilion Springs,Ashton,Hotspring,140,60
44.521,-110.275,Butte Springs,Ashton,Hotspring,187,86
44.478,-110.867,Hillside Springs,Ashton,Hotspring,187,86
44.752,-110.418,Hot Springs at Sevenmile Hole,Ashton,Hotspring,189,87
44.401,-110.936,Hot Springs on Continental Divide,Ashton,Hotspring,189,87
44.769,-110.269,Rainbow Springs,Ashton,Hotspring,190,88
44.628,-110.433,Sulphur Caldron,Ashton,Hotspring,190,88
44.702,-110.767,Sylvan Springs,Ashton,Hotspring,192,89
44.529,-110.791,White Creek Group,Ashton,Hotspring,185,85
44.564,-110.869,Queens Laundry,Ashton,Hotspring,192,89
44.697,-110.375,Hot Springs on Bog Creek,Ashton,Hotspring,185,85
44.285,-110.9,Bechler River Hot Springs,Ashton,Hotspring,194,90
44.797,-110.725,Amphitheater Springs,Ashton,Hotspring,196,91
44.766,-110.429,Washburn Hot Springs,Ashton,Hotspring,196,91
44.756,-110.308,Coffee Pot Hot Springs,Ashton,Hotspring,196,91
44.591,-110.321,Hot Springs at Sulphur Hills,Ashton,Hotspring,196,91
44.556,-110.832,River Group,Ashton,Hotspring,196,91
44.422,-110.574,West Thumb Geyser Basin,Ashton,Hotspring,196,91
44.786,-110.74,Semi-Centennial Geyser,Ashton,Hotspring,198,92
44.653,-110.482,Sulphur Springs,Ashton,Hotspring,194,89
44.41,-110.953,Summit Lake Hot Springs,Ashton,Hotspring,162,72
44.761,-110.73,Bijah Spring,Ashton,Hotspring,198,92
44.781,-110.699,Whiterock Springs,Ashton,Hotspring,144,62
44.739,-110.258,Hot Spring Basin Group,Ashton,Hotspring,153,67
44.754,-110.403,Sevenmile Hole,Ashton,Hotspring,154,68
44.276,-110.636,Hot Springs on Lewis Lake,Ashton,Hotspring,154,68
44.598,-110.236,Hot Springs In Pelican Valley,Ashton,Hotspring,156,69
44.142,-110.656,South Entrance Hot Springs,Ashton,Hotspring,156,69
44.753,-110.724,"Roadside Springs, Frying Pan Sprin",Ashton,Hotspring,158,70
44.733,-110.712,Horseshoe Spring,Ashton,Hotspring,187,86
43.958,-110.696,Jackson Lake Hot Springs,Driggs,Hotspring,162,72
44.187,-110.726,Hot Springs,Ashton,Hotspring,142,61
44.967,-110.708,Mammoth Hot Springs,Ashton,Hotspring,163,73
44.475,-110.843,Morning Glory Pool,Ashton,Hotspring,163,73
44.204,-110.486,Hot Springs on Upper Snake River,Ashton,Hotspring,167,75
44.299,-110.517,"Heart Lake Geyser Basin, Middle Gr",Ashton,Hotspring,174,79
44.671,-110.29,Ponuntpa Springs Group,Ashton,Hotspring,180,82
44.244,-111.022,Boundary Creek Hot Springs,Ashton,Hotspring,181,83
44.414,-110.817,"Lone Star Geyser Basin, Footbridge",Ashton,Hotspring,183,84
44.722,-110.701,Echinus Geyser,Ashton,Hotspring,185,85
44.461,-110.854,Emerald Pool,Ashton,Hotspring,158,70
;;;;
run;