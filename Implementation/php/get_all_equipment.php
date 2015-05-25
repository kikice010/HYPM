<?php
 
/*
 * Following code will list all the equipment
 */
 
// array for JSON response
$response = array();
 
// include db connect class
	$con=mysqli_connect("localhost","hypermediagym","bipgikorgu20","my_hypermediagym");
        mysqli_query( $con,"SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");

// get all equipment from equipment table
        $result = mysqli_query($con,"SELECT * FROM equipment")or die(mysql_error());
// check for empty result
        if (mysqli_num_rows($result) > 0)
        {
    // looping through all results
    // equipment node
 
	$response["equipment"] = array();
        $response["success"] = 1;
        $response["message"] = "Equipment found!";
        
             while ($row = mysqli_fetch_array($result))
             {
        // temp entry array
                $entry = array();
                $entry["name"] = $row["name"];
                $entry["description"] = $row["description"];
                $entry["image_path"] = $row["image_path"];
 
        // push single entry into final response array
                array_push($response["equipment"], $entry);
            }

        }  
        else
        {
                $response["success"] = 0;
                $response["message"] = "Equipment not found!";
        } 
echo json_encode($response);

?>		