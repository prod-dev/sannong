<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 10/19/14
  Time: 13:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
     <link href="content/static/css/sannong/myinfo.css" rel="stylesheet">
   <script src="http://code.jquery.com/jquery-2.1.1.js"></script>
	<script src="content/static/js/sannong/myinfo.js?v=201410211111"> </script>
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
        <div class="col-md-3 column">
        </div>
        <div class="col-md-6 column">
            <form class="form-form-horizontal" role="form"  action="confirmpassword" method="post">
                  <div>

                    <div class="form-group form-inline">
                        <label for="cellPhone">手机号</label>
                            <input type="hidden" id="token_id" name="token_id" value="10">
                        <input type="hidden" id="token" name="token" value="2379839e12f6f183bf0737ba4f6d1b75">
                        <input type="input" class="input-short"   id="cellphone" name="cellphone"  placeholder="手机号码" value="${myinfo.cellphone}">
                          <input type="button" id="action-send-code" data-url="regcode" data-type="2" class="btn btn-default"  value="发送新密码">
                         <div class="errorDiv"></div>
                    </div>
                    <div class="form-group form-inline">
                        <label for="password">输入手机收到的新密码, 提交后生效</label>
                    </div>
                    <div class="form-group form-inline">
                        <input type="password" name="password" class="form-control" id="password" placeholder="新密码">
                    </div>
                </div>
					<div class="errorDiv">${forgetPassword}</div>
                    <button type="submit" class="btn btn-success">Submit</button>

            </form>
        </div>
        <div class="col-md-3 column">
        </div>
    </div>
</div>
</body>
</html>
