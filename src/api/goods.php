<?php
	header('Content-Type:application/json;charset=utf-8');

	$filepath='data/goods.json';

	$file=fopen($filepath,'r');

	$content=fread($file,filesize($filepath));

	fclose($file);

	$data=json_decode($content);


	echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>