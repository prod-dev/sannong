<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 10/14/14
  Time: 10:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link href="content/static/css/bootstrap-3.2.0/bootstrap.css" rel="stylesheet">
     <link href="content/static/css/sannong/myinfo.css" rel="stylesheet">
   <script src="http://code.jquery.com/jquery-2.1.1.js"></script>
	<script src="content/static/js/sannong/myinfo.js?v=201410201404"> </script>
	<script src="content/static/js/sannong/jquery.weebox.js?v=201410211946"></script>
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
        <div class="col-md-6 column">
            <form role="form" id="applicationForm" action="modifyMyinfo" method="post">
                <div>
                    <div class="form-group">
                        <label for="userName">姓名</label>
                    </div>
                    <div class="form-group">
                        <label id="realName" name="realName" >${myinfo.realName}</label>
                    </div>
                    <div class="form-group">
                        <label for="jobTitle">职务</label>
                        <input type="input" class="form-control" id="jobTitle" name="jobTitle" placeholder="职务"  value="${myinfo.jobTitle}">
                        <div class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="jobCompany">工作单位</label>
                        <input type="input" class="form-control" id="jobCompany"  name="company" placeholder="工作单位"  value="${myinfo.company}">
                        <div class="errorDiv"></div>
                    </div>
                    <div class="form-group ">
                      <label for="jobAddress">单位地址</label> 
                      </div>
                        <div class="form-group form-inline">
                         <input type="hidden" id="provinceValue" value="${myinfo.companyProvince}"/>
                         <input type="hidden" id="cityValue" value="${myinfo.companyCity}"/>
                         <input type="hidden" id="districtValue" value="${myinfo.companyDistrict}"/>
								<select id="provinceSelect" class="form-control" name="companyProvince" >
                                <option></option>
                               </select>
                               <select id="citySelect" class="form-control" name="companyCity">
                               <option></option>
                               </select>
                               <select id="districtSelect" class="form-control" name="companyDistrict">
                               <option></option>
                               </select>
                        <input type="input" class="form-control" id="jobAddress" name="companyAddress" placeholder="单位地址"  value="${myinfo.companyAddress}">
                        <div class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="deskPhone">工作电话</label>
                        <input type="input" class="form-control" id="deskPhone" name="deskPhone"  placeholder="工作电话"  value="${myinfo.deskPhone}">
                        <div class="errorDiv"></div>
                    </div>
                    <div class="form-group">
                        <label for="mailBox">电子邮箱</label>
                        <input type="input" class="form-control" id="mailbox"  name="mailbox" placeholder="电子邮箱"  value="${myinfo.mailbox}">
                        <div class="errorDiv"></div>
                    </div>
                    <div class="form-group" id="divCellphone">
                        <label for="cellPhone">手机号码:</label>&nbsp;${myinfo.cellphone}&nbsp;&nbsp;&nbsp;&nbsp;<input type='button'   class="btn btn-sm btn-warning" onclick="script:$('#divCellphone').attr('style','display:none');$('#divEditCellphone').attr('style','display:block');"  value="更改手机号码">
                    </div>
                    <div id="divEditCellphone" style="display:none">
                    <div class="form-group form-inline" >
                        <label for="cellPhone">手机号码</label>
                        <div >
                           <input type="hidden"  id="oldCellphone" value="${myinfo.cellphone}">
                            <input type="input" class="input-short" id="cellphone" name="cellphone" placeholder="新手机号码">
                            <input type="button" id="action-send-code" data-url="regcode" data-type="1" class="btn btn-sm btn-warning"  value="发送验证码">
                            <input type="input" class="input-short" name="validationcode"  id="validationcode" placeholder="验证码">
                            <div class="errorDiv"></div>
                        </div>
                    </div>
                     
                     </div>
                    </div>
                <div class="errorDiv">${myinfomessage}</div>
                <input type="button" id="register-btn"  class="btn btn-success" value="Submit">
            </form>
        </div>
        <div class="col-md-4 column"></div>
    </div>
</div>
<div class="row clearfix">
    <div class="col-md-12 column">
        <jsp:include page='footer.jsp'/>
    </div>
</div>
</body>
</html>