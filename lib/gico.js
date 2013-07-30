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
		  $("input[name=imageField]").click(function(){
             //alert("right");
             $.ajax({
	            type: "POST",
	            contentType: "application/x-www-form-urlencoded",
	            data:{"title":$("input[name=title]").val(),"body":$("input[name=message]").val()},
	            dataType: "json",
	            url: "https://api.github.com/repos/happywen/happywen.github.com/issues"+"?access_token="+$.cookie("token")+"",  //这里是网址
	            success:function(data)
	            {
	            },
	            timeout:30000, 
	            error: function (XMLHttpRequest, textStatus, errorThrown) {
	            alert(errorThrown);
	            }
	       	 });
			//alert("right");
        });
	
		 $.ajax({
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            url: "https://api.github.com/repos/happywen/happywen.github.com/issues",  //这里是网址
            success:function(data)
            {
            	var obj = eval(data);
            	
            	for(var i=0;i<data.length;i++){
	            	$("<h2>"+obj[i].user.login+"<br /> </h2>").appendTo("#issuelist");
	            	$("<h2><span>Creat at: "+obj[i].created_at+"Update at: "+obj[i].updated_at+"<br /></span></h2>").appendTo("#issuelist");
	                $("<p><strong>"+obj[i].title+"<br /></strong></p>").appendTo("#issuelist");
	                if(obj[i].body != null)
	                {$("<p>"+obj[i].body+"<br /></p>").appendTo("#issuelist");}
	                $("<div id="+"issues"+obj[i].number+">").appendTo("#issuelist");
	                $("</div>").appendTo("#issues"+obj[i].number+"");
	                var array = new Array();
	                array = obj;
	               //var issuenum[i] = obj[i].number;
	                //console.log(array[i].number);
	                var biaoi = i;
            		$.ajax({ 
			            type: "GET",
			            async: false, //把ajax改为同步解决biaoi传递进去的问题
			            contentType: "application/x-www-form-urlencoded",
			            dataType: "json",
			            url: "https://api.github.com/repos/happywen/happywen.github.com/issues/"+array[biaoi].number+"/comments",  //这里是网址
			            success:function(data)
			            {
			            	console.log(data);
			            	var obj = eval(data);
			            	console.log(biaoi);
			                console.log(array[biaoi].number);
			            	for(var j=0;j<data.length;j++){
				            	$("<h2>"+obj[j].user.login+"<br /> </h2>").appendTo("#issues"+array[biaoi].number+"");
				            	$("<h2><span>Creat at: "+obj[j].created_at+"Update at: "+obj[j].updated_at+"<br /></span></h2>").appendTo("#issues"+array[biaoi].number+"");
				                $("<p>"+obj[j].body+"<br /></p>").appendTo("#issues"+array[biaoi].number+"");
					        	    //$("<p><strong>"+obj[i].title+"<br /></strong></p>").appendTo("#issuelist");
				            }
				                $("<li><label for=\"addcobody\">Comment: </label><input id=\"addcobody\" name=\"addcobody\"rows=\"6\" cols=\"50\" > </textarea><br /></li>").appendTo("#issues"+array[biaoi].number+"");
				            	$("<li><input type=\"image\" name=\"addcobtn"+biaoi+"\"id=\"addcobtn"+biaoi+"\"src=\"images/SendBtn.gif\"><br /></li>").appendTo("#issues"+array[biaoi].number+"");
				                $("input[name=addcobtn"+biaoi+"]").click(function(){
					             $.ajax({
						            type: "POST",
						            async: false, //把ajax改为同步解决biaoi传递进去的问题
						            contentType: "application/x-www-form-urlencoded",
						            data:{"body":$("input[name=addcobody]").val()},
						            dataType: "json",
						            url: "https://api.github.com/repos/happywen/happywen.github.com/issues/"+array[biaoi].number+"/comments"+"?access_token="+$.cookie("token")+"",  //这里是网址
						            success:function(data)
						            {
						            },
						            timeout:30000, 
						            error: function (XMLHttpRequest, textStatus, errorThrown) {
						            alert(errorThrown);
						            }
						       	 });
      							});
			            },
			            timeout:30000, 
			            error: function (XMLHttpRequest, textStatus, errorThrown) {
			            //alert(errorThrown);
			            }
			        });
            	}
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
 	