<?php
include '../config/connect_DB.php';
    header("Access-Control-Allow-Origin: *");
    $data = file_get_contents("php://input");
    $array_input = json_decode($data,true);
    $return = array();
    $return = json_decode($data,true);
    // $array_input["mykey"] = 5555;
    // var_dump($array_input);
    // exec("echo {$data} > output.txt");

    echo json_encode($array_input);
    // echo $data;

?>