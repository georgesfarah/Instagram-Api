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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fetchpost(user){
var that=this;
if(user==undefined || user.trim()=="" ){console.log("input is empty", "error");}
else{
var url="fetchpost.php?url="+user.trim();

var xhttp = new XMLHttpRequest();


xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

 if(isJson(xhttp.responseText)){ 
      var json=JSON.parse(xhttp.responseText);

    if(json.isprivate !=null){  
          that.urlexists=true;
      console.log("Success "+user);
      that.name=json.name;
      that.isprivate=json.isprivate;
      that.cap=json.cap;
      that.hasmultipics=json.hasmultipics;
      that.likes=json.likes;
      that.comments=json.comments;
      that.media=json.media;
      if(json.tags){that.tags=json.tags;}
                    }else{console.log(user+" not found");that.urlexists=false;}
                                 }
else{console.log(user+" not found");that.urlexists=false;}

                                                  }
    
                                        };
xhttp.open("GET", url, false);
xhttp.send(null);


   
}

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fetchpics(user,limit=200){
var that=this;
if(user==undefined || user.trim()=="" ){console.log("input is empty", "error");}
else{
var url="fetchpics.php?user="+user.trim()+"&limit="+limit;

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       if(isJson(xhttp.responseText)){  
       var json=JSON.parse(xhttp.responseText);
       if(json.result!=null){
        that.userexists=true;
          that.json=json;
            that.result=json.result;
   

    }else{console.log(user+" not found");that.userexists=false;}
    }else{console.log(user+" not found");that.userexists=false;}
    }
};
xhttp.open("GET", url, false);
xhttp.send(null);


   
}

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
