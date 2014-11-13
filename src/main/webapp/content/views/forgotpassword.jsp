<%--
  Created by IntelliJ IDEA.
  User: Bright Huang
  Date: 10/19/14
  Time: 13:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
    <link href="content/static/css/sannong/myinfo.css" rel="stylesheet">
    <link href="content/static/css/sannong/validation.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <jsp:include page='navbar.jsp'/>
        </div>
    </div>
    <div class="row clearfix">
        <div class="col-md-4 column"></div>
        <div class="col-md-6 column">
            <form  id="forgotPasswordForm" role="form" action="j_spring_security_check" method="GET">
                <div  class="form-group">
                    <label for="realName">姓名</label>
                    <div>
                        <input type="text" name="realName" class="input-short"  id="realName" placeholder="姓名">
                    </div>
                </div>
                <div class="form-group">
                    <label for="cellPhone">手机号</label>
                    <div>
                        <input type="text" class="input-short" id="cellphone" name="j_username" placeholder="手机号码" value="${myinfo.cellphone}">
                        <input type="hidden" id="token_id" name="token_id" value="10">
                        <input type="hidden" id="token" name="token" value="2379839e12f6f183bf0737ba4f6d1b75">
                        <button type="button" id="action-send-code" data-url="regcode" data-type="2" class="btn btn-sm btn-warning">发送新密码</button>
                        <div class="errorDiv"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">新密码</label>
                    <div>
                        <input type="password" name="j_password" class="input-short" id="password" placeholder="新密码">
                    </div>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-success" id="login">登录</button>
                    <a href="login"> 返回登录页面</a>
                </div>

                <div class="errorDiv" style="display: none" status="${forgetPassword}"></div>
            </form>

        </div>
        <div class="col-md-2 column"></div>
    </div>
</div>
<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>

</div>
<script data-main="content/static/js/sannong/pages/forgotpassword" src="content/static/js/lib/require-2.1.15.js"></script>

</body>
</html>
