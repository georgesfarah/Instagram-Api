
function user(user){
var that=this;that.timeout=5000;
if(user==""){console.log("input is empty", "error");}
else{
	    console.log("Please wait");
  $.ajax({
  	type: "GET",
  	url: "scrap.php", 
  	data: { user: user },
  	dataType: 'json',
  	success: function(result){
       var json=JSON.parse(JSON.stringify(result));

if(json.follows==null && json.followedby==null && json.isprivate==null){console.log(user+" not found");}
else{
console.log("Success "+user);
      that.name=json.name;
       that.bio=json.biography;
       that.followers=json.followedby;
       that.following=json.follows;
       that.isprivate=json.isprivate;
       that.media=json.media;
         that.pic= json.pic;
      
           
}
    },
    error: function(){
console.log("Error!");
}

});


}


}


