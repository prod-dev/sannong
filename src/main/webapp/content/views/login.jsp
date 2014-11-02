<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
	<link href="content/static/css/sannong/login.css" rel="stylesheet">
    <link href="content/static/css/sannong/validation.css" rel="stylesheet">
</head>

<body>
    <div class="container">
        <form id="loginForm" class="form-signin" role="form" action="j_spring_security_check" method="POST">
            <h2 class="form-signin-heading">请登录</h2>
            <input type="text" name='j_username' class="form-control" placeholder="手机号码" autofocus>
            <label></label>
            <span>
            <div id="auth-msg" style="color:red;display:none">验证失败, 请重新输入.</div>
            <input type="password" name='j_password' class="form-control" placeholder="密码">
            <a href="forgotpassword">忘记密码?</a>
            </span>
            <label class="checkbox">
                <input type="checkbox" name='_spring_security_remember_me' > 记住我
            </label>
            <button id="submit" class="btn btn-lg btn-primary btn-block" type="submit" >登录</button>
        </form>
        <div id="auth" status="${authentication}" style="display:none">
        </div>
    </div>
</body>
<!--
<script src="content/static/js/lib/require-2.1.15.js" data-main="content/static/js/sannong/main"></script>
-->
<script src="content/static/js/lib/jquery-2.1.1.min.js"></script>
<script src="content/static/js/lib/bootstrap-3.0.3.min.js"></script>
<script src="content/static/js/lib/jquery.validate-1.13.1.js"></script>
<script src="content/static/js/lib/additional-methods-1.13.1.js"></script>
<script src="content/static/js/lib/messages_zh-1.13.1.js"></script>
<script src="content/static/js/sannong/login/login.js"></script>
</html>