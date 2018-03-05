<?php
include '../config/connect_DB.php';
$return = array();

	if (count($_GET) == 12 && 
		isset($_GET['name_store']) && isset($_GET['equipment']) && isset($_GET['tel']) && isset($_GET['time_start'])&& 
		isset($_GET['time_end'])&& isset($_GET['cost_begin']))&& isset($_GET['num_house'])&& isset($_GET['street'])
		&& isset($_GET['distric']) && isset($_GET['area'])&& isset($_GET['lat'])&& isset($_GET['lng'])) 
	{
				
				$user = $_GET['name_store'];
				$equipment = $_GET['equipment'];
				$tel = $_GET['tel'];
				$time_start = $_GET['time_start'];
				$time_end = $_GET['time_end'];
				$cost_begin = $_GET['cost_begin'];
				$num_house = $_GET['num_house'];
				$street = $_GET['street'];
				$distric = $_GET['distric'];
				$area = $_GET['area'];
				$lat = $_GET['lat'];
				$lng = $_GET['lng'];
	}
		$select = "SELECT * FROM `register` WHERE `user`='{$user}' AND `password` ='{$password}'";
		if ($res = mysqli_query($connection,$select)) {
			if (mysqli_num_rows($res)>0) {
				$return['message'] = "มีผู้ใช้รหัสผ่านนี้แล้ว";
				$return['status'] = false;
			}
			else{
				$insert = "INSERT INTO `register` (`id`, `user`, `password`, `status`) VALUES (NULL, '{$user}', '{$password}', '$status') ";
				if (mysqli_query($connection,$insert)) {	
					$return['message'] = "สมัคสมาชิกสำเร็จ";
					$return['status'] = true;
				}
			}
	}
	echo json_encode($return);
	mysqli_close($connection);

?>