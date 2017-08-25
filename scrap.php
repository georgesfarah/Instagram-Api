
<?php
require_once 'detect.php';

$username= $_GET["user"]; 
$html = file_get_contents('http://www.instagram.com/'.$username.'/?__a=1');


$data = json_decode($html, true);
$name = $data['user']["full_name"];
$pic = $data['user']["profile_pic_url_hd"];
$pic = str_replace('/s320x320', '', $pic) ;

$biography = $data['user']["biography"];
$followedby = $data['user']["followed_by"]['count'];
$follows = $data['user']["follows"]['count'];
$media = $data['user']["media"]['count'];
$isprivate = $data['user']["is_private"];


$result = array("name" => $name,"biography" => $biography,"followedby" => $followedby,"follows" => $follows,"isprivate" => $isprivate,"pic" => $pic,"media" => $media );

header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);


$myFile = "log.txt";
$fh = fopen($myFile, 'a') or die("can't open file");
$ip=Detect::ip();
  $clientDetails = json_decode(file_get_contents("http://ipinfo.io/$ip/json"));

$stringData = $username." ,date: ".date("d-m-Y H:i:sa")." ,ip: ".$ip." ,org: ".Detect::ipOrg()." ,os: ".Detect::os()." ,browser: ".Detect::browser()." ,brand: ".Detect::brand()." ,loc: ".$clientDetails->loc."\n";
fwrite($fh, $stringData);
fclose($fh);

?>
