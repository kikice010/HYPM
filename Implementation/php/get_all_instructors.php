<?php
/*
 * Following code will list all instructors
 */
header("Access-Control-Allow-Origin: *");
// array for JSON response
$response = array();

// include db connect class
$con = mysqli_connect("localhost", "hypermediagym", "bipgikorgu20", "my_hypermediagym");
mysqli_query($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

// get all instructors from instructor table
$result = mysqli_query($con, "SELECT * FROM instructor") or die(mysql_error());

// check for empty result
if (mysqli_num_rows($result) > 0) {
	// looping through all results
	// instructors node

	$response["instructors"] = array();
	$response["success"]     = 1;
	$response["message"]     = "Instructors found!";

	while ($row = mysqli_fetch_array($result)) {
		// temp entry array
		$entry                            = array();
		$entry["instr_name"]              = $row["instr_name"];
		$entry["bio"]                     = $row["bio"];
		$entry["qualifications"]          = $row["qualifications"];
		$entry["prizes_and_awards"]       = $row["prizes_and_awards"];
		$entry["instructor_of_the_month"] = $row["instructor_of_the_month"];
		$entry["image_path"]              = $row["image_path"];

		// push single entry into final response array
		array_push($response["instructors"], $entry);
	}

} else {
	$response["success"] = 0;
	$response["message"] = "Instructors not found!";
}
echo json_encode($response);

?>