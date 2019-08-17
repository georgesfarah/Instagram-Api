<?php


$url= $_GET["url"];
$url=trim($url);
if (substr($url, -1) != '/'){$url=$url.'/';}
if(substr($url, 0, 4) != "http") { $url = 'http://'.$url;}
$html = file_get_contents($url.'?__a=1');

$data = json_decode($html, true);

$name = $data['graphql']['shortcode_media']['owner']["full_name"];
$cap= $data['graphql']['shortcode_media']['edge_media_to_caption']["edges"];
if(array_key_exists(0, $cap)){$cap = $data['graphql']['shortcode_media']['edge_media_to_caption']["edges"]['0']['node']['text'];}
else{$cap=null;}
$likes = $data['graphql']['shortcode_media']['edge_media_preview_like']['count'];
$comments = $data['graphql']['shortcode_media']['edge_media_to_parent_comment']['count'];
$isprivate = $data['graphql']['shortcode_media']['owner']["is_private"];
$multipics=$data['graphql']['shortcode_media'];
$hasmultipics=false;
$media=array();
$taggedpeople=array();
$isvideos=array();
if(array_key_exists('edge_sidecar_to_children', $multipics)){$hasmultipics=true;}


if(!$hasmultipics){
$isvid = $data['graphql']['shortcode_media']['is_video'];

if($isvid){
	$url = $data['graphql']['shortcode_media']['video_url'];
	$pic = $data['graphql']['shortcode_media']['display_url'];
	$result = array("name" => $name,"isprivate" => $isprivate,"media"=>array(array("url" => $url,"isvid" => $isvid,"pic" => $pic)),"cap" => $cap,"likes"=>$likes,"comments"=>$comments);
}
else{
	$url = $data['graphql']['shortcode_media']['display_url'];
	$result = array("name" => $name,"isprivate" => $isprivate,"media"=>array(array("url" => $url,"isvid" => $isvid)),"cap" => $cap,"likes"=>$likes,"comments"=>$comments);
}

}
else{
$multipics=$data['graphql']['shortcode_media']['edge_sidecar_to_children']['edges'];
	foreach ($multipics as $key => $value) {
		if($value['node']['is_video']){array_push($media,array('url' =>$value['node']['video_url'] ,'isvid' =>$value['node']['is_video'],'pic' =>$value['node']['display_url']) );}
		else{array_push($media,array('url' =>$value['node']['display_url'] ,'isvid' =>$value['node']['is_video']) );}
	}


	$result = array("name" => $name,"isprivate" => $isprivate,"media" => $media,"cap" => $cap,"likes"=>$likes,"comments"=>$comments);
}


$tags=$data['graphql']['shortcode_media']['edge_media_to_tagged_user']['edges'];
if(!empty($tags)){
	foreach ($tags as $key => $value) {
	array_push($taggedpeople, $value['node']['user']['username']);
	}
	$result['tags']=$taggedpeople;
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($result);


?>
