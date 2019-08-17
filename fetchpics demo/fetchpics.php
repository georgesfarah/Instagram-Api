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
$first=true;

$found = 0;
$data='';
while ($tryNext) {
    $tryNext = false;
    $response = file_get_contents($iterationUrl);
    if ($response === false) { break;}
    $data = json_decode($response, true);
    if ($data === null) {break;}

if($first){$data=$data['graphql'];}
else{$data=$data['data'];}

$code=$data['user']['edge_owner_to_timeline_media']['edges'];
foreach($code as $key => $value) {
$found++;
if($found<$limit){
array_push($codes, $value['node']['shortcode']);}
else{break 2;}
}

$page_info=$data['user']['edge_owner_to_timeline_media']['page_info'];
    if ($page_info['has_next_page']) {
        $iterationUrl='https://instagram.com/graphql/query/?query_id=17888483320059182&id='.$data['user']['id'].'&first=12&after='.$page_info['end_cursor'];
        $tryNext = true;
        $first=false;
    }
}

foreach ($codes as $key => $value) {
$response = file_get_contents('http://'.$_SERVER['SERVER_NAME'].':8080/fetchpost.php?url=http://instagram.com/p/'.$value);
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
