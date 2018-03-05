<?php
include '../config/connect_DB.php';

if(isset($_GET['area_id'])){
	$where = 'where area_bangkok.id = '.$_GET['area_id'].' ';
}else{
	$where = "";
 
}

$sql = "SELECT technician_store.name_store,technician_type.type_name,area_bangkok.area_name,technician_store.lat,technician_store.lng FROM `technician_store` INNER JOIN technician_type ON technician_store.ref_type = technician_type.id INNER JOIN area_bangkok on technician_store.ref_area=area_bangkok.id {$where}";
$json = [];

if($res = mysqli_query($connection,$sql)){
	while ($row = mysqli_fetch_assoc($res)) {
		$json[] = $row;
	}
	
}else{
	$json = [];
	
}

echo json_encode($json);

?>