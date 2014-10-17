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
        <div class="col-md-12 column">
            <form role="form" action="bidding/apply" method="post">
                <div>
                    <label>问题1:</label>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio </p>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio11" value="option1"> a
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio12" value="option2"> b
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio13" value="option3"> c
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio14" value="option1"> d
                    </label>
                </div>
                <br>

                <div>
                    <label>问题2:</label>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio </p>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio21" value="option2"> 差
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio22" value="option3"> 一般
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio23" value="option1"> 好
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio24" value="option2"> 很好
                    </label>
                </div>
                <br>

                <div>
                    <label>问题3:</label>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio </p>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio31" value="option2"> a
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio32" value="option3"> b
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio33" value="option1"> c
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio34" value="option2"> d
                    </label>
                </div>
                <br>

                <div>
                    <label>问题4:</label>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio </p>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio41" value="option2"> a
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio42" value="option3"> b
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio43" value="option1"> c
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio44" value="option2"> d
                    </label>
                </div>
                <br>

                <div>
                    <label>问题5:</label>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio </p>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio51" value="option2"> a
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio52" value="option3"> b
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio53" value="option1"> c
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="inlineRadioOptions" id="inlineRadio54" value="option2"> d
                    </label>
                </div>
                <br>


                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputFile">File input</label>
                        <input type="file" id="exampleInputFile">
                        <p class="help-block">Example block-level help text here.</p>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox"> Check me out
                        </label>
                    </div>

                <div>
                    <p>如果需要修改问卷调查的答案, 请致电免费电话400-XXXX-XXXX联系我们的工作人员.</p>
                </div>
                <br>

                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
    </div>
</div>
</body>
</html>
