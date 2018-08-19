<?php
	include 'connect.php';

	$param1 = $_POST['param1'];

	$sql = "select * from goods where id='$param1'";

	$result = $conn->query($sql);
	 while ($row = $result->fetch_assoc()){
            $jsonData[] = $row;
        };
    echo json_encode($jsonData,JSON_UNESCAPED_UNICODE);
?>