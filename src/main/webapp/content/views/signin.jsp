<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
	<link href="content/static/css/sannong/signin.css" rel="stylesheet">
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.1.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.1.js"></script>
	
</head>

<body>
	<div class="container">
		<form id="form" class="form-signin" role="form">
			<h2 class="form-signin-heading">Please sign in</h2>
			<input type="email" class="form-control" placeholder="Email address" required autofocus>
            <span><input type="password" class="form-control" placeholder="Password" required><a href="forgotpassword">Forgot password?</a></span>
            <label class="checkbox"><input type="checkbox" value="remember-me">Remember me </label>
			<button id="submit" class="btn btn-lg btn-primary btn-block">Sign in</button>
		</form>
	</div>
	<!-- /container -->
</body>

<script type="text/javascript">
	$("#submit").click(function(){  
	    //var jsonuserinfo = $.toJSON($('#form').serializeObject()); 
	    var jsonuserinfo = '{"phoneNumber":"15626434343","password":"123456343"}';
	    jQuery.ajax({  
	        type: 'POST',  
	        contentType: 'application/json',  
	        url: 'login',  
	        data: jsonuserinfo,  
	        dataType: 'json',  
	        success: function(data){  
	            alert("success");  
	        },  
	        error: function(){  
	            alert("failed");  
	        }  
	    });  
	});
	
    $.fn.serializeObject = function(){  
        var o = {};  
        var a = this.serializeArray();  
        $.each(a, function(){  
            if (o[this.name]) {  
                if (!o[this.name].push) {  
                    o[this.name] = [o[this.name]];  
                }  
                o[this.name].push(this.value || '');  
            }  
            else {  
                o[this.name] = this.value || '';  
            }  
        });  
        return o;  
    };  
</script>

</html>