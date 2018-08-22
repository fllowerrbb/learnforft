<?php
	include 'connect.php';

	$sql = "select * from goods order by price desc";

	$result = $conn->query($sql);
	 while ($row = $result->fetch_assoc()){
            $jsonData[] = $row;
        };
    echo json_encode($jsonData,JSON_UNESCAPED_UNICODE);
?>