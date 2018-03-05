<?php
include '../config/connect_DB.php';
$select = "SELECT * FROM `technician_type` WHERE 1";
$equipment = [];

	if ($res = mysqli_query($connection,$select)) {
		while ($row = mysqli_fetch_assoc($res)) {
				$equipment[] = $row;

			}
	}

	else{
		$equipment = [];
	}
	echo json_encode($equipment);
?>