<?php
/*
Following code gets all the details regarding a single room provided it's name
eg. return JSON format;
{
	room: [
		{
			name: "First floor",
			rooms: ["A1", "A2", "A3"]
		},
		{
			name: "Second floor",
			rooms: ["B1", "B2"]
		}
	}]
}
 */
header("Access-Control-Allow-Origin: *");

// array for JSON response
$response         = array();
$response["room"] = array();

//default response
$response["success"] = 0;
$response["message"] = "Rooms not found!";

// list all possible levels
$floors = array("First floor", "Second floor", "Third floor", "Indoor pool on the rooftop");

// connect to db
$con = mysqli_connect("localhost", "hypermediagym", "bipgikorgu20", "my_hypermediagym");
mysqli_query($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

// for each level in $levels array get the corresponding courses
foreach ($floors as $floor) {

	$result = mysqli_query($con,
		"SELECT name " .
		"FROM room " .
		"WHERE location = '" . $floor . "'") or die(mysql_error());

	// skip if no result for a paticular level
	if (mysqli_num_rows($result) > 0) {
		$response["success"] = 1;
		$response["message"] = "Rooms found!";

		$entry          = array();
		$entry["name"]  = $floor;
		$entry["rooms"] = array();

		while ($room_row = mysqli_fetch_array($result)) {
			array_push($entry[rooms], $room_row["name"]);
		}

	}
	array_push($response["room"], $entry);

}
echo json_encode($response);

?>