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
            <div class="list-group">
                <a href="#" class="list-group-item disabled">
                    个人中心
                </a>
                <a href="applicants" class="list-group-item">用户管理</a>
                <a href="myinfo" class="list-group-item">我的信息</a>
                <a href="mypassword" class="list-group-item">我的密码</a>

            </div>
        </div>
        <div class="col-md-10 column">
            <div class="row">

                <div class="col-lg-6">

                    <div class="input-group">
                       <span class="input-group-addon"><label type="text" value="">查询条件</label></span>
                        <div class="input-group-btn">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Action <span class="caret"></span></button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="#">用户名</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li class="divider"></li>
                                <li><a href="#">Separated link</a></li>
                            </ul>
                        </div><!-- /btn-group -->
                        <input type="text" class="form-control">
                    </div><!-- /input-group -->
                </div><!-- /.col-lg-6 -->
                <button type="submit" class="btn btn-success">查询</button>
                <button type="submit" class="btn btn-sm btn-primary">导出问卷调查结果</button>
            </div><!-- /.row -->

            <br/>

            <table class="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        用户名
                    </th>
                    <th>
                        注册日期
                    </th>
                    <th>
                        手机号码
                    </th>
                    <th>
                        工作单位
                    </th>
                    <th>
                        职位
                    </th>
                    <th>

                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        1
                    </td>
                    <td>
                        王新湖
                    </td>
                    <td>
                        01/04/2012
                    </td>
                    <td>
                        13544606578
                    </td>
                    <td>
                        广东省深圳市南山区西丽街道办新围村329号
                    </td>
                    <td>
                        村长
                    </td>
                    <td>
                        <a class="btn btn-sm btn-success" href="questionnaire">问卷调查</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        2
                    </td>
                    <td>
                        李敏
                    </td>
                    <td>
                        01/04/2012
                    </td>
                    <td>
                        18644532345
                    </td>
                    <td>
                        广东省深圳市南山区西丽街道办新围村329号
                    </td>
                    <td>
                        街道办主任
                    </td>
                    <td>
                        <a class="btn btn-sm btn-success" href="questionnaire">问卷调查</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        3
                    </td>
                    <td>
                        章江北
                    </td>
                    <td>
                        02/04/2012
                    </td>
                    <td>
                        13978650342
                    </td>
                    <td>
                        广西壮族自治区南宁市上林县大丰镇黄周村159号
                    </td>
                    <td>
                        村支书
                    </td>
                    <td>
                        <a class="btn btn-sm btn-success" href="questionnaire">问卷调查</a>
                    </td>
                </tr>

                </tbody>
            </table>

            <ul class="pagination">
                <li><a href="#">&laquo;</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&raquo;</a></li>
            </ul>
        </div>
    </div>
</div>
</body>
</html>
