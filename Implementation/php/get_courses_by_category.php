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

// include db connect class
$con=mysqli_connect("localhost","hypermediagym","bipgikorgu20","my_hypermediagym");
mysqli_query( $con,"SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

// get all equipment from equipment table
$result = mysqli_query($con,"SELECT name, category_id FROM category")or die(mysql_error());


if (mysqli_num_rows($result) > 0){ // check for empty result

	$response["category"] = array();
    while ($row = mysqli_fetch_array($result)){
        $entry = array();
        $entry["name"] = $row["name"];
        $entry["courses"] = array();

        $courses_result = mysqli_query($con,"SELECT title FROM course where course_category_id = " . $row['category_id'] ) or die(mysql_error());

        if (mysqli_num_rows($courses_result) > 0){
            $response["success"] = 1;
            $response["message"] = "Category and courses found!";
            
            while ($course_row = mysqli_fetch_array($courses_result)){
                array_push($entry["courses"], $course_row["title"]);
            }
     }else{
        $response["success"] = 0;
        $response["message"] = "Courses not found!";
    } 
    // push single entry into final response array
    array_push($response["category"], $entry);
}

}else{
    $response["success"] = 0;
    $response["message"] = "Categories not found!";
} 
echo json_encode($response);

?>		