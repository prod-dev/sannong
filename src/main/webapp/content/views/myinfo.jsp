<%--
  Created by IntelliJ IDEA.
  User: Bright Huang
  Date: 10/14/14
  Time: 10:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
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
        <div class="col-md-2 column">
            <jsp:include page='sidebar.jsp'/>
        </div>
        <div class="col-md-6 column">
            <form role="form" id="myInfoForm" action="updateMyInfo" method="post">
                <jsp:include page='template/userinfo-form-template.jsp'/>
                <div>
                    <input type="button" id="myInfoSubmit" name="myInfoSubmit" class="btn btn-success" value="提交">
                    <a href="applicants" id="return" class="btn btn-primary">返回</a>
                </div>
            </form>
        </div>
        <div class="col-md-4 column"></div>
    </div>
</div>
<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>
</div>
<script data-main="content/static/js/sannong/pages/myinfo" src="content/static/js/lib/require-2.1.15.js"></script>


</body>
</html>