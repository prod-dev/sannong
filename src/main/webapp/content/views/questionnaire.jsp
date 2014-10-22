<%--
  Created by IntelliJ IDEA.
  User: apple
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

                <div>
                    <label>问题1:</label>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio </p>
                    <label class="radio-inline">
                        <input type="radio" name="answers[0]" id="inlineRadio11" value="a"> a
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[0]" id="inlineRadio12" value="b"> b
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[0]" id="inlineRadio13" value="c"> c
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[0]" id="inlineRadio14" value="d"> d
                    </label>
                </div>
                <br>

                <div>
                    <label>问题2:</label>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio </p>
                    <label class="radio-inline">
                        <input type="radio" name="answers[1]" id="inlineRadio21" value="差"> 差
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[1]" id="inlineRadio22" value="一般"> 一般
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[1]" id="inlineRadio23" value="好"> 好
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[1]" id="inlineRadio24" value="很好"> 很好
                    </label>
                </div>
                <br>

                <div>
                    <label>问题3:</label>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio </p>
                    <label class="radio-inline">
                        <input type="radio" name="answers[2]" id="inlineRadio31" value="a"> a
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[2]" id="inlineRadio32" value="b"> b
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[2]" id="inlineRadio33" value="c"> c
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[2]" id="inlineRadio34" value="d"> d
                    </label>
                </div>
                <br>

                <div>
                    <label>问题4:</label>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio </p>
                    <label class="radio-inline">
                        <input type="radio" name="answers[3]" id="inlineRadio41" value="a"> a
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[3]" id="inlineRadio42" value="b"> b
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[3]" id="inlineRadio43" value="c"> c
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[3]" id="inlineRadio44" value="d"> d
                    </label>
                </div>
                <br>

                <div>
                    <label>问题5:</label>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio </p>
                    <label class="radio-inline">
                        <input type="radio" name="answers[4]" id="inlineRadio51" value="a"> a
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[4]" id="inlineRadio52" value="b"> b
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[4]" id="inlineRadio53" value="c"> c
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="answers[4]" id="inlineRadio54" value="d"> d
                    </label>
                </div>
                <br>

                <div>
                    <div class="form-group">
                        <label for="userName">用户名</label>
                        <input type="text" class="form-control" id="userName" name="applicant.userName" placeholder="用户名">
                    </div>
                    <div class="form-group">
                        <label for="userName">姓名</label>
                        <input type="text" class="form-control" id="userName" name="applicant.realName" placeholder="姓名">
                    </div>
                    <div class="form-group">
                        <label for="jobTitle">职务</label>
                        <input type="input" class="form-control" id="jobTitle" name="applicant.jobTitle" placeholder="职务">
                    </div>
                    <div class="form-group">
                        <label for="jobCompany">工作单位</label>
                        <input type="input" class="form-control" id="company" name="applicant.company" placeholder="工作单位">
                    </div>
                    <div class="form-group">
                        <label for="jobAddress">单位地址</label>
                        <input type="input" class="form-control" id="companyAddress" name="applicant.companyAddress" placeholder="单位地址">
                    </div>
                    <div class="form-group">
                        <label for="deskPhone">工作电话</label>
                        <input type="input" class="form-control" id="deskPhone" name="applicant.deskPhone" placeholder="工作电话">
                    </div>
                    <div class="form-group">
                        <label for="mailBox">电子邮箱</label>
                        <input type="input" class="form-control" id="mailbox" name="applicant.mailbox" placeholder="电子邮箱">
                    </div>
                    <div class="form-group">
                        <label for="cellPhone">手机号码</label>
                        <input type="input" class="form-control" id="cellphone" name="applicant.cellphone" placeholder="手机号码">
                        <button type="button" class="btn btn-sm btn-warning">发送验证码</button>
                    </div>
                    <div class="form-group">
                        <label for="validationCode">验证码</label>
                        <input type="input" class="form-control" id="smsValidationCode" name="sms.smsValidationCode" placeholder="验证码">
                    </div>
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
            <div>
                <p>如果需要修改问卷调查的答案, 请致电免费电话400-XXXX-XXXX联系我们的工作人员.</p>
            </div>
            <br>
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
</body>
</html>