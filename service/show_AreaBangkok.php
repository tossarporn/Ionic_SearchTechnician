<?php
include "../config/connect_DB.php";

$select = 'SELECT 
	`area_bangkok`.`id`,
	concat(`area_bangkok`.`area_name`," (",COUNT(`technician_store`.`ref_area`) , ") ") 
	as "area_name"
	
	FROM `area_bangkok` 
	LEFT JOIN technician_store 
	ON (area_bangkok.id = technician_store.ref_area) 
	GROUP BY area_bangkok.area_name';

$area = [];

if ($res = mysqli_query($connection,$select)) {
	while ($row = mysqli_fetch_assoc($res)) {
		$area[]=$row;
	}
}
else{
	$area = [];
}
	echo json_encode($area);
?>