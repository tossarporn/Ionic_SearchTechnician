<?php
include '../config/connect_DB.php';
$return = array();
$return['data_user'] = array();
	if (count($_GET) == 2 && isset($_GET['user']) && isset($_GET['password'])) {
		$user = $_GET['user'];
		$password = $_GET['password'];
	
	}
	$select = "SELECT * FROM `register` WHERE `user`='{$user}' AND `password` ='{$password}' ";
	if ($res = mysqli_query($connection,$select)) {
		
		if (mysqli_num_rows($res) == 1) {
			$data = mysqli_fetch_assoc($res);
			$return['data_user'] = $data;
			$return['status'] = true;
			$return['message'] = "ยินดีต้อนรับเข้าสู่ระบบ";

		}
		else{
				$return['data_user'] = array();
				$return['status'] = false;
				$return['message'] = "ไม่มีผู้ใช้อยู่ในระบบ";
			}
		
		}	
else{

				$return['status'] = false;
				$return['message'] = "ไม่สามารถติดต่อกับระบบได้";
}
		
		echo json_encode($return);
		mysqli_close($connection);	
?>