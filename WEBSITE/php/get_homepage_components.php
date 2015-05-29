<?php
/*
 * Following code will list all the equipment
 */
header("Access-Control-Allow-Origin: *");

// array for JSON response
$response = array();

// connect to db
$con = mysqli_connect("localhost", "hypermediagym", "bipgikorgu20", "my_hypermediagym");
mysqli_query($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

// get all homepage columns
$result = mysqli_query($con, "SELECT * FROM homepage") or die(mysql_error());

// check for empty result
if (mysqli_num_rows($result) > 0) {
	// looping through all results
	// equipment node

	$response["success"]  = 1;
	$response["message"]  = "Homepage found!";
	$response["homepage"] = array();

	while ($row = mysqli_fetch_array($result)) {
		$entry                        = array();
		$entry["header_image_path"]   = $row["header_image_path"];
		$entry["founder_video_path"]  = $row["founder_video_path"];
		$entry["general_description"] = $row["general_description"];
		$entry["founder_description"] = $row["founder_description"];
		$entry["general_description_image_path"] = $row["general_description_image_path"];

		// push single entry into final response array
		array_push($response["homepage"], $entry);
	}

} else {
	$response["success"] = 0;
	$response["message"] = "Hompage not found!";
}
echo json_encode($response);
?>