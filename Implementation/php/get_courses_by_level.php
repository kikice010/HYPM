<?php

/*
 Following code lists all categories and their corresonding courses
 eg. return JSON format;
    {'level':[
        {   
            'name': 'Beginner',
            'courses': ['Bikram Yoga', 'Antigravity Yoga']
        },{
            'name': 'Advanced',
            'courses': ['Stott Pilates', 'Private pilates', 'Mat pilates']
        }
    ]}
*/

header("Access-Control-Allow-Origin: *");

//default response
$response["success"] = 0;
$response["message"] = "Courses not found!";

// array for JSON response
$response = array();
$response["level"] = array();

// list all possible levels
$levels = array("Beginner", "Intermediate", "Advanced");

// include db connect class
$con = mysqli_connect("localhost","hypermediagym","bipgikorgu20","my_hypermediagym");
mysqli_query( $con,"SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

// get all equipment from equipment table

foreach ($levels as $level) {

    $result = mysqli_query($con,
        "SELECT title ".
        "FROM course ".
        "WHERE level = '". $level ."'")or die(mysql_error());

    if (mysqli_num_rows($result) > 0){ // check for empty result
            $response["success"] = 1;
            $response["message"] = "Courses found!";
            
            $entry = array();
            $entry["name"]    =  $level;
            $entry["courses"] = array();

            while ($course_row = mysqli_fetch_array($result)){
                array_push($entry["courses"], $course_row["title"]);
            }
            
        // push single entry into final response array
        array_push($response["level"], $entry);

    }
}
echo json_encode($response);

?>		