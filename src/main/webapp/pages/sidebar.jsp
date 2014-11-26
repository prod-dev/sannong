<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 11/26/14
  Time: 13:42
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>
    <span class="col-sm-2 sidebar equalCol">
        <c:if test="${1 < 2}">
            <h3>菜单</h3>
            <ul>
                <sec:authorize access="hasRole('ROLE_ADMIN') and isAuthenticated()">
                    <li class="active"><a href="user-management">用户管理<span></span></a></li>
                </sec:authorize>
                <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
                    <li class="active"><a href="project-application">项目申请<span></span></a></li>
                </sec:authorize>
                <li><a href="user-profile">个人信息<span></span></a></li>
                <li><a href="user-password">更新密码<span></span></a></li>
            </ul>
        </c:if>
    </span>
</body>
</html>
