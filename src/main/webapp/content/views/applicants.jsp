<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
    <link href="content/static/css/jquery.pagination_2/pagination.css" rel="stylesheet">
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
        <div class="col-md-10 column">
            <div class="row">

                <div class="col-lg-6">

                    <div class="input-group">
                       <span class="input-group-addon"><label type="text" value="">查询条件</label></span>
                        <div class="input-group-btn">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"  id="searchKey">姓名<span class="caret"></span></button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="javascript:void(0)" onclick="changeContent()" id="dropdown1">手机号</a></li>
                            </ul>
                        </div><!-- /btn-group -->
                        <input type="text" class="form-control" id="searchValue">
                    </div><!-- /input-group -->
                </div><!-- /.col-lg-6 -->
                <button type="submit" class="btn btn-success" id="retrieve">查询</button>
                <button type="button" class="btn btn-sm btn-primary" onclick="exportCSV();">导出问卷调查结果</button>
            </div><!-- /.row -->

            <br/>

            <table class="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        姓名
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
                <tbody id="userList">
                	
                </tbody>
            </table>
            <div id="pagination"></div>
            <%--<ul class="pagination" id="pagination" />--%>
        </div>
    </div>
</div>

<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>
</div>
</body>

<script id="table-template" type="text/x-handlebars-template">
    {{#each this}}
        <tr>
            <td>{{addOne @index}}</td>
            <td>{{realName}}</td>
            <td>{{createTime}}</td>
            <td id="cell{{addOne @index}}">{{cellphone}}</td>
            <td>{{company}}</td>
            <td>{{jobTitle}}</td>
            <td>
                <a class="btn btn-sm btn-success" href="javascript:void(0)" onclick="showQuestionnaire({{addOne @index}})">问卷调查</a>
            </td>
       </tr>
    {{/each}}
</script>

<script type="text/javascript">
	function changeContent(){
		var searchKey = $("#searchKey").text();
		var dropDown1 = $("#dropdown1").text();
		
		$("#dropdown1").text(searchKey);
		$("#searchKey").html(dropDown1 + '<span class="caret">');
	}

	$("#retrieve").click(function(){
		var searchKey = $("#searchKey").text().trim();
		var searchValue = $("#searchValue").val();
		
		var parameter;
		if (searchKey == "手机号")
		{
			parameter = "cellphone=" + searchValue;
		}
		else if (searchKey == "姓名")
		{
			parameter = "realName=" + searchValue;
		}
		
		$.ajax({
	        type: "get",
	        dataType: "text",
	        url: "userTotalCount",
	        data: parameter,
	        success: function(totalCount){
	        	//pageination and data list presentation
	    	    pageinationHandle(totalCount,parameter);
	        }
	    });
	})
	
	function showQuestionnaire(id){
		var id = "cell" + id;
		var cellphone = $("#" + id).text().trim();

		location.href = "questionnaireanswer?cellphone=" + cellphone;
	}
	function show(currentPageIndex){
		 var parameter = "pageIndex=" + currentPageIndex;
		 
		 $.ajax({
		        type: "get",
		        dataType: "text",
		        url: "userTotalCount",
		        success: function(totalCount,parameter){
		        	//pageination presentation
		    	    pageinationHandle(totalCount);
		        }
		 });
	}
	function pageinationHandle(totalCount,parameter){
		var pageIndex = 0;     //页面索引初始值  
	    var pageSize = 2;     //每页显示条数初始化，修改显示条数，修改这里即可
	    
	    InitTable(0,parameter);    //Load事件，初始化表格数据，页面索引为0（第一页）  
	    
	    //分页，PageCount是总条目数，这是必选参数，其它参数都是可选  
        $("#pagination").pagination(totalCount, {  
            callback: PageCallback,  
            prev_text: '上一页',       //上一页按钮里text  
            next_text: '下一页',       //下一页按钮里text  
            items_per_page: pageSize,  //显示条数  
            num_display_entries: 2,    //连续分页主体部分分页条目数
            current_page: pageIndex,   //当前页索引  
            num_edge_entries: 2        //两侧首尾分页条目数  
        });
	    
       //翻页调用  
        function PageCallback(index, jq) {             
            InitTable(index);  
        }  
        //请求数据  
        function InitTable(pageIndex,parameter) {                                  
            $.ajax({   
                type: "get",  
                dataType: "json",  
                url: 'showApplicants',      //提交到一般处理程序请求数据  
                data: "pageIndex=" + (pageIndex + 1) + "&" + parameter,           
                success: function(data) {                                   
                	var handleHelper = Handlebars.registerHelper("addOne",function(index){
                		return index+1;
                	});
                    var handle = Handlebars.compile($("#table-template").html());
                	var html = handle(data);
                	$("#userList").empty();
                	$("#userList").append(html);
                }  
            });              
        }  
	}

    //export to csv
    function exportCSV() {
        if(confirm("确定要保存到本地CVS文件?")){
            window.location.href="./exportCSV";
        }else{
            return false;
        }

    }

	$(function(){  
		show(1);
	})
</script>
</html>
