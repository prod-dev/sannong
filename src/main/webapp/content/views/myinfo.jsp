<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 10/14/14
  Time: 10:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
    <title></title>
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
            <div class="list-group">
                <a href="#" class="list-group-item disabled">
                    Cras justo odio
                </a>
                <a href="#" class="list-group-item">Dapibus ac facilisis in</a>
                <a href="#" class="list-group-item">Morbi leo risus</a>
                <a href="#" class="list-group-item">Porta ac consectetur ac</a>
                <a href="#" class="list-group-item">Vestibulum at eros</a>
            </div>
        </div>
        <div class="col-md-7 column">
            <form role="form">
                <div>
                    <div class="form-group">
                        <label for="userName">姓名</label>
                        <input type="text" class="form-control" id="userName" placeholder="姓名">
                    </div>
                    <div class="form-group">
                        <label for="jobTitle">职务</label>
                        <input type="input" class="form-control" id="jobTitle" placeholder="职务">
                    </div>
                    <div class="form-group">
                        <label for="jobCompany">工作单位</label>
                        <input type="input" class="form-control" id="jobCompany" placeholder="工作单位">
                    </div>
                    <div class="form-group">
                        <label for="jobAddress">单位地址</label>
                        <input type="input" class="form-control" id="jobAddress" placeholder="单位地址">
                    </div>
                    <div class="form-group">
                        <label for="deskPhone">工作电话</label>
                        <input type="input" class="form-control" id="deskPhone" placeholder="工作电话">
                    </div>
                    <div class="form-group">
                        <label for="mailBox">电子邮箱</label>
                        <input type="input" class="form-control" id="mailBox" placeholder="电子邮箱">
                    </div>
                    <div class="form-group">
                        <label for="cellPhone">手机号码</label>
                        <input type="input" class="form-control" id="cellPhone" placeholder="手机号码">
                        <button type="button" class="btn btn-default">发送验证码</button>
                    </div>
                    <div class="form-group">
                        <label for="validationCode">验证码</label>
                        <input type="input" class="form-control" id="validationCode" placeholder="验证码">
                    </div>
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
</div>
</body>
</html>
