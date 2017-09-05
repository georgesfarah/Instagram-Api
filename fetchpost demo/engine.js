
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

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
