<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 11/22/14
  Time: 21:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Benefitting Agriculture - User Management List Page</title>
</head>

<body>
	<h3 id="user-management-title">
		<span>用户管理</span> <a href="javascript:void(0);"
			class="orange-bt-small float-right" data-toggle="modal"
			data-target="#exportModal">导出问卷调查结果</a>
	</h3>

	<div id="exportModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabelTitle">确定导出问卷调查结果?</h4>
				</div>
				<div class="buttonsRow">
					<button type="button" class="white-bt" data-dismiss="modal">取消</button>
					<a href="javascript:void(0)" class="orange-bt meta-event-source" meta-event-handler="userManagement:exportCSV" id="exportCSV">确定</a>
				</div>
			</div>
		</div>
	</div>

	<div id="userManagementTable" >
		<div class="searchRow">
			<div class="left">
				<label>查询条件</label>
				<div class="width-97">
					<select id="searchKey" name="searchKey">
						<option value="姓名">姓名</option>
						<option value="手机号">手机号</option>
						<option value="工作单位">工作单位</option>
						<option value="职位">职位</option>
						<option value="电子邮箱">电子邮箱</option>
						<option value="单位地址">单位地址</option>
					</select>
				</div>
				<div class="width-152">
					<input id="searchValue" name="searchValue" type="text">
				</div>
			</div>
			<div class="right">
				<label>地址</label>
				<div class="width-152" id="provinceQuerySelectDiv">
					<select id="provinceQuerySelect" name="provinceQuerySelect">
						<option value="">省/直辖市</option>
						<option value="1">北京市</option>
						<option value="2">天津市</option>
						<option value="3">河北省</option>
						<option value="4">山西省</option>
						<option value="5">内蒙古自治区</option>
						<option value="6">辽宁省</option>
						<option value="7">吉林省</option>
						<option value="8">黑龙江省</option>
						<option value="9">上海市</option>
						<option value="10">江苏省</option>
						<option value="11">浙江省</option>
						<option value="12">安徽省</option>
						<option value="13">福建省</option>
						<option value="14">江西省</option>
						<option value="15">山东省</option>
						<option value="16">河南省</option>
						<option value="17">湖北省</option>
						<option value="18">湖南省</option>
						<option value="19">广东省</option>
						<option value="20">广西壮族自治区</option>
						<option value="21">海南省</option>
						<option value="22">重庆市</option>
						<option value="23">四川省</option>
						<option value="24">贵州省</option>
						<option value="25">云南省</option>
						<option value="26">西藏自治区</option>
						<option value="27">陕西省</option>
						<option value="28">甘肃省</option>
						<option value="29">青海省</option>
						<option value="30">宁夏回族自治区</option>
						<option value="31">新疆维吾尔自治区</option>
						<option value="32">台湾</option>
						<option value="33">香港特别行政区</option>
						<option value="34">澳门特别行政区</option>
					</select>
				</div>
				<div class="width-152" id="cityQuerySelectDiv">
					<select id="cityQuerySelect" name="cityQuerySelect">
						<option value="">市</option>
					</select>
				</div>
				<div class="width-152" id="districtQuerySelectDiv">
					<select id="districtQuerySelect" name="districtQuerySelect">
						<option value="">县/市辖区</option>
					</select>
				</div>
				<a id="retrieve" href="javascript:void(0);" class="glyphicon glyphicon-search meta-event-source" meta-event-handler="userManagement:retrieve"></a>
			</div>
		</div>

		<ul class="umListGrid">
			<li class="head">
				<div class="col-small">姓名</div>
				<div class="col-small">注册日期</div>
				<div class="col-small">手机号码</div>
				<div class="col-large">工作单位</div>
				<div class="col-small">职位</div>
				<div class="col-medium">电子邮箱</div>
				<div class="col-small"></div>
			<li>
				<div id="userList"></div>
			</li>
		</ul>
		<ul id="pagination" class="customPagination">
			<li><a id="previous" href="javascript:void(0);" class="bt back meta-event-source" meta-event-handler="userManagement:previous"></a>
			</li>
			<li><label id="currentPage">1</label>/<label id="totalPage">6</label>
			</li>
			<li><a id="next" href="javascript:void(0);" class="bt next activeBt meta-event-source" meta-event-handler="userManagement:next"></a>
			</li>
		</ul>
		<input type="hidden" id="cellphone">
	</div>

	<div id="userProfileEditView">
		<!-- user-profile-template.jsp will be added or removed at here. -->
	</div>
	<jsp:include page='user-profile.jsp' />

	<div id="questionnaireTable" style="display:none">

		<div id="userTextShow" style="display:none; float:right; text-align:right">
			<div style="float:left;color:#F75000" id="userRealName"></div>
			<div style="float:left">的调查问卷答案</div>
		</div>

		<ul class="nav nav-tabs" role="tablist" id="questionnaireTab">
			<li role="presentation" class="active"><a id="q1" href="javascript:void(0)" role="tab" data-toggle="tab" class="meta-event-source" meta-event-handler="userManagement:q1">问卷题集一</a></li>
			<li role="presentation"><a id="q2" href="javascript:void(0)" role="tab" data-toggle="tab" class="meta-event-source" meta-event-handler="userManagement:q2">问卷题集二</a></li>
			<li role="presentation"><a id="q3" href="javascript:void(0)" role="tab" data-toggle="tab" class="meta-event-source" meta-event-handler="userManagement:q3">问卷题集三</a></li>
			<li role="presentation"><a id="q4" href="javascript:void(0)" role="tab" data-toggle="tab" class="meta-event-source" meta-event-handler="userManagement:q4">问卷题集四</a></li>
			<li role="presentation"><a id="q5" href="javascript:void(0)" role="tab" data-toggle="tab" class="meta-event-source" meta-event-handler="userManagement:q5">问卷题集五</a></li>
		</ul>
		<div class="tab-content">
			<ul class="steps">
				<li class="active"><span class="no">1</span> <span class="stepHeading">问卷题集一</span>
				</li>
				<li><span class="no">2</span> <span class="stepHeading">问卷题集二</span>
				</li>
				<li><span class="no">3</span> <span class="stepHeading">问卷题集三</span>
				</li>
				<li><span class="no">4</span> <span class="stepHeading">问卷题集四</span>
				</li>
				<li><span class="no">5</span> <span class="stepHeading">问卷题集五</span>
				</li>
			</ul>
			<ul class="step-1-listing">
				<div id="submitStatus" class="brown-bg">项目状态：<span id="questionnaireStatus"></span></div>

				<form id="answerForm" role="form" action="updateAnswersAndComment" method="post">
					<div id="questionnaire">
						<!-- Fill in template here -->
					</div>
					<div id="questionnaireComment">更改状态:
						<textarea class="form-control" name="comment.content" rows="3" id="commentContent" autofocus></textarea>
					</div>
					<input type="hidden" name="questionnaireNo" id="questionnaireNo">
					<input type="hidden" name="applicant.userName" id="userName">
					<input type="hidden" name="application.applicationId" id="applicationId">
					<!--
					<input type="hidden" name="answerStatus" id="answerStatus" >
					-->
				</form>
			</ul>
		</div>
		<br>
        <a href="#" class="white-bt meta-event-source" meta-event-handler="userManagement:cancel" id="cancel">取消</a>
		<button class="orange-bt-small meta-event-source" meta-event-handler="userManagement:update" id="update">更新</button>
		<!-- Button trigger modal -->
		<button type="button" id="myModalTrigger" class="btn btn-primary" data-toggle="modal" data-target="#myModal" style="display:none">提交</button>
		<div class="modal fade in" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">×</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">提示</h4>
					</div>
					<div class="modal-body">你确认要更新调查问卷答案和状态吗？</div>
					<div class="buttonsRow">
						<button id="return" type="button" class="white-bt" data-dismiss="modal">返回</button>
						<button type="submit" id="submit" class="orange-bt meta-event-source" meta-event-handler="userManagement:submit">提交</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script id="table-template" type="text/x-handlebars-template">
        {{#each this}}
            <li>
                <div class="col-small">{{realName}}</div>
                <div class="col-small">{{createTime}}</div>
                <div class="col-small" id="cell{{addOne @index}}">{{cellphone}}</div>
                <div class="col-large">{{company}}</div>
                <div class="col-small">{{jobTitle}}</div>
                <div class="col-medium">{{mailbox}}</div>
                <div class="col-small">
                  <span class="bts">
                    <a href="javascript:void(0);" class="edit" onclick="Sannong.UserManagement.Controller.editUserProfile('{{userName}}')">Edit</a>
                    <a href="javascript:void(0);" class="help" onclick="Sannong.UserManagement.Controller.showQuestionnaireAnswers(1,'{{cellphone}}')">Help</a>
                  </span>
                </div>
           </li>
        {{/each}}
	</script>

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