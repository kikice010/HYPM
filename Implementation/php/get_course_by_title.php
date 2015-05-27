<?php

/*
Following code gets all the details regarding one course provided it's title
eg. return JSON format;
{   course: [
	{
		room: "A1"
		title: "Spinning",
		level: "Beginner",
		target: "Any",
		category: "Cardio",
		description: "Indoor cycling, as an organized...",
		instructors: ['Jane Doe', 'John Doe']
	}]
}

 */
header("Access-Control-Allow-Origin: *");

$response = array(); // array for JSON response

if (isset($_GET["title"])) {

	$title = $_GET["title"];

	$con = mysqli_connect("localhost", "hypermediagym", "bipgikorgu20", "my_hypermediagym"); // connect to db
	mysqli_query($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

	// get the course from Course table
	$result = mysqli_query($con,
		"SELECT co.* , cat.name as category, ro.name as room " .
		"FROM course co " .
		"INNER JOIN category cat " .
		"ON co.course_category_id = cat.category_id " .
		"INNER JOIN room ro " .
		"ON co.course_room_id = ro.room_id " .
		"WHERE co.title = '" . $title . "'") or die(mysql_error());

	// check for empty result
	if (mysqli_num_rows($result) > 0) {

		$response["course"]  = array();
		$response["success"] = 1;
		$response["message"] = "Course found!";

		// looping through all results
		while ($row = mysqli_fetch_array($result)) {
			$entry                = array();
			$entry["room"]        = $row["room"];
			$entry["title"]       = $row["title"];
			$entry["level"]       = $row["level"];
			$entry["target"]      = $row["target"];
			$entry["category"]    = $row["category"];
			$entry["description"] = $row["description"];
			$entry["instructors"] = array();

			$instructors_result = mysqli_query($con,
				"SELECT instr_name " .
				"FROM instructor " .
				"INNER JOIN course_instructor " .
				"ON instructor_id = fk_instructor_id " .
				"WHERE fk_course_id = " . $row['course_id']) or die(mysql_error());

			if (mysqli_num_rows($instructors_result) > 0) {
				$response["success"] = 1;
				$response["message"] = "Instructors and courses found!";

				while ($instructor_row = mysqli_fetch_array($instructors_result)) {
					array_push($entry["instructors"], $instructor_row["instr_name"]);
				}
			} else {
				$response["success"] = 0;
				$response["message"] = "Instructors not found!";
			}

			// push single entry into final response array
			array_push($response["course"], $entry);
		}

	} else {
		$response["success"] = 0;
		$response["message"] = "Course not found!";
	}
} else {
	$response["success"] = 0;
	$response["message"] = "Course title not set!";
}
echo json_encode($response);

?>