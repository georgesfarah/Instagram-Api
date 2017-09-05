
var res;var ress;
$(document).ready(function(){

$('#user').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    $('#sub').click();
    return false;
  }
});

$('#sub').click(function(){
var username=$('#user').val();
if(username==""){$.notify("input is empty", "error");}
else{
 $.notify("Please wait", "success");

 var demo=new fetchpics(username);
  if(demo.userexists){
           console.log(demo.result);
                    }
else{ $.notify("User not found", "error");}
    


}

});


});
