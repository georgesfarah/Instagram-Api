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
var url=$('#user').val();
if(url==""){$.notify("input is empty", "error");}
else{
	    $.notify("Please wait", "success");
 try{

var template=`<div class="row">
<img style="height: 200px;border-radius: 202px;" src="" class="imgg">
</div>
<div class="row">
   <div class="input-field col s12">
<a class="waves-effect waves-light btn white prev" style="border-radius: 6px;color:black;">Download</a>
</div>
</div>`;

var template2=`  <div class="row">
     <div class="input-field col s3"></div>
 <div class="input-field col s9">
          <input type="text" class="validate valid taggedpeeps"style="text-align: center;color:black"readonly="readonly">
   </div>
</div>`;


 var json=new fetchpost(url);
  
  if(json.urlexists){
      $('form').remove();
 $('#z').css("visibility","visible");
 
       $('#name').val(json.name);
        $('#comments').val(json.comments);
         $('#likes').val(json.likes);
       $('#bio').val(json.cap);
        $('#bio').trigger('autoresize');
       $('#private').val(json.isprivate);

for (var i = 0; i < json.media.length; i++) {
      $('#gallery').append(template);
 if(json.media[i].isvid){
     $(".prev:eq("+i+")").attr('href', json.media[i].url);
     $(".imgg:eq("+i+")").attr('src', json.media[i].pic);
                        }
  else{
   $(".prev:eq("+i+")").attr('href', json.media[i].url);
     $(".imgg:eq("+i+")").attr('src', json.media[i].url);
      }
                                        }

                 }else{$.notify("User not found", "error");}

if(json.tags){
  $('#z').append("<div class='row' style='text-align:center;text-decoration: underline;font-size: 25px;'>Tagged People:</div>");
  for (var i = 0; i < json.tags.length; i++) {
    $('#z').append(template2);
    $('.taggedpeeps:eq('+i+')').val(json.tags[i]);
  };

}

    
}
catch(e){console.log(e.name);}

}

});


});