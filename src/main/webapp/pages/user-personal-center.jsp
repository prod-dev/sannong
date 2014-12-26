<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Bright Huang
  Date: 11/27/14
  Time: 21:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    -->
    <title>Benefitting Agriculture - Personal Center</title>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="js/lib/html5shiv.min.js"></script>
    <script src="js/lib/respond.min.js"></script>
    <![endif]-->


    <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="css/custom.css" rel="stylesheet" type="text/css">
    <link href="css/validation.css" rel="stylesheet" type="text/css">
    <!--[if IE 8]>
    <link href="css/ie8.css" rel="stylesheet" type="text/css">
    <![endif]-->
</head>

<body>
<jsp:include page='header.jsp'/>

<!-- PAGE TITLE -->
<div class="page-title withOutTitle">
</div>
<!-- /PAGE TITLE -->

<!-- CONTENT SECTION -->
<div class="containerDiv">
    <section class="contentSection">
        <div class="container">
            <div class="row">
                <span class="col-sm-2 sidebar equalCol">
                    <h3>菜单</h3>
                    <ul class="nav nav-tabs-justified" role="tablist">
                        <sec:authorize access="hasRole('ROLE_ADMIN') and isAuthenticated()">
                            <li class="active"><a id="userManagementTab" href="#userManagementTabPane"  role="tab" data-toggle="tab">用户管理<span></span></a></li>
                        </sec:authorize>
                        <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
                            <li class="active"><a id="userAppFormTab" href="#userAppFormTabPane" role="tab" data-toggle="tab">项目申请<span></span></a></li>
                        </sec:authorize>
                        <sec:authorize access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')) and isAuthenticated()">
                            <li><a id="userProfileTab" href="#userProfileTabPane" role="tab" data-toggle="tab">个人信息<span></span></a></li>
                            <li class="hidden"><a id="userProfileEditTab" href="#userProfileTabPane" role="tab" data-toggle="tab">编辑个人信息<span></span></a></li>
                            <li><a id="userPasswordTab" href="#userPasswordTabPane" role="tab" data-toggle="tab">更新密码<span></span></a></li>
                        </sec:authorize>
                    </ul>
                </span>

                <span class="col-sm-10 leftBorder equalCol umList">
                    <div class="tab-content">
                        <sec:authorize access="hasRole('ROLE_ADMIN') and isAuthenticated()">
                            <div id="userManagementTabPane" role="tabpane" class="tab-pane active">
                                <jsp:include page='user-management.jsp'/>
                            </div>
                        </sec:authorize>
                        <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
                            <div id="userAppFormTabPane" role="tabpane" class="tab-pane active">
                                <jsp:include page='user-application-form.jsp'/>
                            </div>
                        </sec:authorize>
                        <sec:authorize access="(hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')) and isAuthenticated()">
                            <div id="userProfileTabPane" role="tabpane" class="tab-pane">
                                <div id="userProfileView">
                                </div>
                                <jsp:include page='user-profile.jsp'/>
                            </div>
                            <div id="userPasswordTabPane" role="tabpane" class="tab-pane">
                                <jsp:include page='user-password.jsp'/>
                            </div>
                        </sec:authorize>
                    </div>
                </span>
            </div>
        </div>
    </section>
</div>
<!-- /CONTENT SECTION -->

<jsp:include page='footer.jsp'/>

<script data-main="js/app/pages/user-personal-center" src="js/lib/require-2.1.15.min.js"></script>
<!--
<script src="js/app/modules/custom.js"></script>
-->
</body>
</html>