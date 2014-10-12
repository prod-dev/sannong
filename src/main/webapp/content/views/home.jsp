<%--
  Created by IntelliJ IDEA.
  User: Bright Huang
  Date: 10/7/14
  Time: 10:29
  To change this template use File | Settings | File Templates.
--%>
<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8">
    <link rel="stylesheet" href="content/static/css/bootstrap-3.2.0/bootstrap.min.css"/>
    <link rel="stylesheet" href="content/static/css/bootstrap-datepicker-1.3.0/datepicker.css"/>
    <link rel="stylesheet" href="content/static/css/sannong/home/home.css"/>
    <link rel="stylesheet" href="content/static/css/sannong/home/citypicker.css"/>
</head>
<jsp:include page='header.jsp'/>
<jsp:include page='navbar.jsp'/>
<body marginwidth="0" marginheight="0">
<div class="base_top">
<iframe id="iframeCrmAds" scrolling="no" frameborder="0" style="width: 100%; height: 360px;" marginwidth="0"
        marginheight="0" src="http://bus.ctrip.com/banner.html"></iframe>
<form action="buslines" id="searchBusForm" method="POST" accept-charset="utf-8">
    <div class="s_wrapper">
        <div class="s_box">
            <div class="search_box_tab">
                <span class="search_for_b"><b></b>汽车票查询</span>
            </div>
            <div id="searchBox1" class="search_box">
                <div class="search_form">
                    <table width="100%" cellspacing="0" cellpadding="0" class="searchbox">
                        <tbody>
                        <tr>
                            <th>出发城市</th>
                            <td><input type="text" tabindex="1" name="from" id="notice01" class="input_txt"
                                       autocomplete="on" _cqnotice="中文/拼音/首字母"></td>
                        </tr>
                        <tr>
                            <th>到达城市</th>
                            <td><input type="text" tabindex="2" name="to" id="notice02" class="input_txt"
                                       autocomplete="on" _cqnotice="中文/拼音/首字母"></td>
                        </tr>
                        <tr>
                            <th>出发日期</th>
                            <td><input type="text" tabindex="3" name="startDate" value="" id="dateObj"
                                       class="input_txt" readonly="readonly" placeholder="yyyy-mm-dd"
                                       _cqnotice="yyyy-mm-dd">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="search_btn_box">
                        <input type="submit" value="搜 索" id="searchBusTicket" class="btn_search">
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

    <div style="position: absolute; z-index: 2000; top: 320px; left: 480px;" winstyle="hot">
    <div style="width:430px;display:block " class="com_hotrenew">
        <div style="width:100%;">
            <div class="ac_title"><span>支持中文/拼音/简拼输入</span></div>
            <ul method="hotTab" class="AbcSearchnew clx">
                <li method="liHotTab" index="0" class="action">热门</li>
                <li method="liHotTab" index="1">ABCD</li>
                <li method="liHotTab" index="2">EFGHJ</li>
                <li method="liHotTab" index="3">KLMN</li>
                <li method="liHotTab" index="4" class="">PQRSTW</li>
                <li method="liHotTab" index="5">XYZ</li>
            </ul>
            <ul method="hotData" class="popcitylistnew" style="">
                <li method="liHotData" data="0|0" title="北京" class="ac_even ac_over">北京</li>
                <li method="liHotData" data="0|1" title="上海" class="ac_odd">上海</li>
                <li method="liHotData" data="0|2" title="天津" class="ac_even">天津</li>
                <li method="liHotData" data="0|3" title="重庆" class="ac_odd">重庆</li>
                <li method="liHotData" data="0|4" title="长沙" class="ac_even">长沙</li>
                <li method="liHotData" data="0|5" title="长春" class="ac_odd">长春</li>
                <li method="liHotData" data="0|6" title="成都" class="ac_even">成都</li>
                <li method="liHotData" data="0|7" title="福州" class="ac_odd">福州</li>
                <li method="liHotData" data="0|8" title="广州" class="ac_even">广州</li>
                <li method="liHotData" data="0|9" title="贵阳" class="ac_odd">贵阳</li>
                <li method="liHotData" data="0|10" title="呼和浩特" class="ac_even">呼和浩特</li>
                <li method="liHotData" data="0|11" title="哈尔滨" class="ac_odd">哈尔滨</li>
                <li method="liHotData" data="0|12" title="合肥" class="ac_even">合肥</li>
                <li method="liHotData" data="0|13" title="杭州" class="ac_odd">杭州</li>
                <li method="liHotData" data="0|14" title="海口" class="ac_even">海口</li>
                <li method="liHotData" data="0|15" title="济南" class="ac_odd">济南</li>
                <li method="liHotData" data="0|16" title="昆明" class="ac_even">昆明</li>
                <li method="liHotData" data="0|17" title="拉萨" class="ac_odd">拉萨</li>
                <li method="liHotData" data="0|18" title="兰州" class="ac_even">兰州</li>
                <li method="liHotData" data="0|19" title="南宁" class="ac_odd">南宁</li>
                <li method="liHotData" data="0|20" title="南京" class="ac_even">南京</li>
                <li method="liHotData" data="0|21" title="南昌" class="ac_odd">南昌</li>
                <li method="liHotData" data="0|22" title="沈阳" class="ac_even">沈阳</li>
                <li method="liHotData" data="0|23" title="石家庄" class="ac_odd">石家庄</li>
                <li method="liHotData" data="0|24" title="太原" class="ac_even">太原</li>
                <li method="liHotData" data="0|25" title="乌鲁木齐" class="ac_odd">乌鲁木齐</li>
                <li method="liHotData" data="0|26" title="武汉" class="ac_even">武汉</li>
                <li method="liHotData" data="0|27" title="西宁西" class="ac_odd">西宁西</li>
                <li method="liHotData" data="0|28" title="西安" class="ac_even">西安</li>
                <li method="liHotData" data="0|29" title="银川" class="ac_odd">银川</li>
                <li method="liHotData" data="0|30" title="郑州" class="ac_even">郑州</li>
                <li method="liHotData" data="0|31" title="深圳" class="ac_odd">深圳</li>
            </ul>
        </div>
        <div class="clear"></div>
        <div class="clear"></div>
    </div>
</div>
</div>
</body>
<jsp:include page='footer.jsp'/>

<script src="content/static/js/lib/require-2.1.15.min.js" defer async="true" data-main="content/static/js/travel/main"></script>

<!--
<script src="content/static/js/lib/jquery-2.1.1.min.js"></script>
<script src="content/static/js/travel/home/cQuery.js"></script>
<script type="text/javascript" charset="utf-8" async="" src="http://bus.ctrip.com/index.php?param=/data/skCityList&callback=busSkFromCityCallback"></script>
<script type="text/javascript" charset="utf-8" async="" src="http://bus.ctrip.com/index.php?param=/data/cityList&callback=busFromCityCallback"></script>
<script src="content/static/js/travel/home/address-1.0.js"></script>
<script src="content/static/js/travel/home/notice-1.0.js"></script>
<script src="content/static/js/travel/home/calendar-3.0.js"></script>
-->
<!--
<script src="content/static/js/lib/require-2.1.15.min.js" defer async="true" data-main="content/static/js/travel/main"></script>
<script src="content/static/js/lib/jquery-2.1.1.min.js"></script>
<script src="content/static/js/travel/home/home.js"></script>
<script src="content/static/js/lib/bootstrap-datepicker-1.3.0.js"></script>
-->
</html>
