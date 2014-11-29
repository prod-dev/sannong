<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 11/22/14
  Time: 21:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Benefitting Agriculture - End User Profile</title>
</head>
<body>
    <script id="user-profile-template" type="text/x-handlebars-template">
      <h3>个人信息</h3>
      <form class="userForm" role="form" id="userProfileForm" action="updateUserProfile" method="post">
        <input name="userName" type="hidden" value="{{userProfile.userName}}" >
        <div class="row">
          <aside class="userFormCol-1">姓名</aside>
          <aside class="userFormCol-right">{{userProfile.realName}}</aside>
          <input name="realName" type="hidden" value="{{userProfile.realName}}" >
        </div>
        <div class="row">
          <aside class="userFormCol-1">职位</aside>
          <aside class="userFormCol-right"><input type="text" class="width-172" id="jobTitle" name="jobTitle" placeholder="职务"  value="{{userProfile.jobTitle}}"></aside>
        </div>
        <div class="row">
          <aside class="userFormCol-1">工作单位</aside>
          <aside class="userFormCol-right"><input type="text" class="width-281" id="jobCompany"  name="company" placeholder="工作单位"  value="{{userProfile.company}}"></aside>
        </div>
        <div class="row">
          <aside class="userFormCol-1">单位地址</aside>
          <aside class="userFormCol-right">
            <div class="width-87">
              <select>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div class="width-87">
              <select>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div class="width-87">
              <select>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <input type="text" class="width-273" id="jobAddress" name="companyAddress" placeholder="单位地址"  value="{{userProfile.companyAddress}}">
          </aside>
        </div>
        <div class="row">
          <aside class="userFormCol-1">工作电话</aside>
          <aside class="userFormCol-right"><input type="text" class="width-281" id="deskPhone" name="deskPhone"  placeholder="工作电话"  value="{{userProfile.deskPhone}}"></aside>
        </div>
        <div class="row">
          <aside class="userFormCol-1">电子邮件</aside>
          <aside class="userFormCol-right"><input type="text" class="width-281" id="mailbox"  name="mailbox" placeholder="电子邮箱"  value="{{userProfile.mailbox}}"></aside>
        </div>
        <div class="row">
          <aside class="userFormCol-1">手机号码</aside>
          <aside class="userFormCol-right">
            <span class="font-size-20">{{userProfile.cellphone}}<input name="cellphone" type="hidden" value="{{userProfile.cellphone}}" ></span>
            <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
              <!--
              <a href="#" class="white-bt" data-toggle="modal" data-target="#updateCellphoneModel">更新手机号码</a>
              -->
            <a href="#" class="white-bt"  data-toggle="collapse" data-target="#updateCellphone" aria-expanded="false" aria-controls="#updateCellphone">更新手机号码</a>
            </sec:authorize>
          </aside>
        </div>
        <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
          <div id="updateCellphone" class="collapse">
            <div class="row">
              <aside class="userFormCol-1">新手机号码</aside>
              <aside class="userFormCol-right"><input type="text" class="width-281" id="newCellphone"  name="newCellphone" placeholder="新手机号码"></aside>
              <a href="javascript:void(0)" class="btn btn-default" role="button" id="action-send-code" name="action-send-code">获取验证码</a>
            </div>
            <div class="row">
              <aside class="userFormCol-1">验证码</aside>
              <aside class="userFormCol-right">
                <div class="width-87">
                  <input type="text" id="validationCode" name="validationCode" placeholder="验证码" autocomplete="off"/>
                </div>
              </aside>
            </div>
          </div>
        </sec:authorize>
        <div class="row">
          <input type="button" id="userProfileSubmit" value="提交"/>
          <sec:authorize access="hasRole('ROLE_ADMIN') and isAuthenticated()">
          <a href="#" id="userProfileCancel" class="white-bt">返回</a>
          </sec:authorize>
        </div>
      </form>
    </script>


    <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
      <!-- Update Cellphone Modal -->
      <!--
      <div class="modal fade" id="updateCellphoneModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="changeCellphoneModalLabel">更新手机号码</h4>
            </div>
            <div class="modal-body">
              <form id="updateCellphoneForm" role="form" method="POST">
                <span class="errorMsg"><span>Error message shows here</span></span>
                <input type="text" name='newCellphone' id="newCellphone" placeholder="新手机号码" class="model-input-75" />
                <a href="#" id="sendValidationCodeLink" class="white-bt">获取验证码</a>
                <input type="text" name="validationCode" id="validationCode" placeholder="验证码" class="model-input margin-top-15" />
                <input id="updateCellphoneFormSubmit" type="button" value="更新" class="orange-bt"/>
              </form>
            </div>
          </div>
        </div>
      </div>
      -->
      <!-- /Update Cellphone Modal -->
    </sec:authorize>

</body>
</html>