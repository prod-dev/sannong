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
            <ul class="nav nav-tabs-justified" role="tablist">
                <li class="active"><a href="#1" role="tab" data-toggle="tab">类别1<span></span></a></li>
                <li ><a href="#2"  role="tab" data-toggle="tab">类别2<span></span></a></li>
                <li><a href="#3" role="tab" data-toggle="tab">类别3<span></span></a></li>
                <li><a href="#4" role="tab" data-toggle="tab">类别4<span></span></a></li>
                <li><a href="#5" role="tab" data-toggle="tab">类别5<span></span></a></li>
                <li><a href="#6" role="tab" data-toggle="tab">类别6<span></span></a></li>
                <li><a href="#7" role="tab" data-toggle="tab">类别7<span></span></a></li>
                <li><a href="#8" role="tab" data-toggle="tab">类别8<span></span></a></li>
                <li><a href="#9" role="tab" data-toggle="tab">类别9<span></span></a></li>
                <li><a href="#10" role="tab" data-toggle="tab">类别10<span></span></a></li>
                <li><a href="#11" role="tab" data-toggle="tab">类别11<span></span></a></li>
                <li><a href="#12" role="tab" data-toggle="tab">类别12<span></span></a></li>
            </ul>
          </span>
          <span class="col-sm-9 leftBorder equalCol">
              <div class="tab-content">
                  <div role="tabpane" class="tab-pane active" id="1">
                      <div id="accordion1" class="panel-group faqAccordion">
                          <div class="panel panel-default">
                              <div class="panel-heading">
                                  <a href="#collapse1One" data-parent="#accordion" data-toggle="collapse" class="panel-toggle">
                                      1.这个网站我们都可以上吗？
                                  </a>
                              </div><!-- end panel-heading -->
                              <div class="panel-collapse in" id="collapse1One">
                                  <div class="panel-body">
                                      答：可以我们的网站是对公网开放的，任何人都可以通过个人身份证来进行注册，然后享受上面的服务。
                                  </div>
                              </div>
                          </div>
                          <div class="panel panel-default">
                              <div class="panel-heading">
                                  <a href="#collapse1Two" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                                      2.每个村都可以建立这样的车站吗？
                                  </a>
                              </div><!-- end panel-heading -->
                              <div class="panel-collapse collapse" id="collapse1Two">
                                  <div class="panel-body">
                                      答：不是，要以10个村为一个点建立一个基点设施，对基点设施的选择也有一定要求。
                                  </div>
                              </div>
                          </div>
                          <div class="panel panel-default">
                              <div class="panel-heading">
                                  <a href="#collapse1Three" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                                      3.车站建立需要什么样的要求？
                                  </a>
                              </div><!-- end panel-heading -->
                              <div class="panel-collapse collapse" id="collapse1Three">
                                  <div class="panel-body">
                                      答：通过填写调查问卷，让我们了解你们村的情况，符合我们的要求就可以建立车站设施。
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div role="tabpane" class="tab-pane" id="2">
                      <div id="accordion2" class="panel-group faqAccordion">
                          <div class="panel panel-default">
                              <div class="panel-heading">
                                  <a href="#collapse2One" data-parent="#accordion" data-toggle="collapse" class="panel-toggle">
                                      1.建立这样的平台对我们有什么好处？
                                  </a>
                              </div><!-- end panel-heading -->
                              <div class="panel-collapse in" id="collapse2One">
                                  <div class="panel-body">
                                      答：帮助农村发展，帮助农村提高文化，娱乐，休闲等生活水平，帮助解决留守儿童和老人的问题，提供大量就业机会，帮助农村提升经济水平。
                                  </div>
                              </div>
                          </div>
                          <div class="panel panel-default">
                              <div class="panel-heading">
                                  <a href="#collapse2Two" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                                      2.平台上什么都有吗？
                                  </a>
                              </div><!-- end panel-heading -->
                              <div class="panel-collapse collapse" id="collapse2Two">
                                  <div class="panel-body">
                                      答：只要是对农村有利的服务，我们里面都会有，杜绝不健康的资料出现在平台上，我们会严格审核。
                                  </div>
                              </div>
                          </div>
                          <div class="panel panel-default">
                              <div class="panel-heading">
                                  <a href="#collapse2Three" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                                      3.要以什么样子的方式合作？
                                  </a>
                              </div><!-- end panel-heading -->
                              <div class="panel-collapse collapse" id="collapse2Three">
                                  <div class="panel-body">
                                      答：我们借钱给农村，让农村成立合作社，农村出土地和我们一起合作，不用农村出一分钱，只要提供一定土地和人力我们一起推动农村的发展，帮助农民提高经济水平。
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div role="tabpane" class="tab-pane" id="3"></div>
                  <div role="tabpane" class="tab-pane" id="4"></div>
                  <div role="tabpane" class="tab-pane" id="5"></div>
                  <div role="tabpane" class="tab-pane" id="6"></div>
                  <div role="tabpane" class="tab-pane" id="7"></div>

              </div>
          </span>
        </div>
    </div>
</section>
<!-- /CONTENT SECTION -->

<jsp:include page='footer.jsp'/>

</body>
</html>