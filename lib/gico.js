  $(document).ready(function()
{
	//OAuth.initialize('TR_TkYTy3uIqSxOd_7eYDKuJoMk');
	//console.log("Hello,World");
	//OAuth.popup('github', function(err, result) {
  //handle error with err
  //use result.access_token in your API request
   //});
   //未来还要考虑是否启用cookie的情况
	if($.cookie('token')){
		 //alert("right");	
		 if($("input[name=loginbtn]").is(":visible"))
		 {
			 $("input[name=loginbtn]").hide();
			 alert("show");
		 }
		 if($("textarea[name=message]").is(":hidden"))
		 {
		 	$("textarea[name=message]").show();
			//alert("right");
		 }
		 if($("input[name=imageField]").is(":hidden"))
		 {
	     	$("input[name=imageField]").show();
			//alert("show");
		 }
		 
	
		 $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            url: "https://api.github.com/legacy/issues/search/happywen/happywen.github.com/open/Yes",  //这里是网址
            success:function(data)
            {
            	var obj = eval(data);
            	//console.log(data);
            	//alert(obj.issues[0].title);
            	
	            $("<h2>"+obj.issues[0].user+"<br /> </h2>").appendTo("#issuelist");
	            $("<h2><span>Creat at: "+obj.issues[0].created_at+"Update at: "+obj.issues[0].updated_at+"<br /></span></h2>").appendTo("#issuelist");
	            $("<p><strong>"+obj.issues[0].title+"<br /></strong></p>").appendTo("#issuelist");
	            if(obj.issues[0].body != null)
	            {$("<p>"+obj.issues[0].body+"<br /></p>").appendTo("#issuelist");}
	            $("<div id="+"issues"+obj.issues[0].number+">").appendTo("#issuelist");
	            $("</div>").appendTo("#issues"+obj.issues[0].number+"");
                var issuenum = obj.issues[0].number;
        		$.ajax({ 
		            type: "GET",
		            async: false, //把ajax改为同步解决biaoi传递进去的问题
		            contentType: "application/x-www-form-urlencoded",
		            dataType: "json",
		            url: "https://api.github.com/repos/happywen/happywen.github.com/issues/"+issuenum+"/comments",  //这里是网址
		            success:function(data)
		            {
		            	//console.log(data);
		            	var obj = eval(data);
		            	//console.log(biaoi);
		                //console.log(array[biaoi].number);
		            	for(var j=0;j<data.length;j++){
			            	$("<h3>"+obj[j].user.login+"</h3>").appendTo("#issues"+issuenum+"");
			            	$("<h3><span>Creat at: "+obj[j].created_at+"Update at: "+obj[j].updated_at+"<br /></span></h3>").appendTo("#issues"+issuenum+"");
			                $("<p>"+obj[j].body+"<br /></p>").appendTo("#issues"+issuenum+"");
				        	    //$("<p><strong>"+obj[i].title+"<br /></strong></p>").appendTo("#issuelist");
			            }   
		            },
		            timeout:30000, 
		            error: function (XMLHttpRequest, textStatus, errorThrown) {
		            //alert(errorThrown);
		            }
		        });
	   			 $("input[name=imageField]").click(function(){
	             $.ajax({ 
			            type: "POST",
			            async: false, //把ajax改为同步解决biaoi传递进去的问题
			            contentType: "application/x-www-form-urlencoded",
			            dataType: "json",
			            data:JSON.stringify({"body":$("textarea[name=message]").val()}),
			            url: "https://api.github.com/repos/happywen/happywen.github.com/issues/"+issuenum+"/comments?access_token="+$.cookie('token')+"",  //这里是网址
			            success:function(data)
			            {
			            	//alert(data);
			            	var obj = eval(data);
			            	//console.log(obj);
			            	//console.log(obj.user.login);
			            	$("<h3>"+obj.user.login+"</h3>").appendTo("#issuelist");
			            	$("<h3><span>Creat at: "+obj.created_at+"Update at: "+obj.updated_at+"<br /></span></h3>").appendTo("#issuelist");
			                $("<p>"+obj.body+"<br /></p>").appendTo("#issuelist");
			            	//alert("success");
			            },
			            timeout:30000, 
			            error: function (XMLHttpRequest, textStatus, errorThrown) {
			            //alert(errorThrown);
			            }
			        });
	        	 });
            },
            timeout:30000, 
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
            }
        });
	    
	}// 获得cookie)
    else
	{
		 //alert( ); //判断元素显示或隐藏状态 
		 if($("input[name=loginbtn]").is(":hidden"))
		 {
			 $("input[name=loginbtn]").show();
		 }
		 if($("textarea[name=message]").is(":visible"))
		 {
			 $("textarea[name=message]").hide();
		 }
		 if($("input[name=imageField]").is(":visible"))
		 {
			 $("input[name=imageField]").hide();
		 }
         $("input[name=loginbtn]").click(function(){
             //alert("right");
            var token_num;
            OAuth.initialize('TR_TkYTy3uIqSxOd_7eYDKuJoMk');
			//console.log("Hello,World");
			OAuth.popup('github', function(err, result) {
  			//handle error with err
  			//use result.access_token in your API request
  			    token_num = result.access_token;
  			    //alert(token_num);
				$.cookie('token', token_num, {expires: 7});//新建一个cookie 
			});			 
			//alert("right");
      });
	}
});
 	