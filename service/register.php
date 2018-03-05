<?php
header("Access-Control-Allow-Origin: *");
include '../config/connect_DB.php';
$data = file_get_contents("php://input");
$return = array();
$return = json_decode($data,true);
// var_dump($data);

	if (count($_POST) == 3 && isset($_POST['user']) && isset($_POST['password']) && isset($_POST['status'])) {
				$user = $_POST['user'];
				$password = $_POST['password'];
				$status = $_POST['status'];
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