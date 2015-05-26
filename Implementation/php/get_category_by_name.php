<?php

/*
Following code gets all the details regarding single category provided it's name
eg. return JSON format;
{   category: [
    {
        name: "Yoga",
        origins: "Many people credit Dr Kenneth H. ...",
        benefits: "Increases the efficiency of res ...",
        meant_for: "Anyone",
        description: "Cardio (also known as aerobic ... "
        }
    }]
}

 */
header("Access-Control-Allow-Origin: *");

// array for JSON response
$response = array();
if (isset($_GET["name"])) {

	$name = $_GET["name"];

	// include db connect class
	$con = mysqli_connect("localhost", "hypermediagym", "bipgikorgu20", "my_hypermediagym");
	mysqli_query($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

	// get all Category from Category table
	$result = mysqli_query($con,
		"SELECT * " .
		"FROM category " .
		"where name = '" . $name . "'") or die(mysql_error());

	// check for empty result
	if (mysqli_num_rows($result) > 0) {

		$response["success"]  = 1;
		$response["message"]  = "Category found!";
        $response["category"] = array();

		while ($row = mysqli_fetch_array($result)) {
			$entry                = array();
			$entry["name"]        = $row["name"];
			$entry["origins"]     = $row["origins"];
			$entry["benefits"]    = $row["benefits"];
			$entry["meant_for"]   = $row["meant_for"];
			$entry["description"] = $row["description"];

			// push single entry into final response array
			array_push($response["category"], $entry);
		}

	} else {
		$response["success"] = 0;
		$response["message"] = "Category not found!";
	}
} else {
	$response["success"] = 0;
	$response["message"] = "Category title not set!";
}
echo json_encode($response);

?>