<?php
	include 'connect.php';

	// 查找数据库中是否存在同名用户
	$phone =isset( $_POST['phone'])? $_POST['phone']:null;
	$password =isset( $_POST['password'])? $_POST['password']:null;
	
	$sql = "insert into register(phone,password) values('$phone','$password')";

	// 执行sql语句
	$result = $conn->query($sql);


	if($result){
		echo "success";
	}else{
		echo "fail";
	}
  
?>