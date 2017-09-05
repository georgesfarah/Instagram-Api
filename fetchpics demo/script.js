var template=`<div class="post">
<div class="row"><a target="_blank" class="imghref" href=""><img class="img"></a></div>

	<div class="row vidrow">
		 <div class="col s3">
       <p>IsVid:</p>
        </div>

 <div class="col s9">
          <input type="text" class="validate valid isvid"style="text-align: center;color:black"readonly="readonly">
        </div>
</div>

</div>`;
var res;
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

  	$('form').remove();
           res=demo.result; 
           var counter=0;
for (var i = 0; i < res.length; i++) {
	// $('.img:eq('+i+')').attr('src',res[i].media);

for (var z = 0; z < res[i].media.length; z++) {
      $('#gallery').append(template);
       $('.isvid:eq('+counter+')').val(res[i].media[z].isvid);
               $(".imghref:eq("+counter+")").attr('href', res[i].media[z].url);
 if(res[i].media[z].isvid){
     $(".img:eq("+counter+")").attr('src', res[i].media[z].pic);
                        }
  else{
     $(".img:eq("+counter+")").attr('src', res[i].media[z].url);
      }
                                counter++;    }

};


                    }
else{ $.notify("User not found", "error");}
    


}

});


});
