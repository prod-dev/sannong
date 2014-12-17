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
  <!--
  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Benefitting Agriculture - End User Profile</title>
  -->
</head>
<body>
    <h3>更新密码</h3>
    <form id="userPasswordForm" role="formPassword" action="user-personal-center/updatePassword" method="post">
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
        <input type="button" id="userPasswordSubmit" value="更新"/>
      </div>
    </form>
</body>
</html>
