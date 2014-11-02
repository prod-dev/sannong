<%--
  Created by IntelliJ IDEA.
  User: Bright Huang
  Date: 10/14/14
  Time: 10:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title></title>
    <link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
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
            <form id="myPasswordForm" role="formPassword" action="updatepassword" method="post">
                <div>
                    <div class="form-group">
                        <label for="oldPassword">旧密码</label>
                        <input type="password" class="form-control" id="oldPassword" name="oldPassword" placeholder="旧密码">
                    </div>
                    <div class="form-group">
                        <label for="newPassword">新密码</label>
                        <input type="password" class="form-control" id="newPassword" name="newPassword" placeholder="新密码">
                    </div>
                    <div class="form-group">
                        <label for="confirmedPassword">确认新密码</label>
                        <input type="password" class="form-control" id="confirmedPassword" name="confirmedPassword" placeholder="确认新密码">
                    </div>
                </div>
                <button type="submit" id="submit" class="btn btn-success">更新</button>
            </form>
            <c:choose>
                <c:when test="${myPasswordAuth == 'passwordChanged'}">
                    <div id="authMsg2"  style="display: block;color: blue">
                        密码修改成功.
                    </div>
                </c:when>

                <c:otherwise>
                </c:otherwise>
            </c:choose>
        </div>
        <div class="col-md-4 column">
        </div>
    </div>
</div>
<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>
</div>
<script src="content/static/js/sannong/mypassword.js"></script>
</body>
</html>
