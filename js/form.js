$(document).ready(function(){
    var fields = ["user_name", "user_venue_name", "user_venue_name", "user_city","user_state", "user_email", "user_subject","message"];
 $(".form").submit(function(){
 var error = 0;
 
 $(".form").find(":input").each(function(){
         for(var i = 0; i<fields.length;i++){
             if($(this).attr("name")==fields[i]){
                 if(!$.trim($(this).val())   ){
                     $(this).addClass("formError");
                     error =1;
                 }else{
                     $(this).removeClass("formError");
                     console.log("удаление")
                 }
             }
         } 
    });
    return false;
 });
}); 
