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

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
