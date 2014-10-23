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
     <link href="content/static/css/sannong/myinfo.css" rel="stylesheet">
   <script src="http://code.jquery.com/jquery-2.1.1.js"></script>
	<script src="content/static/js/sannong/myinfo.js?v=201410201404"> </script>
	<script src="content/static/js/sannong/jquery.weebox.js?v=201410211946"></script>
</head>
<body>
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <jsp:include page='navbar.jsp'/>
        </div>
    </div>
    <div class="row clearfix">
        <div class="col-md-3 column"></div>
        <div class="col-md-6 column">
            <form role="form" id="register-form" action="modifyMyinfo" method="post">
                <div>
                    <div class="form-group">
                        <label for="userName">姓名</label>
                        <input type="text"  class="form-control" id="userName" name="realName" placeholder="姓名" value="${myinfo.userName}" >
                        <div class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="jobTitle">职务</label>
                        <input type="input" class="form-control" id="jobTitle" name="jobTitle" placeholder="职务"  value="${myinfo.jobTitle}">
                        <div class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="jobCompany">工作单位</label>
                        <input type="input" class="form-control" id="jobCompany"  name="company" placeholder="工作单位"  value="${myinfo.company}">
                        <div class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="jobAddress">单位地址</label>
                        <input type="input" class="form-control" id="jobAddress" name="companyAddress" placeholder="单位地址"  value="${myinfo.companyAddress}">
                        <div class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="deskPhone">工作电话</label>
                        <input type="input" class="form-control" id="deskPhone" name="deskPhone"  placeholder="工作电话"  value="${myinfo.deskPhone}">
                        <div class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="mailBox">电子邮箱</label>
                        <input type="input" class="form-control" id="mailbox"  name="mailbox" placeholder="电子邮箱"  value="${myinfo.mailbox}">
                        <div class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="cellPhone">手机号码</label>
                        <div>
                            <input type="hidden" id="token_id"   value="10">
                            <input type="hidden" id="token"  value="2379839e12f6f183bf0737ba4f6d1b75">
                            <input type="input" class="input-short" id="cellphone" name="cellphone" placeholder="手机号码" value="${myinfo.cellphone}">
                            <input type="button" id="action-send-code" data-url="regcode" data-type="1" class="btn btn-sm btn-warning"  value="发送验证码">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="validationCode">验证码</label>
                        <div>
                            <input type="input" class="input-short" name="validationcode"  id="validationcode" placeholder="验证码">
                        </div>
                    </div>
                        <div class="errorDiv"></div>
                    </div>
                <div class="errorDiv">${myinfomessage}</div>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
        <div class="col-md-3 column"></div>
    </div>
</div>
<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>
</div>
</body>
</html>
