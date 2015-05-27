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

// get params from get request eg (./site.html?name=Cardio)
if (isset($_GET["name"])) {
	$name = $_GET["name"];

	// connect to db
	$con = mysqli_connect("localhost", "hypermediagym", "bipgikorgu20", "my_hypermediagym");
	mysqli_query($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

	// get the category with name = $name
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
			$entry["courses"]     = array();
			$entry["instructors"] = array();

			// for each category get all corresponding courses
			$course_result = mysqli_query($con,
				"SELECT title " .
				"FROM course " .
				"WHERE course_category_id = " . $row['category_id']) or die(mysql_error());

			// skip if no courses found
			if (mysqli_num_rows($course_result) > 0) {
				$response["success"] = 1;
				$response["message"] = "Courses found!";

				// for each course that of the given category, push the result in te entry array
				while ($instructor_row = mysqli_fetch_array($course_result)) {
					array_push($entry["courses"], $instructor_row["title"]);
				}
			}

			// for each category get all instructors that teach it
			$instructors_result = mysqli_query($con,
				"SELECT instr_name " .
				"FROM instructor " .
				"INNER JOIN category_instructor " .
				"ON instructor_id = fk_cat_instructor_id " .
				"WHERE fk_category_id = " . $row['category_id']) or die(mysql_error());

			// skip if no instructors found for a given course
			if (mysqli_num_rows($instructors_result) > 0) {
				$response["success"] = 1;
				$response["message"] = "Instructors and courses found!";

				// for each instructor that teaches a course, push the result in te entry array
				while ($instructor_row = mysqli_fetch_array($instructors_result)) {
					array_push($entry["instructors"], $instructor_row["instr_name"]);
				}
			}

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