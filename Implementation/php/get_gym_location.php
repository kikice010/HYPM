<?php

/*
 * Following code will return single entry of location table
 */
header("Access-Control-Allow-Origin: *");
// array for JSON response
$response = array();

// include db connect class
$con = mysqli_connect("localhost", "hypermediagym", "bipgikorgu20", "my_hypermediagym");
mysqli_query($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

// get gym location from location table
$result = mysqli_query($con, "SELECT * FROM location LIMIT 1") or die(mysql_error());

// check for empty result
if (mysqli_num_rows($result) > 0) {
	// looping through all results
	// location node

	$response["location"] = array();
	$response["success"]  = 1;
	$response["message"]  = "Location found!";

	while ($row = mysqli_fetch_array($result)) {
		// temp entry array
		$entry                    = array();
		$entry["address"]         = $row["address"];
		$entry["how_to_get_here"] = $row["how_to_get_here"];
		$entry["lat"]             = $row["lat"];
		$entry["lon"]             = $row["long"];

		// push single entry into final response array
		array_push($response["location"], $entry);
	}

} else {
	$response["success"] = 0;
	$response["message"] = "Location not found!";
}
echo json_encode($response);

?>