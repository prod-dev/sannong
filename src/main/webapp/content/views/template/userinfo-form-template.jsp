<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<div>
    <div>
        <input name="userName" type="hidden" value="${myinfo.userName}" >
    </div>
    <div class="form-group">
        <label for="realName">姓名</label>
        <input id="realName" class="form-control" name="realName" disabled value="${myinfo.realName}">
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
        </select>
        <select id="citySelect" class="form-control" name="companyCity">
        </select>
        <select id="districtSelect" class="form-control" name="companyDistrict">
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
    <div class="form-group form-inline" id="divCellphone">
        <label for="cellphone">手机号码:</label>
        <input id="cellphone" class="form-control" name="cellphone" disabled value="${myinfo.cellphone}">
        <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
            <input type='button' class="btn btn-sm btn-warning" data-toggle="collapse" data-target="#demo" aria-expanded="false" aria-controls="#demo" value="更改手机号码">
        </sec:authorize>

    </div>
    <sec:authorize access="hasRole('ROLE_USER') and isAuthenticated()">
        <div id="demo" class="collapse">
            <div class="form-group form-inline">
                <div >
                    <input type="hidden"  id="oldCellphone" value="${myinfo.cellphone}">
                    <input type="text" class="form-control" id="newCellphone" name="newCellphone" placeholder="新手机号码" autocomplete="off">
                    <input type="button" id="action-send-code" data-url="regcode" data-type="1" class="btn btn-sm btn-warning" value="发送验证码">
                    <input type="text" class="form-control" name="validationcode"  disabled="true" id="validationcode" placeholder="验证码" autocomplete="off">
                    <div class="errorDiv"></div>
                </div>
            </div>
        </div>
    </sec:authorize>
</div>
<div class="errorDiv">${myinfomessage}</div>
