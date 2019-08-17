<?php

$username= $_GET["user"];
$html = file_get_contents('http://www.instagram.com/'.$username.'/?__a=1');


$data = json_decode($html, true);
$data=$data['graphql'];
$name = $data['user']["full_name"];
$pic = $data['user']["profile_pic_url_hd"];

$biography = $data['user']["biography"];
$followedby = $data['user']["edge_followed_by"]['count'];
$follows = $data['user']["edge_follow"]['count'];
$media = $data['user']["edge_owner_to_timeline_media"]['count'];
$isprivate = $data['user']["is_private"];


$result = array("name" => $name,"biography" => $biography,"followedby" => $followedby,"follows" => $follows,"isprivate" => $isprivate,"pic" => $pic,"media" => $media );

header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);



?>
