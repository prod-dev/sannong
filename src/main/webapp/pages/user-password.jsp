<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 11/24/14
  Time: 13:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Benefitting Agriculture - End User Profile</title>

    <link href="css/custom.css" rel="stylesheet" type="text/css">
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="content/static/css/sannong/validation.css" rel="stylesheet">

    <!--[if lt IE 9]>
    <script src="js/html5shiv.min.js"></script>
    <script src="js/respond.min.js"></script>
    <![endif]-->

</head>

<body>
<jsp:include page='header.jsp'/>

<!-- PAGE TITLE -->
<div class="page-title withOutTitle">
</div>
<!-- /PAGE TITLE -->

<!-- CONTENT SECTION -->
<section class="contentSection">
    <div class="container">
        <div class="list-group ">
    <span class="col-sm-3 sidebar equalCol">
          	<h3>菜单</h3>
            <ul class="nav nav-tabs-justified">
                <li>
                    <sec:authorize access="hasRole('ROLE_ADMIN') and isAuthenticated()">
                        <a href="applicants"  id="applicants">用户管理<span></span></a>
                    </sec:authorize>
                    <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
                        <a href="myapplication"  id="myapplication">我的申请<span></span></a>
                    </sec:authorize>
                </li>
                <li><a href="myinfo" id="myinfo">我的信息<span></span></a></li>
                <li><a href="user-password" id="user-password">我的密码<span></span></a></li>
            </ul>
          </span>
        </div>
          <span class="col-sm-9 leftBorder equalCol">
                <form id="myPasswordForm" role="formPassword" action="updatepassword" method="post">
                    <div class="row">
                        <aside class="userFormCol-1" for="oldPassword">旧密码</aside>
                        <aside class="userFormCol-right"><input type="password" class="width-281" id="oldPassword" name="oldPassword" placeholder="旧密码"></aside>
                    </div><br>
                    <div class="row">
                        <aside class="userFormCol-1" for="newPassword">新密码</aside>
                        <aside class="userFormCol-right"><input type="password" class="width-281" id="newPassword" name="newPassword" placeholder="新密码"></aside>
                    </div><br>
                    <div class="row">
                        <aside class="userFormCol-1" for="confirmedPassword">确认新密码</aside>
                        <aside class="userFormCol-right"><input type="password" class="width-281" id="confirmedPassword" name="confirmedPassword" placeholder="确认新密码"></aside>
                    </div><br>
                    <div class="row">
                        <input type="submit" id="submit" value="更新"/>
                    </div>
                </form>
               <c:choose>
                   <c:when test="${myPasswordAuth == 'passwordChanged'}">
                       <div id="authMsg2"  style="display: block;color: blue">
                           密码修改成功.
                       </div>
                   </c:when>
                   <c:when test="${myPasswordAuth == 'oldPasswordAuthFailure'}">
                       <div id="authMsg2"  style="display: block;color: red">
                           旧密码认证失败.
                       </div>
                   </c:when>
                   <c:otherwise>
                   </c:otherwise>
               </c:choose>
          </span>
        </div>
    </div>
</section>
<!-- /CONTENT SECTION -->
<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>
</div>
<script data-main="js/app/pages/mypassword" src="content/static/js/lib/require-2.1.15.js"></script>
</body>
</html>
