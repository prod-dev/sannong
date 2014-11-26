<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 11/22/14
  Time: 21:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Benefitting Agriculture - End Users Project Application Form</title>

  <link href="css/custom.css" rel="stylesheet" type="text/css">
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
  <link href="css/validation.css" rel="stylesheet">
  
  <script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>

  <script src="js/custom.js"></script>
  <script src="js/select.js"></script>
  
  <script data-main="js/app/pages/myapplication" src="js/lib/require-2.1.15.js"></script>

  <!--[if lt IE 9]>
  <script src="js/html5shiv.min.js"></script>
  <script src="js/respond.min.js"></script>
  <![endif]-->

</head>

<body>

<jsp:include page='header.jsp'/>

<!-- PAGE TITLE -->
<div class="page-title withOutTitle">
</div>
<!-- /PAGE TITLE -->

<!-- CONTENT SECTION -->
<section class="contentSection">
  <div class="container">
    <div class="row">
        <jsp:include page='sidebar.jsp'/>
          <span class="col-sm-9 leftBorder equalCol">
						<!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active"><a id="q1" href="javascript:void(0)" role="tab" data-toggle="tab">问卷题集</a></li>
              <li role="presentation"><a id="q2" href="javascript:void(0)" role="tab" data-toggle="tab">问卷题集二</a></li>
              <li role="presentation"><a id="q3" href="javascript:void(0)" role="tab" data-toggle="tab">问卷题集三</a></li>
              <li role="presentation"><a id="q4" href="javascript:void(0)" role="tab" data-toggle="tab">问卷题集四</a></li>
              <li role="presentation"><a id="q5" href="javascript:void(0)" role="tab" data-toggle="tab">问卷题集五</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="1">
                <ul class="steps">
                  <li class="active">
                    <span class="no">1</span>
                    <span class="stepHeading">问卷题集-</span>
                  </li>
                  <li>
                    <span class="no">2</span>
                    <span class="stepHeading">问卷题集-</span>
                  </li>
                  <li>
                    <span class="no">3</span>
                    <span class="stepHeading">问卷题集-</span>
                  </li>
                  <li>
                    <span class="no">4</span>
                    <span class="stepHeading">问卷题集-</span>
                  </li>
                  <li>
                    <span class="no">5</span>
                    <span class="stepHeading">问卷题集-</span>
                  </li>
                </ul>
                <div id="submitStatus" class="brown-bg">项目状态：<div>请完成所有问卷调查，然后我们的工作人员会第一时间联系您。</div></div>
                <ul class="step-1-listing">
	                <form id="answerForm" class="projectAppForm" role="form" action="updateAnswersAndComment" method="post">
		                <div id="questionnaire"></div>
		                <input type="hidden" name="answerStatus" id="answerStatus" > 
		                <input type="hidden" name="questionnaireNo" id="questionnaireNo" >
		            </form>
                </ul>
                <div id="questionnaireStatus" class="light-gray-txt" style="display:none">
                  如果需要修改问卷调查的答案，请致电免费电话
                  400-XXXX-XXXX联系我们的工作人员
                </div>
                
                <div id="buttonGroup" class="float-right step-1-bts">
                  <a id="save" href="javascript:void(0);" class="orange-bt-small">保存</a>
                  <a id="submit" href="javascript:void(0);" class="orange-bt-small">提交</a>
                </div>
              </div>
              <!-- Button trigger modal -->
              <button type="button" id="myModalTrigger" class="btn btn-primary" data-toggle="modal" data-target="#myModal" style="display:none">提交</button>
              <div class="modal fade in" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	            <div class="modal-dialog">
	                <div class="modal-content">
	                     <div class="modal-header">
	                         <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
	                         <h4 class="modal-title" id="myModalLabel">提示</h4>
	                     </div>
	                     <div class="modal-body">提交后即不可以再修改。如要修改，需要电话联系我们的工作人员。你确定提交吗？</div>
	                     <div class="modal-footer">
	                         <button id="return" type="button" class="btn btn-default" data-dismiss="modal">返回</button>
	                         <button type="submit" id="dialogSubmit" class="btn btn-success">提交</button>
	                     </div>
	                </div>
	            </div>
              </div>
              <div role="tabpanel" class="tab-pane" id="2">Tab2</div>
              <div role="tabpanel" class="tab-pane" id="3">Tab3</div>
              <div role="tabpanel" class="tab-pane" id="4">Tab4</div>
              <div role="tabpanel" class="tab-pane" id="5">Tab5</div>
            </div>
          </span>
    </div>
  </div>
</section>
<!-- /CONTENT SECTION -->

<!-- FOOTER -->
<footer>
  <div class="container">
    <div class="row">
          <span class="col-sm-5 copyright">
            Copyright © 2000-2015 XXXX.com. All Rights Reserved. B2-20052010-6
          </span>
          <span class="col-sm-7">
            <ul>
              <li><a href="#">关于我们</a></li>
              <li><a href="#">联系我们</a></li>
              <li><a href="#">网站地图</a></li>
              <li><a href="#">免责条款</a></li>
              <li><a href="#">应用服务</a></li>
              <li><a href="#">招聘信息</a></li>
            </ul>
          </span>
    </div>
  </div>
  <div class="logosRow">
    <img src="images/footer-logos.jpg"/>
  </div>
</footer>
<!-- /FOOTER -->

<script id="question-template-checkbox" type="text/x-handlebars-template">
  <li class="J_group_choice">
    {{fromOne}}. {{questionContent}}
    <div class="checkboxRow">
        <span class="checkboxCustom"><input type="checkbox" name="answers[{{fromZero}}]" value="{{questionId}}:a"><label>{{option1}}</label></span>
        <span class="checkboxCustom"><input type="checkbox" name="answers[{{fromZero}}]" value="{{questionId}}:b"><label>{{option2}}</label></span>
        <span class="checkboxCustom"><input type="checkbox" name="answers[{{fromZero}}]" value="{{questionId}}:c"><label>{{option3}}</label></span>
        <span class="checkboxCustom"><input type="checkbox" name="answers[{{fromZero}}]" value="{{questionId}}:d"><label>{{option4}}</label></span>
        <span class="checkboxCustom"><input type="checkbox" name="answers[{{fromZero}}]" value="{{questionId}}:e"><label>{{option5}}</label></span>
    </div>
  </li>
</script>
<script id="question-template-radio" type="text/x-handlebars-template">
  <li class="J_group_choice">
    {{fromOne}}. {{questionContent}}
    <div class="radioRow">
      <span class="radioCustom"><input type="radio" name="answers[{{fromZero}}]" value="{{questionId}}:a"><label>{{option1}}</label></span>
      <span class="radioCustom"><input type="radio" name="answers[{{fromZero}}]" value="{{questionId}}:b"><label>{{option2}}</label></span>
      <span class="radioCustom"><input type="radio" name="answers[{{fromZero}}]" value="{{questionId}}:c"><label>{{option3}}</label></span>
      <span class="radioCustom"><input type="radio" name="answers[{{fromZero}}]" value="{{questionId}}:d"><label>{{option4}}</label></span>
      <span class="radioCustom"><input type="radio" name="answers[{{fromZero}}]" value="{{questionId}}:e"><label>{{option5}}</label></span>
    </div>
  </li>
</script>
</body>
</html>
