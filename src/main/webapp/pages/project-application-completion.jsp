<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 11/22/14
  Time: 21:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Benefitting Agriculture - Post Application</title>

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="js/lib/html5shiv.min.js"></script>
  <script src="js/lib/respond.min.js"></script>
  <![endif]-->

  <link href="css/custom.css" rel="stylesheet" type="text/css">
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
</head>

<body>

<jsp:include page='header.jsp'/>

<!-- PAGE TITLE -->
<div class="page-title">
  <div class="container">
    <div class="row">
          <span class="col-sm-12">
          	<h2>谢谢你联系我们</h2>
          </span>
    </div>
  </div>
</div>
<!-- /PAGE TITLE -->

<!-- CONTENT SECTION -->
<section class="contentSection">
  <div class="container">
    <div class="row">
        	<span class="col-sm-12 textAlignCenter">
          	我们的工作人员会尽快和您取得联系<br/><br/>
            你可以登录我们的网站查询查询申报审批的进度和状态。登录的用户名和密码将会以短信的形式发送给您。<br /><br />
						<em>如果需要修改您的问卷调查答案，请拨打 0800 556 2540 联系我们的工作人员。</em><br /><br />
						<hr/>
            <a href="project-landing" class="orange-bt">返回首页</a>
          </span>
    </div>
  </div>
</section>
<!-- /CONTENT SECTION -->

<jsp:include page='footer.jsp'/>
<script data-main="js/app/pages/project-landing" src="js/lib/require-2.1.15.min.js"></script>
<!--
<script src="js/app/modules/custom.js"></script>
-->
</body>
</html>