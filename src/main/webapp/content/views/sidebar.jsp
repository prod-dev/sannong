<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 10/24/14
  Time: 8:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>
<div class="list-group ">
    <a href="#" class="list-group-item disabled">
        我的账户
    </a>
    <sec:authorize access="hasRole('ROLE_ADMIN') and isAuthenticated()">
        <a href="applicants" class="list-group-item ">用户管理</a>
    </sec:authorize>
    <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
        <a href="myapplication" class="list-group-item ">我的申请</a>
    </sec:authorize>
    <a href="myinfo" class="list-group-item">我的信息</a>
    <a href="mypassword" class="list-group-item">我的密码</a>
</div>

</body>
</html>
