<%--
  Created by IntelliJ IDEA.
  User: Bright Huang
  Date: 10/14/14
  Time: 10:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
    <link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
    <link href="content/static/css/sannong/footer.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <jsp:include page='navbar.jsp'/>
            <div class="jumbotron">
                <h3>谢谢你联系我们，我们的工作人员会尽快和您取得联系。</h3>
                <div>你可以登录我们的网站查询查询申报审批的进度和状态。登录的用户名和密码将会以短信的形式发送给您。如果需要修改您的问卷调查答案，请拨打400-XXX-XXXX联系我们的工作人员.</div>
                <br>
                <div class="text-muted text-center">
                    <a class="btn btn-primary" href="home">返回首页 »</a>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>
</div>
</body>
</html>
