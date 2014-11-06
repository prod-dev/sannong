<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
    <link href="content/static/css/sannong/footer.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <jsp:include page='navbar.jsp'/>
            <div class="jumbotron">
                <h2>
                    项目简介
                </h2>
                <div>
                    现在有些地方盲目推进农村城镇化，再次使农民失去了土地，也失去了家园，不但浪费了地方的财力，也加重了农民的负担，这种做法是与科学发展观及可持续发展观的理念相悖的！
                    要根本解决好中国的‘三农’问题，必须以可持续发展的视点从宏观上把握，从国家的整体观上来看待，惠泽“三农”的可持续发展项目将从基础设施、
                    网络信息、人力资源、产业优化等方面建立十大模块.三农项目为农村提供一个专业的信息化平台，
                    它将是农村的致富工具，在上面可以得到各种帮助如：资金、知识、专家支持等，为农村的发展提供一切可利用的手段。
                </div>
                <br>
                <div>
                    <a class="btn btn-success" href="applicationpage">申报项目 »</a>
                </div>
            </div>
        </div>
    </div>
    <div class="row clearfix">
        <div class="col-md-4 column">
        </div>
        <div class="col-md-4 column">
        </div>
        <div class="col-md-4 column">
            <p>
                有更多的问题? 请查看<a href="faq">常见问题 »</a>
            </p>
        </div>
    </div>
</div>
<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>
</div>
<script data-main="content/static/js/sannong/pages/home" src="content/static/js/lib/require-2.1.15.js"></script>
</body>
</html>