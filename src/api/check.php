<?php
	include 'connect.php';

	
	$phone =isset( $_POST['phone'])? $_POST['phone']:null;
	$password =isset( $_POST['password'])? $_POST['password']:null;
	
	$sql = "select * from register where phone='$phone' AND password='$password'";
	

	// 执行sql语句
	$result = $conn->query($sql);
	

	if($result->num_rows>0){
		echo "true";
	}else{
		echo "flase";
	}
  
?>