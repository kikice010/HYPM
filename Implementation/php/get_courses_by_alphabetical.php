<?php

/*
 Following code lists all categories and their corresonding courses
 eg. return JSON format;
    {'alphabetical':[
        {   
            'name': 'A',
            'courses': ['Antigravity Yoga']
        },{
            'name': 'S',
            'courses': ['Stott Pilates', 'Strongman']
        }
    ]}
*/

header("Access-Control-Allow-Origin: *");
//default response
$response["success"] = 0;
$response["message"] = "Courses not found!";
// array for JSON response
$response = array();
$response["alphabetical"] = array();

// list all possible letters in the alphabet
$alphabet = range('A', 'Z');

// include db connect class
$con = mysqli_connect("localhost","hypermediagym","bipgikorgu20","my_hypermediagym");
mysqli_query( $con,"SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

// get all equipment from equipment table

foreach ($alphabet as $letter) {
    $result = mysqli_query($con,
        "SELECT title ".
        "FROM course ".
        "WHERE title like '". $letter ."%'")or die(mysql_error());

    if (mysqli_num_rows($result) > 0){ // check for empty result
            $response["success"] = 1;
            $response["message"] = "Courses found!";
            
            $entry = array();
            $entry["name"]    =  $letter;
            $entry["courses"] = array();

            while ($course_row = mysqli_fetch_array($result)){
                array_push($entry["courses"], $course_row["title"]);
            }
            
        // push single entry into final response array
        array_push($response["alphabetical"], $entry);

    }
}
echo json_encode($response);

?>		