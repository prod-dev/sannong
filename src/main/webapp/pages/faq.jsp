<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 11/22/14
  Time: 21:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Benefitting Agriculture - FAQ</title>

  <link href="css/custom.css" rel="stylesheet" type="text/css">
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css">

  <script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>

  <script src="js/custom.js"></script>

  <!--[if lt IE 9]>
  <script src="js/html5shiv.min.js"></script>
  <script src="js/respond.min.js"></script>
  <![endif]-->

</head>

<body>

<jsp:include page='header.jsp'/>
<jsp:include page='nav.jsp'/>

<!-- PAGE TITLE -->
<div class="page-title">
  <div class="container">
    <div class="row">
          <span class="col-sm-12">
          	<h2>常见问题</h2>
          </span>
    </div>
  </div>
</div>
<!-- /PAGE TITLE -->

<!-- CONTENT SECTION -->
<section class="contentSection">
  <div class="container">
    <div class="row">
        	<span class="col-sm-3 sidebar equalCol">
          	<h3>类别</h3>
            <ul>
              <li><a href="#">具体内容会在这里<span></span></a></li>
              <li class="active"><a href="#">这仅仅是占<span></span></a></li>
              <li><a href="#">位文字和内容来填<span></span></a></li>
              <li><a href="#">会在这里<span></span></a></li>
              <li><a href="#">具体内容会在这里<span></span></a></li>
              <li><a href="#">这仅仅是占<span></span></a></li>
              <li><a href="#">位文字和内容来填<span></span></a></li>
              <li><a href="#">会在这里<span></span></a></li>
              <li><a href="#">具体内容会在这里<span></span></a></li>
              <li><a href="#">这仅仅是占<span></span></a></li>
              <li><a href="#">位文字和内容来填<span></span></a></li>
              <li><a href="#">会在这里<span></span></a></li>
            </ul>
          </span>
          <span class="col-sm-9 leftBorder equalCol">
          	<div id="accordion" class="panel-group faqAccordion">

              <div class="panel panel-default">
                <div class="panel-heading">
                  <a href="#collapseOne" data-parent="#accordion" data-toggle="collapse" class="panel-toggle">
                    这仅仅是一个虚拟的文字，内容使页面看起来实际
                  </a>
                </div><!-- end panel-heading -->
                <div class="panel-collapse in" id="collapseOne">
                  <div class="panel-body">
                    这仅仅是一个虚拟的文字，内容使页面看起来实际.  这仅仅是一个虚拟的文字，内容使页面看起来实 拟的文字，内容使页面看起来实际
                  </div>
                </div>
              </div>

              <div class="panel panel-default">
                <div class="panel-heading">
                  <a href="#collapseTwo" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                    拟的文字，内容使页面看起来实际
                  </a>
                </div><!-- end panel-heading -->
                <div class="panel-collapse collapse" id="collapseTwo">
                  <div class="panel-body">
                    这仅仅是一个虚拟的文字，内容使页面看起来实际.  这仅仅是一个虚拟的文字，内容使页面看起来实 拟的文字，内容使页面看起来实际
                  </div>
                </div>
              </div>

              <div class="panel panel-default">
                <div class="panel-heading">
                  <a href="#collapseThree" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                    拟的文字，内容使页面看起来实际 拟的文字，内容使页面看起来实际
                  </a>
                </div><!-- end panel-heading -->
                <div class="panel-collapse collapse" id="collapseThree">
                  <div class="panel-body">
                    这仅仅是一个虚拟的文字，内容使页面看起来实际.  这仅仅是一个虚拟的文字，内容使页面看起来实 拟的文字，内容使页面看起来实际
                  </div>
                </div>
              </div>

            </div>
          </span>
    </div>
  </div>
</section>
<!-- /CONTENT SECTION -->

<jsp:include page='footer.jsp'/>

</body>
</html>