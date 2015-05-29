<?php
/*
 Following code lists all categories and their corresonding courses
 eg. return JSON format;
    {'category':[
        {
            'name': 'Yoga',
            'courses': ['Bikram Yoga', 'Antigravity Yoga']
        },{
            'name': 'Pilates',
            'courses': ['Stott Pilates', 'Private pilates', 'Mat pilates']
        }
    ]}
 */
header("Access-Control-Allow-Origin: *");

// array for JSON response
$response = array();
$response["category"] = array();

//default response
$response["success"] = 0;
$response["message"] = "Courses not found!";

// connect to db
$con = mysqli_connect("localhost", "hypermediagym", "bipgikorgu20", "my_hypermediagym");
mysqli_query($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

// get all categories from the database
$result = mysqli_query($con, "SELECT name, category_id FROM category") or die(mysql_error());

// check for empty result
if (mysqli_num_rows($result) > 0) {

    // loop through each category
	while ($row = mysqli_fetch_array($result)) {
		$entry            = array();
		$entry["name"]    = $row["name"];
		$entry["courses"] = array();

        // get corresponding courses for a particular category 
		$courses_result = mysqli_query($con, "SELECT title FROM course where course_category_id = " . $row['category_id']) or die(mysql_error());

		if (mysqli_num_rows($courses_result) > 0) {
			$response["success"] = 1;
			$response["message"] = "Category and courses found!";

            // push all found courses for a single category in that category's entry array
			while ($course_row = mysqli_fetch_array($courses_result)) {
				array_push($entry["courses"], $course_row["title"]);
			}
		} else {
			$response["success"] = 0;
			$response["message"] = "Courses not found!";
		}
		// push single entry into final response array
		array_push($response["category"], $entry);
	}
} 

echo json_encode($response);
?>