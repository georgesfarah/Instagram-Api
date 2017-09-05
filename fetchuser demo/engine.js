
function fetchuser(user){
var that=this;
if(user==undefined || user.trim()=="" ){console.log("input is empty", "error");}
else{
var url="fetchuser.php?user="+user.trim();

var xhttp = new XMLHttpRequest();


xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {

 if(isJson(xhttp.responseText)){  
      var json=JSON.parse(xhttp.responseText); 
  if(json.isprivate!=null){
      that.userexists=true;
      console.log("Success "+user);
      that.name=json.name;
      that.bio=json.biography;
       that.followers=json.followedby;
       that.following=json.follows;
       that.isprivate=json.isprivate;
       that.media=json.media;
         that.pic= json.pic;
                    }else{console.log(user+" not found");that.userexists=false;}
                              }
else{console.log(user+" not found");that.userexists=false;}

                                              }
    
                                    };
xhttp.open("GET", url, false);
xhttp.send(null);
 
  }

}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
