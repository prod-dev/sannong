<%--
  Created by IntelliJ IDEA.
  User: Bright Huang
  Date: 10/14/14
  Time: 9:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
    <link href="content/static/css/sannong/validation.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <jsp:include page='navbar.jsp'/>
        </div>
    </div>
    <div class="row clearfix">
        <div class="col-md-8 column">
           <form id="applicationForm" role="form" action="apply" method="post">
               <div id="questionnaire">
                   <script id="question-template-checkbox" type="text/x-handlebars-template">
                       <div class="J_group_choice">
                           <h5>{{fromOne}}. {{questionContent}}</h5>
                           <label class="checkbox-inline">
	                           <input type="checkbox" name="answers[{{fromZero}}]" value="{{questionId}}:a"> {{option1}}
                           </label>
                           <label class="checkbox-inline">
                               <input type="checkbox" name="answers[{{fromZero}}]" value="{{questionId}}:b"> {{option2}}
                           </label>                 	
                           <label class="checkbox-inline">
                               <input type="checkbox" name="answers[{{fromZero}}]" value="{{questionId}}:c"> {{option3}}
	                       </label>
                           <label class="checkbox-inline">
                               <input type="checkbox" name="answers[{{fromZero}}]" value="{{questionId}}:d"> {{option4}}
	                       </label>
                           <label class="checkbox-inline">
                               <input type="checkbox" name="answers[{{fromZero}}]"  value="{{questionId}}:e"> {{option5}}
	                       </label>
                       </div>
                  </script>
                  <script id="question-template-radio" type="text/x-handlebars-template">
					    <div class="J_group_choice">
					        <h5>{{fromOne}}. {{questionContent}}</h5>
					        <label class="radio-inline">
					            <input type="radio" name="answers[{{fromZero}}]" value="{{questionId}}:a"> {{option1}}
					        </label>
					        <label class="radio-inline">
					            <input type="radio" name="answers[{{fromZero}}]" value="{{questionId}}:b"> {{option2}}
					        </label>
					        <label class="radio-inline">
					            <input type="radio" name="answers[{{fromZero}}]" value="{{questionId}}:c"> {{option3}}
					        </label>
					        <label class="radio-inline">
					            <input type="radio" name="answers[{{fromZero}}]" value="{{questionId}}:d"> {{option4}}
					        </label>
					        <label class="radio-inline">
					            <input type="radio" name="answers[{{fromZero}}]"  value="{{questionId}}:e"> {{option5}}
					        </label>
					    </div>
                  </script>
               </div>
               <hr>
               <div class="row">
                   <div class="col-xs-1 col-sm-1"></div>
                   <div class="col-xs-10 col-sm-10">
                       <div>
                           <div class="form-group">
                               <input type="text" class="form-control" id="userRealName" name="applicant.realName" placeholder="姓名">
                           </div>
                           <div class="form-group">
                               <input type="text" class="form-control" id="jobTitle" name="applicant.jobTitle" placeholder="职务">
                           </div>
                           <div class="form-group">
                               <input type="text" class="form-control" id="company" name="applicant.company" placeholder="工作单位">
                           </div>
                           <div class="form-group form-inline">
                                <select id="provinceSelect" class="form-control" name="applicant.companyProvince" >
                               </select>
                               <select id="citySelect" class="form-control" name="applicant.companyCity">
                               </select>
                               <select id="districtSelect" class="form-control" name="applicant.companyDistrict">
                               </select>
                               <input type="text" class="form-control" id="jobAddress" name="applicant.companyAddress" placeholder="单位地址">
                           </div>
                           <div class="form-group">
                               <input type="text" class="form-control" id="deskPhone" name="applicant.deskPhone" placeholder="工作电话">
                           </div>
                           <div class="form-group">
                               <input type="text" class="form-control" id="mailbox" name="applicant.mailbox" placeholder="电子邮箱">
                                <div class="errorDiv"></div>
                           </div>
                           <div class="form-group form-inline">
                               <input type="text" class="form-control" id="cellphone" name="applicant.cellphone" placeholder="手机号码" autocomplete="off">
                               <input  type="button" id="action-send-code" name="action-send-code" data-url="regcode" data-type="0" class="btn btn-sm btn-warning" value="获取验证码">
                               <input type="text" class="form-control" id="validationCode" name="sms.smsValidationCode"  disabled="true"  placeholder="验证码" autocomplete="off">
                               <label id="errorDiv" class="error"></label>
                           </div>
                       </div>

                       <button type="button" id="applicationSubmit" class="btn btn-default" disabled="disabled">提交</button>

                       <!-- Button trigger modal -->
                       <button type="button" id="myModalTrigger" class="btn btn-primary" data-toggle="modal" data-target="#myModal" style="display:none">
                           提交
                       </button>

                       <!-- Modal -->
                       <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                           <div class="modal-dialog">
                               <div class="modal-content">
                                   <div class="modal-header">
                                       <button type="button" class="close" data-dismiss="modal">
                                           <span aria-hidden="true">&times;</span>
                                           <span class="sr-only">关闭</span>
                                       </button>
                                       <h4 class="modal-title" id="myModalLabel">提示</h4>
                                   </div>
                                   <div class="modal-body">
                                       是否确认提交?
                                   </div>
                                   <div class="modal-footer">
                                       <button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
                                       <button type="submit" id="confirmedSubmit" class="btn btn-primary">提交</button>

                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div class="col-xs-1 col-sm-1"></div>
               </div>
            </form>
            <br>
            <div>
                <p>如果需要修改问卷调查的答案, 请致电免费电话400-XXXX-XXXX联系我们的工作人员.</p>
            </div>
        </div>
        <div class="col-md-4 column">
            <dl>
                <dt>1.这个网站我们都可以上吗</dt>
                <dd>答：可以我们的网站是对公网开放的，任何人都可以通过个人身份证来进行注册，然后享受上面的服务。</dd>

                <dt>2.每个村都可以建立这样的车站吗？</dt>
                <dd>答：不是，要以10个村为一个点建立一个基点设施，对基点设施的选择也有一定要求。</dd>

                <dt>3.车站建立需要什么样的要求？</dt>
                <dd>答：通过填写调查问卷，让我们了解你们村的情况，符合我们的要求就可以建立车站设施。</dd>

                <dt>4.建立这样的平台对我们有什么好处？</dt>
                <dd>答：帮助农村发展，帮助农村提高文化，娱乐，休闲等生活水平，帮助解决留守儿童和老人的问题，提供大量就业机会，帮助农村提升经济水平。</dd>

                <dt>5.平台上什么都有吗？</dt>
                <dd>答：只要是对农村有利的服务，我们里面都会有，杜绝不健康的资料出现在平台上，我们会严格审核。</dd>
            </dl>
            <a href="faq">更多问题 >></a>
        </div>
    </div>
</div>
<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>
</div>
<script data-main="content/static/js/sannong/pages/projectapplication" src="content/static/js/lib/require-2.1.15.js"></script>

</body>
</html>