<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 11/20/14
  Time: 12:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<body>
<!-- HEADER -->
<header>
  <div class="topbar">
    <div class="container">
      <div class="row">
          	<span class="col-sm-12">
              <ul>
                  <!--
                  <li><a href="project-landing">项目主页</a></li>
                  <li><a href="project-application">项目申请</a></li>
                  <li><a href="project-application-completion">申请完成</a></li>
                  <li><a href="user-management">用户管理</a></li>
                  <li><a href="user-application-form">我的项目</a></li>
                  <li><a href="user-profile">个人信息</a></li>
                  <li><a href="user-password">更改密码</a></li>
                  <li><a href="faq">常见问题</a></li>
                  <li><a href="popups">Popups</a></li>
                  -->
                <li><a href="#" data-toggle="modal" data-target="#LoginModel">登录</a></li>
                  <li><a href="j_spring_security_logout">退出</a></li>
              </ul>
            </span>
      </div>
    </div>
  </div>
  <div class="logoContainer">
    <div class="container">
      <div class="row">
            <span class="col-sm-4 logoCol">
              <h1><a href="homepage"><img src="images/logo.png" alt="Benefitting Agriculture"/></a></h1>
            </span>
            <span class="col-sm-4">
            </span>
            <span class="col-sm-4 topNo">
              电话: <span>0800 556 2540</span>
            </span>
          <!--
            <span class="col-sm-4">
              <form class="topSearch">
                <input type="text" placeholder="搜索"/>
                <a href="" class="glyphicon glyphicon-search"></a>
              </form>
            </span>
            -->
      </div>
    </div>
  </div>
    <!--
  <nav>
    <div class="container">
      <div class="row">
          	<span class="col-sm-12">
            	<span class="mobileMenuIcon">菜单<a class="glyphicon glyphicon-align-justify"></a></span>
            	<ul>
                  <li class="current"><a href="my-application">我的项目</a></li>
                  <li><a href="user-profile">我的个人信息</a></li>
                  <li><a href="user-password">更改密码</a></li>
                    <li><a href="user-management">用户管理</a></li>
                    <li><a href="popups">POPUPS</a></li>
                    <li><a href="post-application">Post Application</a></li>
                </ul>
            </span>
      </div>
    </div>
  </nav>
  -->
</header>
<!-- /HEADER -->


<!-- Login Modal -->
<div class="modal fade" id="LoginModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button id="loginModalCloseBtn" type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">忘记密码</h4>
            </div>
            <div class="modal-body">
                <form id="loginForm" role="form" action="j_spring_security_check" method="GET">
                    <span class="errorMsg"><span id="errorMsgContainer"></span></span>
                    <input type="text" id="j_username" name='j_username' placeholder="用户名/电话号码" class="model-input" />
                    <input type="password" id="j_password" name='j_password' placeholder="密码" class="model-input" />
                    <span class="checkboxCustom"><input type="checkbox" name='_spring_security_remember_me'/>自动登录</span>
                    <a href="#" class="leftBorderLink" id="forgotPasswordLink" data-toggle="modal" data-target="#ForgotPasswordModel">忘记密码</a>
                    <input id="loginFormSubmit" type="button" value="登录" class="orange-bt"/>
                </form>
            </div>
        </div>
    </div>
</div>


<!-- Forgot Password Modal -->
<div class="modal fade" id="ForgotPasswordModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="forgotPasswordModalLabel">忘记密码</h4>
            </div>
            <div class="modal-body">
                <form>
                    <span class="errorMsg"><span>Error message shows here</span></span>
                    <input type="text" placeholder="新手机号码" class="model-input" />
                    <input type="text" placeholder="新手机号码" class="model-input-75" />
                    <a href="#" class="white-bt">获取验证码</a>
                    <input type="text" placeholder="新手机号码" class="model-input margin-top-15" />
                    <span class="checkboxCustom"><input type="checkbox"/>自动登录</span>
                    <input type="submit" value="登录" class="orange-bt"/>
                </form>
            </div>
            <div class="modal-footer">
                返回登录页面
            </div>
        </div>
    </div>
</div>


</body>
</html>
