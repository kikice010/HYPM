<?php

/*
 * Following code will list all the Course
 */
header("Access-Control-Allow-Origin: *");
// array for JSON response
$response = array();
if (isset($_GET["name"])) {

    $name = $_GET["name"];

    // include db connect class
    $con=mysqli_connect("localhost","hypermediagym","bipgikorgu20","my_hypermediagym");
    mysqli_query( $con,"SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

    // get all Course from Course table
    $result = mysqli_query($con,
        "SELECT * FROM instructor WHERE instr_name = '". $name ."'" ) or die(mysql_error());
    // check for empty result
    if (mysqli_num_rows($result) > 0){
    // looping through all results
    // Instructor node

     $response["instructor"] = array();
     $response["success"] = 1;
     $response["message"] = "Instructor found!";

         while ($row = mysqli_fetch_array($result)){
            // temp entry array
            $entry = array();
            $entry["instr_name"] = $row["instr_name"];
            $entry["bio"] = $row["bio"];
            $entry["qualifications"] = $row["qualifications"];
            $entry["prizes_and_awards"] = $row["prizes_and_awards"];
            $entry["instructor_of_the_month"] = $row["instructor_of_the_month"];
            $entry["image_path"] = $row["image_path"];
			$entry["courses"] = array();
			$entry["categories"] = array();

			$courses_result = mysqli_query($con,
				"SELECT title FROM course " .
				"INNER JOIN course_instructor " .
				"ON course_id = fk_course_id " .
				"WHERE fk_instructor_id = " . $row['instructor_id']) or die(mysql_error());

			if (mysqli_num_rows($courses_result) > 0) {
				$response["success"] = 1;
				$response["message"] = "Courses and instructors found!";

				while ($course_row = mysqli_fetch_array($courses_result)) {
					//get title of the course
					array_push($entry["courses"], $course_row["title"]);
					echo "passed";
					echo $course_row["course_category_id"];
					//join $course_row["course_category_id"] with category.category_id and take category.name
					$categories_result = mysqli_query($con,
						"SELECT name FROM category " .
						//"INNER JOIN course " .
						//"ON course_category_id = category_id " .
						"WHERE category_id = " . $course_row["course_category_id"]) or die(mysql_error());
						
					if (mysqli_num_rows($categories_result) > 0) {
						$response["success"] = 1;
						$response["message"] = "Categories, courses and instructors found!";
						
						while ($category_row = mysqli_fetch_array($categories_result)) {
							//get name of the category
							array_push($entry["categories"], $category_row["name"]);
						}
					} else {
							$response["success"] = 0;
							$response["message"] = "Categories not found!";
					}
				}
			} else {
				$response["success"] = 0;
				$response["message"] = "Courses not found!";
			}
			//u course imam course_category_id koji treba da se joinuje sa category_id iz category i da se uzme name

            // push single entry into final response array
            array_push($response["instructor"], $entry);
        }

    } else{
        $response["success"] = 0;
        $response["message"] = "Instructor not found!";
    } 
}else{
    $response["success"] = 0;
    $response["message"] = "Instructor name not set!";
} 
echo json_encode($response);

?>		