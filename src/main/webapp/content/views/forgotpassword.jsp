<%--
  Created by IntelliJ IDEA.
  User: apple
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
</head>
<body>
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <jsp:include page='navbar.jsp'/>
        </div>
    </div>
    <div class="row clearfix">
        <div class="col-md-3 column">
        </div>
        <div class="col-md-6 column">
            <form class="form-form-horizontal" role="form">
                <div>
                    <div class="form-group  form-inline">
                        <label for="userName">用户名: 的法尔</label>
                        <!--<input type="text" class="form-control" id="userName" placeholder="用户名"> -->
                    </div>
                    <div class="form-group form-inline">
                        <label for="cellPhone">手机号</label>
                            <input type="text" class="form-control" id="cellPhone" placeholder="手机号">
                            <button type="submit" class="btn btn-sm btn-warning">发送新密码</button>
                    </div>
                    <div class="form-group form-inline">
                        <label for="password">新密码</label>
                        <input type="password" class="form-control" id="password" placeholder="新密码">
                    </div>
                </div>

                    <button type="submit" class="btn btn-success">Submit</button>
                    <a href="signin">返回登录页面</a>

            </form>
        </div>
        <div class="col-md-3 column">
        </div>
    </div>
</div>
</body>
</html>
