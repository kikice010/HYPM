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
description: "Cardio (also known as aerobic ... ",
courses: [
"Bikram Yoga",
"Anti-Gravity Yoga"
],
instructors: [
"Alexandra Behrens"
]
}]
}
 */
header("Access-Control-Allow-Origin: *");

// array for JSON response
$response = array();

// get params from get request eg (./site.html?name=A1)
if (isset($_GET["name"])) {
	$name = $_GET["name"];

	// connect to db
	$con = mysqli_connect("localhost", "hypermediagym", "bipgikorgu20", "my_hypermediagym");
	mysqli_query($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

	// get the category with name = $name
	$result = mysqli_query($con,
		"SELECT * " .
		"FROM room " .
		"WHERE name = '" . $name . "'") or die(mysql_error());

	// check for empty result
	if (mysqli_num_rows($result) > 0) {

		$response["success"] = 1;
		$response["message"] = "Room found!";
		$response["room"]    = array();

		while ($row = mysqli_fetch_array($result)) {
			$entry             = array();
			$entry["name"]     = $row["name"];
			$entry["location"] = $row["location"];
			$entry["courses"]  = array();
			$entry["gallery"]  = array();

			// for each room get all corresponding courses
			$course_result = mysqli_query($con,
				"SELECT title " .
				"FROM course " .
				"WHERE course_room_id = " . $row['room_id']) or die(mysql_error());

			// skip if no courses found
			if (mysqli_num_rows($course_result) > 0) {
				$response["success"] = 1;
				$response["message"] = "Courses found!";

				// for each course that of the given category, push the result in te entry array
				while ($course_row = mysqli_fetch_array($course_result)) {
					array_push($entry["courses"], $course_row["title"]);
				}
			}

			// for each room get all images
			$gallery_result = mysqli_query($con,
				"SELECT image_path " .
				"FROM room_gallery " .
				"WHERE fk_room_id = " . $row['room_id']) or die(mysql_error());

			// skip if no images found for a given room
			if (mysqli_num_rows($gallery_result) > 0) {
				$response["success"] = 1;
				$response["message"] = "Images and courses found!";

				// for each instructor that teaches a course, push the result in te entry array
				while ($gallery_row = mysqli_fetch_array($gallery_result)) {
					array_push($entry["gallery"],$gallery_row ["image_path"]);
				}
			}

			// push single entry into final response array
			array_push($response["room"], $entry);
		}

	} else {
		$response["success"] = 0;
		$response["message"] = "Room not found!";
	}
} else {
	$response["success"] = 0;
	$response["message"] = "Room title not set!";
}
echo json_encode($response);

?>