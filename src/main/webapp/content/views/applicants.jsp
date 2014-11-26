<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="content/static/css/bootstrap-3.2.0/bootstrap.css"
	rel="stylesheet">
<link href="content/static/css/jquery.pagination_2/pagination.css"
	rel="stylesheet">
<title></title>
</head>
<body>
	<div class="container">
		<div class="row clearfix">
			<div class="col-md-12 column">
				<jsp:include page='navbar.jsp' />
			</div>
		</div>
		<div class="row clearfix">
			<div class="col-md-2 column">
				<jsp:include page='sidebar.jsp' />
			</div>
			<div class="col-md-10 column">
				<div class="row" id="searchBar">
					<div class="col-lg-4">
						<div class="input-group">
							<span class="input-group-addon"><label type="text"
								value="">查询条件</label>
							</span>
							<div class="input-group-btn">
								<button type="button" class="btn btn-default dropdown-toggle"
									data-toggle="dropdown" id="searchKey">
									姓名<span class="caret"></span>
								</button>
								<ul class="dropdown-menu" role="menu">
									<li><a href="javascript:void(0)"
										onclick="Sannong.Applicants.changeContent('dropdownCellphone')"
										id="dropdownCellphone">手机号</a>
									</li>
									<li><a href="javascript:void(0)"
										onclick="Sannong.Applicants.changeContent('dropdownCompany')"
										id="dropdownCompany">工作单位</a>
									</li>
									<li><a href="javascript:void(0)"
										onclick="Sannong.Applicants.changeContent('dropdownJobTitle')"
										id="dropdownJobTitle">职位</a>
									</li>
									<li><a href="javascript:void(0)"
										onclick="Sannong.Applicants.changeContent('dropdownMailbox')"
										id="dropdownMailbox">电子邮箱</a>
									</li>
									<li><a href="javascript:void(0)"
										onclick="Sannong.Applicants.changeContent('dropdownCompanyAddress')"
										id="dropdownCompanyAddress">单位地址</a>
									</li>
								</ul>
							</div>
							<!-- /btn-group -->
							<input type="text" class="form-control" id="searchValue">
						</div>
						<!-- /input-group -->
					</div>
					<!-- /.col-lg-6 -->
					<div class="form-group form-inline">
						<select id="provinceSelect" class="form-control"
							name="applicant.companyProvince">
							<option>省/直辖市</option>
						</select> <select id="citySelect" class="form-control"
							name="applicant.companyCity">
							<option>市</option>
						</select> <select id="districtSelect" class="form-control"
							name="applicant.companyDistrict">
							<option>县/市辖区</option>
						</select>
						<button type="submit" class="btn btn-success" id="retrieve">查询</button>
						<button type="button" class="btn btn-sm btn-primary"
							data-toggle="modal" data-target="#exportModal">导出问卷调查结果</button>
					</div>
				</div>
				<!-- /.row -->

				<div id="userTextShow"
					style="display:none; float:right; text-align:right">
					<div style="float:left;color:#F75000" id="userRealName"></div>
					<div style="float:left">的调查问卷答案</div>
				</div>

				<br />
				<div id="applicantsTable">
					<table
						class="table table-striped table-bordered table-hover table-condensed">
						<thead>
							<tr>
								<th>#</th>
								<th>姓名</th>
								<th>注册日期</th>
								<th>手机号码</th>
								<th>工作单位</th>
								<th>职位</th>
								<th>电子邮箱</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody id="userList">
						</tbody>
					</table>
					<div id="pagination"></div>
					<%--<ul class="pagination" id="pagination" />--%>
				</div>
				<div id="questionnaireTable" style="display:none">
					<ul class="nav nav-tabs" role="tablist">
						<li class="active"><a href="javascript:void(0)"
							onclick="Sannong.Applicants.showQuestionnaireAnswers(1,'')"
							role="tab" data-toggle="tab" id="q1">项目状态</a>
						</li>
						<li><a href="javascript:void(0)"
							onclick="Sannong.Applicants.showQuestionnaireAnswers(2,'')"
							role="tab" data-toggle="tab" id="q2">问卷题集二</a>
						</li>
						<li><a href="javascript:void(0)"
							onclick="Sannong.Applicants.showQuestionnaireAnswers(3,'')"
							role="tab" data-toggle="tab" id="q3">问卷题集三</a>
						</li>
						<li><a href="javascript:void(0)"
							onclick="Sannong.Applicants.showQuestionnaireAnswers(4,'')"
							role="tab" data-toggle="tab" id="q4">问卷题集四</a>
						</li>
						<li><a href="javascript:void(0)"
							onclick="Sannong.Applicants.showQuestionnaireAnswers(5,'')"
							role="tab" data-toggle="tab" id="q5">问卷题集五</a>
						</li>
					</ul>
					<form id="answerForm" role="form" action="updateAnswersAndComment"
						method="post">
						<div id="questionList"></div>
						<br>
						<div id="questionnaireStatus">状态<textarea class="form-control" name="comment.content" rows="3" placeholder="如果需要修改问卷调查的答案，请致电免费电话400-XXXX-XXXX联系我们的工作人员" autofocus></textarea></div>
						<input type="hidden" name="answerStatus" id="answerStatus">
						<input type="hidden" name="questionnaireNo" id="questionnaireNo">
						<input type="hidden" name="applicant.userName" id="userName">
						<input type="hidden" name="application.applicationId" id="applicationId">
					</form>
					<br>
					<button class="btn btn-success" id="cancel"
						onclick="Sannong.Applicants.cancel()">取消</button>
					<button class="btn btn-success" id="update"
						onclick="Sannong.Applicants.update()">更新</button>

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
			</div>
		</div>
	</div>

	<div class="row clearfix">
		<div class="col-md-12 column">
			<jsp:include page='footer.jsp' />
		</div>
	</div>
	<div>
		<input type="hidden" id="cellphone">
	</div>
	<!-- export modal content -->
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
</body>
<script data-main="content/static/js/sannong/pages/applicants"
	src="content/static/js/lib/require-2.1.15.js"></script>
<script id="table-template" type="text/x-handlebars-template">
    {{#each this}}
        <tr>
            <td>{{addOne @index}}</td>
            <td>{{realName}}</td>
            <td>{{createTime}}</td>
            <td id="cell{{addOne @index}}">{{cellphone}}</td>
            <td>{{company}}</td>
            <td>{{jobTitle}}</td>
            <td>{{mailbox}}</td>
            <td>
                <a class="btn btn-sm btn-success" href="javascript:void(0)" onclick="Sannong.Applicants.edit('{{userName}}')">编辑</a>
            </td>
            <td>
                <a class="btn btn-sm btn-success" href="javascript:void(0)" onclick="Sannong.Applicants.showQuestionnaireAnswers(1,{{cellphone}})">问卷调查</a>
            </td>
       </tr>
    {{/each}}
</script>
<script id="question-template-checkbox"
	type="text/x-handlebars-template">
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
</html>