<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 11/22/14
  Time: 21:29
  To change this template use File | Settings | File Templates.
--%>
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

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="js/lib/html5shiv.min.js"></script>
  <script src="js/lib/respond.min.js"></script>
  <![endif]-->

  <link href="css/custom.css" rel="stylesheet" type="text/css">
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
   <!--[if IE 8]>
   <link href="css/ie8.css" rel="stylesheet" type="text/css">
   <![endif]-->
</head>

<body>

<jsp:include page='header.jsp'/>

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
              <li class="active"><a href="#1" role="tab" data-toggle="tab">常见问题<span></span></a></li>
              <li ><a href="#2"  role="tab" data-toggle="tab">合作了解<span></span></a></li>
              <li><a href="#3" role="tab" data-toggle="tab">核心问题<span></span></a></li>
            </ul>
          </span>

          <span class="col-sm-9 leftBorder equalCol">
              <div class="tab-content">

                <!-- tabpane 1 -->
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
                          3.平台上什么都有吗？
                        </a>
                      </div><!-- end panel-heading -->
                      <div class="panel-collapse collapse" id="collapse1Three">
                        <div class="panel-body">
                          答：只要是对农村有利的服务，我们里面都会有，杜绝不健康的资料出现在平台上，我们会严格审核。
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
                          1.车站建立需要什么样的要求？
                        </a>
                      </div><!-- end panel-heading -->
                      <div class="panel-collapse in" id="collapse2One">
                        <div class="panel-body">
                          答：通过填写调查问卷，让我们了解你们村的情况，符合我们的要求就可以建立车站设施。
                        </div>
                      </div>
                    </div>

                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <a href="#collapse2Two" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                          2.要以什么样子的方式合作？
                        </a>
                      </div><!-- end panel-heading -->
                      <div class="panel-collapse collapse" id="collapse2Two">
                        <div class="panel-body">
                          答：我们借钱给农村，让农村成立合作社，农村出土地和我们一起合作，不用农村出一分钱，只要提供一定土地和人力我们一起推动农村的发展，帮助农民提高经济水平。
                        </div>
                      </div>
                    </div>

                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <a href="#collapse2Three" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                          3.我们做创业资金怎么来？
                        </a>
                      </div><!-- end panel-heading -->
                      <div class="panel-collapse collapse" id="collapse2Three">
                        <div class="panel-body">
                          答：我们以企业集团来进行担保向银行或者信用机构来进行贷款，农民只需要出事相关证件即可得到一定的贷款。
                        </div>
                      </div>
                    </div>

                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <a href="#collapse2Four" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                          4.需要我们提供什么？
                        </a>
                      </div><!-- end panel-heading -->
                      <div class="panel-collapse collapse" id="collapse2Four">
                        <div class="panel-body">
                          答：一块35亩的土地，一份调查问卷的资料，一部分村干部的人力。
                        </div>
                      </div>
                    </div>


                  </div>
                </div>

                <div role="tabpane" class="tab-pane" id="3">
                  <div id="accordion3" class="panel-group faqAccordion">

                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <a href="#collapse3One" data-parent="#accordion" data-toggle="collapse" class="panel-toggle">
                          1.建立这样的平台对我们有什么好处？
                        </a>
                      </div><!-- end panel-heading -->
                      <div class="panel-collapse in" id="collapse3One">
                        <div class="panel-body">
                          答：帮助农村发展，帮助农村提高文化，娱乐，休闲等生活水平，帮助解决留守儿童和老人的问题，提供大量就业机会，帮助农村提升经济水平。
                        </div>
                      </div>
                    </div>

                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <a href="#collapse3Two" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                          2.企业从我们这边招的员工怎么得到保障？
                        </a>
                      </div><!-- end panel-heading -->
                      <div class="panel-collapse collapse" id="collapse3Two">
                        <div class="panel-body">
                          答：我们企业集团有专门的法务部来处理相关事情，如拖欠工资，无辜辞退等我们将会让律师来为你们讨回公道。
                        </div>
                      </div>
                    </div>

                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <a href="#collapse3Three" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                          3.为我们农村提供的设施我们可以使用吗？
                        </a>
                      </div><!-- end panel-heading -->
                      <div class="panel-collapse collapse" id="collapse3Three">
                        <div class="panel-body">
                          答：可以，公共设施是为村民娱乐休闲准备的可以无偿使用。
                        </div>
                      </div>
                    </div>

                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <a href="#collapse3Four" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                          4.给我们提供的水质量好吗，达到什么样的标准？
                        </a>
                      </div><!-- end panel-heading -->
                      <div class="panel-collapse collapse" id="collapse3Four">
                        <div class="panel-body">
                          答：完全符合国家水质量标准，《生活饮用水卫生标准》（GB 5749-2006）,2012年7月1日开始执行，我们的水质将达到并超过《饮用净水水质标准》(CJ94-2005)的标准，达到直接引用的水质。
                        </div>
                      </div>
                    </div>

                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <a href="#collapse3Five" data-parent="#accordion" data-toggle="collapse" class="panel-toggle collapsed">
                          5.给我们的生活带来什么样的改变？
                        </a>
                      </div><!-- end panel-heading -->
                      <div class="panel-collapse collapse" id="collapse3Five">
                        <div class="panel-body">
                          答：可以让农村的业余生活更加美好，留守儿童可以在三农广场玩耍，老人可以在广场休闲，我们有专门的保安负责安全警卫工作，让农村的信息更加发达，让农民更好的实现自身的价值，让农业现代化，农村信息化，农民国民化。
                        </div>
                      </div>
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
<script data-main="js/app/pages/project-landing" src="js/lib/require-2.1.15.min.js"></script>
<!--
<script src="js/app/modules/custom.js"></script>
-->
</body>
</html>