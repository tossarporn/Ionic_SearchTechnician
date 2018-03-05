<?php
include"../config/connect_DB.php";
$select = "SELECT `id`,`area_name` FROM `area_bangkok` WHERE 1";

$area = [];
	if ($res = mysqli_query($connection,$select)) {

			while ($row = mysqli_fetch_assoc($res)) {
				$area[] = $row;
			}
	}
	else{
		$area = [];
	}
	echo json_encode($area);
?>