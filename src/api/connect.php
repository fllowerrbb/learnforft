<?php
	// include 'DB.php';

	  $servername = 'localhost';
        $username = 'root';
        $password = '';
        $database = 'orchard';

     $conn = new mysqli($servername, $username, $password, $database);

       // 检测连接
    if ($conn->connect_error) {
    	// 输出信息并结束连接
        die("连接失败: " . $conn->connect_error);
    }
    $conn->set_charset('utf8');

?>