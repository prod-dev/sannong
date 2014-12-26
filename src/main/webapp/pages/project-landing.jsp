<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 11/22/14
  Time: 22:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--
  <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
  -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Benefitting Agriculture - Project Application</title>

  <!--
<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  -->
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

<!-- CONTENT SECTION -->
<section class="contentSection fullBgImage">
  <div class="fullBgImageTop"></div>
  <div class="fullBgImageBottom">
    <div class="container">
      <div class="row">
            <span class="col-sm-12 textAlignCenter">
              <h2>现在有些地方盲目推进农村城镇化</h2>
              <p>再次使农民失去了土地，也失去了家园，不但浪费了地方的财力，也加重了农民的负担，这种做法是与科学发展观及可持续发展观的理念相悖的！</p>
              <p>要根本解决好中国的‘三农’问题，必须以可持续发展的视点从宏观上把握，从国家的整体观上来看待，惠泽“三农”的可持续发展项目将从基础设施、</p>
              <p>网络信息、人力资源、产业优化等方面建立十大模块.三农项目为农村提供一个专业的信息化平台，它将是农村的致富工具，在上面可以得到各种帮助如：资金、知识、专家支持等，为农村的发展提供一切可利用的手段。</p>
              <hr/>
              <a href="project-application" class="orange-bt">项目申请</a>
              <ul>
                <li>有更多问题？请看</li>
                <li><a href="faq">常见问题</a></li>
              </ul>
            </span>
      </div>
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
