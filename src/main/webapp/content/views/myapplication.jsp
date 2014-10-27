<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 10/14/14
  Time: 10:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
    <title></title>
</head>
<body>
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <jsp:include page='navbar.jsp'/>
        </div>
    </div>
    <div class="row clearfix">
        <div class="col-md-2 column">
            <jsp:include page='sidebar.jsp'/>
        </div>
        <div class="col-md-7 column">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li class="active"><a href="#questionnaire" role="tab" data-toggle="tab">问卷题集一</a></li>
                <li><a href="#questionnaire2" role="tab" data-toggle="tab">问卷题集二</a></li>
                <li><a href="#questionnaire3" role="tab" data-toggle="tab">问卷题集三</a></li>
                <li><a href="#questionnaire4" role="tab" data-toggle="tab">问卷题集四</a></li>
                <li><a href="#questionnaire5" role="tab" data-toggle="tab">问卷题集五</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane active" id="questionnaire">
                    <jsp:include page='questionnaire.jsp'/>
                </div>
                <div class="tab-pane" id="questionnaire2">...</div>
                <div class="tab-pane" id="questionnaire3">...</div>
                <div class="tab-pane" id="questionnaire4">...</div>
                <div class="tab-pane" id="questionnaire5">...</div>
            </div>
            <hr/>

            <sec:authorize access="hasRole('ROLE_ADMIN') and isAuthenticated()">
                <form role="form">
                    <div class="form-group">
                        <label>状态</label>

                        <textarea class="form-control" rows="3"></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">更新</button>
                </form>
            </sec:authorize>

        </div>
    </div>
</div>
<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>
</div>


</body>
</html>
