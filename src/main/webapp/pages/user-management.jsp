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
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Benefitting Agriculture - User Management List Page</title>
</head>

<body>
	<h3 id="user-management-title">
		<span>用户管理</span> <a href="javascript:void(0);"
			class="orange-bt-small float-right" data-toggle="modal"
			data-target="#exportModal">导出问卷调查结果</a>
	</h3>

	<div id="exportModal" class="modal fade" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">确定导出问卷调查结果?</h4>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<a href="javascript:void(0)" class="btn btn-success" id="exportCSV">确定</a>
				</div>
			</div>
		</div>
	</div>

	<div id="userManagementTable">
		<div id="searchBar" class="searchRow">
			<div class="form-group form-inline">
				<label>查询条件</label> <select id="searchKey" class="form-control">
					<option>姓名</option>
					<option>手机号</option>
					<option>工作单位</option>
					<option>职位</option>
					<option>电子邮箱</option>
					<option>单位地址</option>
				</select> <input type="text" class="form-control" id="searchValue"> <select
					id="provinceSelect" class="form-control"
					name="applicant.companyProvince">
					<option>省/直辖市</option>
				</select> <select id="citySelect" class="form-control"
					name="applicant.companyCity">
					<option>市</option>
				</select> <select id="districtSelect" class="form-control"
					name="applicant.companyDistrict">
					<option>县/市辖区</option>
				</select> <a id="retrieve" href="javascript:void(0);"
					class="glyphicon glyphicon-search"></a>
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
			</li>
			<li>
				<div id="userList"></div>
			</li>
		</ul>
		<ul id="pagination" class="customPagination">
			<li><a id="previous" href="javascript:void(0);" class="bt back"></a>
			</li>
			<li><label id="currentPage">1</label>/<label id="totalPage">6</label>
			</li>
			<li><a id="next" href="javascript:void(0);"
				class="bt next activeBt"></a></li>
		</ul>
		<input type="hidden" id="cellphone">
	</div>

    <div id="userProfileEditView">
    </div>
    <jsp:include page='user-profile.jsp'/>


	<div id="questionnaireTable" style="display:none">

		<div id="userTextShow"
			style="display:none; float:right; text-align:right">
			<div style="float:left;color:#F75000" id="userRealName"></div>
			<div style="float:left">的调查问卷答案</div>
		</div>

		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="active"><a id="q1"
				href="javascript:void(0)" role="tab" data-toggle="tab">问卷题集</a>
			</li>
			<li role="presentation"><a id="q2" href="javascript:void(0)"
				role="tab" data-toggle="tab">问卷题集二</a>
			</li>
			<li role="presentation"><a id="q3" href="javascript:void(0)"
				role="tab" data-toggle="tab">问卷题集三</a>
			</li>
			<li role="presentation"><a id="q4" href="javascript:void(0)"
				role="tab" data-toggle="tab">问卷题集四</a>
			</li>
			<li role="presentation"><a id="q5" href="javascript:void(0)"
				role="tab" data-toggle="tab">问卷题集五</a>
			</li>
		</ul>
		<div class="tab-content">
			<ul class="steps">
				<li class="active"><span class="no">1</span> <span
					class="stepHeading">问卷题集-</span></li>
				<li><span class="no">2</span> <span class="stepHeading">问卷题集-</span>
				</li>
				<li><span class="no">3</span> <span class="stepHeading">问卷题集-</span>
				</li>
				<li><span class="no">4</span> <span class="stepHeading">问卷题集-</span>
				</li>
				<li><span class="no">5</span> <span class="stepHeading">问卷题集-</span>
				</li>
			</ul>
			<ul class="step-1-listing">
				<form id="answerForm" role="form" action="updateAnswersAndComment"
					method="post">
					<div id="questionList"></div>
					<input type="hidden" name="answerStatus" id="answerStatus">
					<input type="hidden" name="questionnaireNo" id="questionnaireNo">
					<input type="hidden" name="applicant.userName" id="userName">
					<input type="hidden" name="application.applicationId"
						id="applicationId">
				</form>
			</ul>
		</div>
		<button class="btn btn-success" id="cancel">取消</button>
		<button class="btn btn-success" id="update">更新</button>
		<!-- Button trigger modal -->
		<button type="button" id="myModalTrigger" class="btn btn-primary"
			data-toggle="modal" data-target="#myModal" style="display:none">提交</button>
		<div class="modal fade in" id="myModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">×</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">提示</h4>
					</div>
					<div class="modal-body">你确认要更新调查问卷答案和状态吗？</div>
					<div class="modal-footer">
						<button id="return" type="button" class="btn btn-default"
							data-dismiss="modal">返回</button>
						<button type="submit" id="submit" class="btn btn-success">提交</button>
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
                    <a href="javascript:void(0);" class="edit" onclick="Sannong.UserManagement.edit('{{userName}}')">Edit</a>
                    <a href="javascript:void(0);" class="help" onclick="Sannong.UserManagement.showQuestionnaireAnswers(1,'{{cellphone}}')">Help</a>
                  </span>
                </div>
           </li>
        {{/each}}
</script>

	<script id="question-template-checkbox"
		type="text/x-handlebars-template">
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