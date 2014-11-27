<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 11/22/14
  Time: 21:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Benefitting Agriculture - User Management List Page</title>

    <link href="css/custom.css" rel="stylesheet" type="text/css">
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css">

    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <script src="js/custom.js"></script>
    <%--<script src="js/select.js"></script>
    
    --%><script data-main="js/app/pages/applicants" src="js/lib/require-2.1.15.js"></script>

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
        	<span class="col-sm-2 sidebar equalCol">
          	<h3>菜单</h3>
            <ul>
                <li><a href="#">项目申请<span></span></a></li>
                <li><a href="#">用户配置文件<span></span></a></li>
                <li><a href="#">更新密码<span></span></a></li>
                <li class="active"><a href="#">用户管理<span></span></a></li>
            </ul>
          </span>          
          <span class="col-sm-10 leftBorder equalCol umList">
			<h3>
                <span>用户管理</span>
                <a href="#" class="orange-bt-small float-right" data-toggle="modal" data-target="#exportModal">导出问卷调查结果</a>
                <div id="exportModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		            <div class="modal-dialog">
			            <div class="modal-content">
				            <div class="modal-header">
					            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					            <h4 class="modal-title" id="myModalLabel">确定导出问卷调查结果?</h4>
				            </div>
				            <div class="modal-footer">
					            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					            <a href="javascript:void(0)" class="btn btn-success" id="exportCSV">确定</a>
				            </div>
			            </div>
		            </div>
	            </div>
            </h3>
            <form>
                <div id="searchBar" class="searchRow">
                    <div class="form-group form-inline">
						<label>查询条件</label>
						<select class="form-control">
						    <option>姓名</option>
						    <option>手机号</option>
						    <option>工作单位</option>
						    <option>职位</option>
						    <option>电子邮箱</option>
						    <option>单位地址</option>
						</select>
					    <input type="text" class="form-control" id="searchValue">
						<select id="provinceSelect" class="form-control"
							name="applicant.companyProvince">
							<option>省/直辖市</option>
						</select>
						<select id="citySelect" class="form-control"
							name="applicant.companyCity">
							<option>市</option>
						</select>
						<select id="districtSelect" class="form-control"
							name="applicant.companyDistrict">
							<option>县/市辖区</option>
						</select>
						<a id="retrieve" href="javascript:void(0);" class="glyphicon glyphicon-search"></a>
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
                        <div id="userList">
                    </li>
                </ul>
                <ul id="pagination" class="customPagination">
                </ul>
            </form>
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
                <a href="javascript:void(0);" class="edit" onclick="Sannong.Applicants.edit('{{userName}}')">Edit</a>
                <a href="javascript:void(0);" class="help" onclick="Sannong.Applicants.showQuestionnaireAnswers(1,{{cellphone}})">Help</a>
              </span>
            </div>
       </li>
    {{/each}}
</script>

</body>
</html>