<?php
	header('Content-Type:application/json;charset=utf-8');
	
	$path='data/region1.json';
	$file=fopen($path,'r');

	$content=fread($file,filesize($path));

	fclose($file);
	
	$data=json_decode($content);

	echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>