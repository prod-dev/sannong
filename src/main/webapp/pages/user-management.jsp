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
    <script src="js/select.js"></script>

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
          <span class="col-sm-10 leftBorder equalCol umList">
                <h3>
                    <span>用户管理</span>
                    <a href="#" class="orange-bt-small float-right">导出问卷调查结果</a>
                </h3>
            <form>
                <div class="searchRow">
                    <div class="left">
                        <label>查询条件</label>
                        <div class="width-71">
                            <select>
                                <option>姓名</option>
                                <option>姓名1</option>
                                <option>姓名2</option>
                            </select>
                        </div>
                        <div class="width-137">
                            <input type="text"/>
                        </div>
                    </div>
                    <div class="right">
                        <label>地址</label>
                        <div class="width-152"><input type="text"/></div>
                        <div class="width-47"><input type="text"/></div>
                        <div class="width-65"><input type="text"/></div>
                        <a href="" class="glyphicon glyphicon-search"></a>
                    </div>
                </div>
                <ul class="umListGrid">
                    <li class="head">
                        <div class="col-small">姓名</div>
                        <div class="col-small">注册日期</div>
                        <div class="col-small">手机号码</div>
                        <div class="col-medium">工作单位</div>
                        <div class="col-large">职位</div>
                    </li>
                    <li>
                        <div class="col-small">
                            <span class="umListGridTitle">姓名</span>
                            名字
                        </div>
                        <div class="col-small">
                            <span class="umListGridTitle">注册日期</span>
                            1970 / 4 / 26
                        </div>
                        <div class="col-small">
                            <span class="umListGridTitle">手机号码</span>
                            21456186544
                        </div>
                        <div class="col-medium">
                            <span class="umListGridTitle">工作单位</span>
                            这是一个虚拟的文本
                        </div>
                        <div class="col-large">
                            <span class="umListGridTitle">职位</span>
                            <a href="#">链接</a>
                    <span class="bts">
                    	<a href="#" class="edit">Edit</a>
                      <a href="#" class="help">Help</a>
                    </span>
                        </div>
                    </li>
                    <li>
                        <div class="col-small">
                            <span class="umListGridTitle">姓名</span>
                            名字
                        </div>
                        <div class="col-small">
                            <span class="umListGridTitle">注册日期</span>
                            1970 / 4 / 26
                        </div>
                        <div class="col-small">
                            <span class="umListGridTitle">手机号码</span>
                            21456186544
                        </div>
                        <div class="col-medium">
                            <span class="umListGridTitle">工作单位</span>
                            这是一个虚拟的文本
                        </div>
                        <div class="col-large">
                            <span class="umListGridTitle">职位</span>
                            <a href="#">链接</a>
                    <span class="bts">
                    	<a href="#" class="edit">Edit</a>
                      <a href="#" class="help">Help</a>
                    </span>
                        </div>
                    </li>
                    <li>
                        <div class="col-small">
                            <span class="umListGridTitle">姓名</span>
                            名字
                        </div>
                        <div class="col-small">
                            <span class="umListGridTitle">注册日期</span>
                            1970 / 4 / 26
                        </div>
                        <div class="col-small">
                            <span class="umListGridTitle">手机号码</span>
                            21456186544
                        </div>
                        <div class="col-medium">
                            <span class="umListGridTitle">工作单位</span>
                            这是一个虚拟的文本
                        </div>
                        <div class="col-large">
                            <span class="umListGridTitle">职位</span>
                            <a href="#">链接</a>
                    <span class="bts">
                    	<a href="#" class="edit">Edit</a>
                      <a href="#" class="help">Help</a>
                    </span>
                        </div>
                    </li>
                    <li>
                        <div class="col-small">
                            <span class="umListGridTitle">姓名</span>
                            名字
                        </div>
                        <div class="col-small">
                            <span class="umListGridTitle">注册日期</span>
                            1970 / 4 / 26
                        </div>
                        <div class="col-small">
                            <span class="umListGridTitle">手机号码</span>
                            21456186544
                        </div>
                        <div class="col-medium">
                            <span class="umListGridTitle">工作单位</span>
                            这是一个虚拟的文本
                        </div>
                        <div class="col-large">
                            <span class="umListGridTitle">职位</span>
                            <a href="#">链接</a>
                    <span class="bts">
                    	<a href="#" class="edit">Edit</a>
                      <a href="#" class="help">Help</a>
                    </span>
                        </div>
                    </li>
                    <li>
                        <div class="col-small">
                            <span class="umListGridTitle">姓名</span>
                            名字
                        </div>
                        <div class="col-small">
                            <span class="umListGridTitle">注册日期</span>
                            1970 / 4 / 26
                        </div>
                        <div class="col-small">
                            <span class="umListGridTitle">手机号码</span>
                            21456186544
                        </div>
                        <div class="col-medium">
                            <span class="umListGridTitle">工作单位</span>
                            这是一个虚拟的文本
                        </div>
                        <div class="col-large">
                            <span class="umListGridTitle">职位</span>
                            <a href="#">链接</a>
                    <span class="bts">
                    	<a href="#" class="edit">Edit</a>
                      <a href="#" class="help">Help</a>
                    </span>
                        </div>
                    </li>
                    <li>
                        <div class="col-small">
                            <span class="umListGridTitle">姓名</span>
                            名字
                        </div>
                        <div class="col-small">
                            <span class="umListGridTitle">注册日期</span>
                            1970 / 4 / 26
                        </div>
                        <div class="col-small">
                            <span class="umListGridTitle">手机号码</span>
                            21456186544
                        </div>
                        <div class="col-medium">
                            <span class="umListGridTitle">工作单位</span>
                            这是一个虚拟的文本
                        </div>
                        <div class="col-large">
                            <span class="umListGridTitle">职位</span>
                            <a href="#">链接</a>
                    <span class="bts">
                    	<a href="#" class="edit">Edit</a>
                      <a href="#" class="help">Help</a>
                    </span>
                        </div>
                    </li>
                </ul>
                <ul class="customPagination">
                    <li><a href="#" class="bt back"></a></li>
                    <li>1/6</li>
                    <li><a href="#" class="bt next activeBt"></a></li>
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

</body>
</html>