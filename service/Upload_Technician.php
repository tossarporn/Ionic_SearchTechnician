<?php
include"../config/connect_DB.php";
$return = array();
$datainput = json_encode($_GET) ;
exec("echo {$datainput} >> out.txt");
if (count($_GET) == 13 && isset($_GET['name_store']) && isset($_GET['ref_type']) && isset($_GET['tel'])&& isset($_GET['time_start'])
	&& isset($_GET['time_end'])&& isset($_GET['cost_begin'])&& isset($_GET['home_number'])&& isset($_GET['street'])
	&& isset($_GET['distric'])&& isset($_GET['imaeg_store'])&& isset($_GET['ref_area'])&& isset($_GET['lat'])&& isset($_GET['lng'])
	) {
				
				$name_store = $_GET['name_store']; 
				$ref_type = $_GET['ref_type'];//equipment
				$ref_area = $_GET['ref_area'];
				$home_number = $_GET['home_number'];
				$street = $_GET['street'];
				$distric = $_GET['distric'];
				$imaeg_store = $_GET['imaeg_store'];
				$time_start = $_GET['time_start'];
				$time_end = $_GET['time_end'];
				$tel = $_GET['tel'];
				$cost_begin = $_GET['cost_begin'];
				$lat = $_GET['lat'];
				$lng = $_GET['lng'];	
	}
	
		$select ="SELECT * FROM `technician_store`  WHERE `name_store`='{$name_store}' AND `home_number` = '{$home_number}'";
		if ($res = mysqli_query($connection,$select)) {
			if (mysqli_num_rows($res)!=0) {
				$return['message']='มีผู้ใช้ชื่อร้านค้านี้แล้วครับ';
				$return['status']=false;
			}
			else{
			$insert = "INSERT INTO `technician_store` (`id`, `name_store`, `ref_type`, `ref_area`, `home_number`, `street`, `district`, `img_store`, `time_start`, `time_end`, `tel_technician`, `cost_begin`, `lat`, `lng`) VALUES (NULL, '{$name_store}', 
				'{$ref_type}', '{$ref_area}', '{$home_number}', '{$street}', '{$distric}', '{$imaeg_store}', '{$time_start}', 
				'{$time_end}', '{$tel}', '{$cost_begin}', '{$lat}', '{$lng}');";
			if (mysqli_query($connection,$insert)) {
					$return['message'] = "สร้างร้านค้าสำเร็จ";
					$return['status'] = true;
				}
			}
		}
		
	echo json_encode($return);
	// mysqli_close($connection);
?>