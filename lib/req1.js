$(document).ready(function()
{
	//OAuth.initialize('TR_TkYTy3uIqSxOd_7eYDKuJoMk');
	//console.log("Hello,World");
	//OAuth.popup('github', function(err, result) {
  //handle error with err
  //use result.access_token in your API request
   //});
      $("input[name=imageField]").click(function(){
             //alert("right");
              $.ajax({
              				type:"GET",
                            url:"https://github.com/login/oauth/authorize",
                            data:{client_id:"2e9f8ac6b0cda78b68e0"},
                            error: function(jqXHR, textStatus, errorThrown){ //失败 
									    alert(textStatus+errorThrown); 
							}, 
                            success:function(msg){
								alert(msg); //这里可以
                                
                                }
                            });
			   //$.ajax({
              			//	type:"POST",
                         // url:"https://github.com/login/oauth/access_token",
                          //  data:{client_id:"2e9f8ac6b0cda78b68e0", client_secret:"19e983f90690509cdc288b8585424c8b2a952b44"},
                          //  error: function(jqXHR, textStatus){ //失败 
							//	alert(textStatus); 
							//}, 
                          //  success:function(msg){
							//	alert(msg); //这里可以
                                
                              //  }
                            //});
              //alert("right");
      });
});
 	