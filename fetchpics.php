<?php
//ini_set('display_errors', 'FALSE');

$user= $_GET["user"]; 
$limit=200;

if(!empty($_GET['limit'])) {
$limit=$_GET['limit'];
}


$profileUrl = "https://www.instagram.com/$user/?__a=1";
$codes=array();$result=array();
$iterationUrl = $profileUrl;
$tryNext = true;

$found = 0;
while ($tryNext) {
    $tryNext = false;
    $response = file_get_contents($iterationUrl);
    if ($response === false) { break;}
    $data = json_decode($response, true);
    if ($data === null) {break;}


$code=$data['user']['media']['nodes'];    
foreach($code as $key => $value) {
$found++;
if($found<=$limit){
array_push($codes, $value['code']);
}
else{break 2;}

}
$page_info=$data['user']['media']['page_info']; 
    if ($page_info['has_next_page']) {
        $iterationUrl = $profileUrl . '&max_id=' . $page_info['end_cursor'];
        $tryNext = true;
    }
}

foreach ($codes as $key => $value) {
$response = file_get_contents('http://'.$_SERVER['SERVER_NAME'].'/fetchpost.php?url=http://instagram.com/p/'.$value);
    if ($response === false) { break;}
    $data = json_decode($response, true);
    if ($data === null) {break;}

array_push($result, $data);
unset($result[$key]['name']);
unset($result[$key]['isprivate']);
}


header('Content-Type: application/json; charset=utf-8');
echo json_encode(array('result' => $result),JSON_UNESCAPED_SLASHES);




?>