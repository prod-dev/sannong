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
               <jsp:include page="questionnaire.jsp"/>
               <hr>
           </form>
           <br>
        </div>
    </div>
</div>
<div><input type=hidden value="${answer}" id="answer"></div>
<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>
</div></body>

<script type="text/javascript">
    $(function(){
    	var answerString = $("#answer").val();
    	var answer = answerString.split(";");
    	for (var i = 0;i < answer.length;i++){
    		   var $_radios=$(".J_group_radio").eq(i).find("input");
    		   $_radios.each(function(){
    			    if($(this).val()===answer[i]){
	    			    $(this).attr("checked","checked");
    			    }
    		   });
    	}
    })
</script>
</html>