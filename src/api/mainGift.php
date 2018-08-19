<?php
	header('Content-Type:application/json;charset=utf-8');

	$filepath='data/main.json';

	$file=fopen($filepath,'r');

	$content=fread($file,filesize($filepath));

	fclose($file);

	$data=json_decode($content);

	$res = array(
		'data' => array_slice($data,0,7),
		);


	echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>