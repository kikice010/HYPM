<?php

/*
 * Following code will list all the Course
 */
header("Access-Control-Allow-Origin: *");
// array for JSON response
$response = array();
if (isset($_GET["title"])) {

    $title = $_GET["title"];

    // include db connect class
    $con=mysqli_connect("localhost","hypermediagym","bipgikorgu20","my_hypermediagym");
    mysqli_query( $con,"SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

    // get all Course from Course table
    $result = mysqli_query($con,
        "SELECT co.* , cat.name as category, ro.name as room ".
        "FROM course co ".
        "INNER JOIN category cat ".
       "on co.course_category_id = cat.category_id ". 
      "INNER JOIN room ro ".
     "on co.course_room_id = ro.room_id ".
        "where co.title = '". $title ."'" ) or die(mysql_error());
    // check for empty result
    if (mysqli_num_rows($result) > 0){
    // looping through all results
    // Course node

     $response["course"] = array();
     $response["success"] = 1;
     $response["message"] = "Course found!";

         while ($row = mysqli_fetch_array($result)){
            // temp entry array
            $entry = array();
            $entry["title"] = $row["title"];
            $entry["description"] = $row["description"];
            $entry["target"] = $row["target"];
            $entry["level"] = $row["level"];
            $entry["category"] = $row["category"];
            $entry["room"] = $row["room"];

            // push single entry into final response array
            array_push($response["course"], $entry);
        }

    } else{
        $response["success"] = 0;
        $response["message"] = "Course not found!";
    } 
}else{
    $response["success"] = 0;
    $response["message"] = "Course title not set!";
} 
echo json_encode($response);

?>		