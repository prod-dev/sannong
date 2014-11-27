/**
 * Created by apple on 11/27/14.
 */
require(['../main'], function () {
    require(['jquery', 'bootstrap', 'handlebars', 'sannong', 'validate', 'ajaxHandler',
            'formValidator', 'additionalMethods', 'pagination', 'region', 'jqueryForm', 'questionnaire', 'login'],
        function($, bootstrap, handlebars, sannong, validate, ajaxHandler,
                 formValidator, additionalMethods, pagination, region, jqueryForm, questionnaire, login) {

            "use strict";

            var userPersonalCenter = {};

            userPersonalCenter.Model = {
            }

            userPersonalCenter.View = {
            }

            userPersonalCenter.Controller = {
            }


            /********************************* user-profile.js ********************************************/

            var myInfo = {};
            myInfo.Model = {
                newCellphoneError: '<label id="newCellphone-error" class="error" for="newCellphone" style="display: inline-block;">手机号码已存在</label>'
            }
            myInfo.View = {
                newCellphone: $("#newCellphone"),
                newCellphoneError: $("#newCellphone-error")
            };

            function sendValidationCode(){
                var options = {
                    url: 'sendValidationCode',
                    type: 'POST',
                    data: {
                        newCellphone: $("#newCellphone").val()
                    },
                    success: function(response){
                        if (response != "") {
                            $("#validationCode").removeAttr("disabled");
                        } else {
                            $("#validationCode").attr({disabled: "disabled"});
                        }
                    },
                    fail: function(response){
                        $("#validationCode").attr({disabled: "disabled"});
                    }
                }
                ajaxHandler.sendRequest(options);
            }

            function showValidationError(){
                myInfo.View.newCellphoneError.remove();
                myInfo.View.newCellphone.removeClass("error");
                myInfo.View.newCellphone.after(myInfo.Model.newCellphoneError);
                myInfo.View.newCellphone.addClass("error");
            }

            function addEventListener(){
                $("#provinceSelect").change(function(event){
                    region.Controller.addCities();
                });

                $("#citySelect").change(function(event){
                    $('#districtSelect option').remove();
                    region.Controller.addDistricts();
                });

                $("#confirmedSubmit").click(function(event){
                    $("#myInfoForm").submit();
                });

                $("#myInfoSubmit").click(function(event){
                    var validator = formValidator.getValidator("#myInfoForm");
                    if (validator.form() == true){
                        $("#myInfoForm").ajaxSubmit(function(message) {
                            $("#return").after('<label id="jobTitle-error" class="error" for="jobTitle">已保存</label>');
                            return false;
                        });
                    }
                });

                $("#userInfoSubmit").click(function(event){
                    if (formValidator.getValidator("#userInfoForm").form() == true){
                        $("#userInfoForm").ajaxSubmit(function(message) {
                            $("#return").after('<label id="jobTitle-error" class="error" for="jobTitle">已保存</label>');
                            return false;
                        });
                    }
                });

                $("#action-send-code").click(function(event){
                    ajaxHandler.sendRequest({
                        type: "GET",
                        url: "validateUniqueCellphone",
                        data:{cellphone: $("#newCellphone").val()},
                        success: function(response){
                            if (response == true){
                                var validator = formValidator.getValidator("#myInfoForm");
                                var newCellphoneValid = validator.element($("#newCellphone"));
                                if (validator.form() == true && newCellphoneValid == true ){
                                    additionalMethods.updateTimeLabel("#action-send-code", "验证码");
                                    sendValidationCode();
                                }
                            }else{
                                showValidationError();
                            }
                        },
                        fail: function(){
                            showValidationError();
                        }
                    });
                });
            }


            /***************** user-management.js ************************************************************/
            var applicants = {};
            applicants.edit = function(userName){
                location.href = "userinfo?userName=" + userName;
            }

            applicants.changeContent = function(dropdownName){
                var searchKey = $("#searchKey").text();
                var dropDownNameText = $("#" + dropdownName).text();

                $("#" + dropdownName).text(searchKey);
                $("#searchKey").html(dropDownNameText + '<span class="caret">');
            }

            applicants.cancel = function () {
                $("#userTextShow").hide();
                $("#questionnaireTable").hide();
                $("#applicantsTable").show();
                $("#searchBar").show();
            }

            applicants.update = function () {
                if (formValidator.getValidator("#answerForm").form() == true){
                    $("#myModalTrigger").click();

                }
            }

            $("#submit").click(function(event){
                $("#answerForm").ajaxSubmit(function(message) {
                    if (message.result == true){
                        $("#return").click();
                    }else{
                        alert("更新失败！");
                    }
                });
                return false;
            });

            $("#retrieve").click(function() {
                var searchKey = $("#searchKey").text().trim();
                var searchValue = $("#searchValue").val();

                var parameter;
                if (searchKey == "手机号"){
                    parameter = "cellphone=" + searchValue;
                }else if (searchKey == "姓名"){
                    parameter = "realName=" + searchValue;
                }else if (searchKey == "工作单位"){
                    parameter = "company=" + searchValue;
                }else if (searchKey == "职位"){
                    parameter = "jobTitle=" + searchValue;
                }else if (searchKey == "电子邮箱"){
                    parameter = "mailbox=" + searchValue;
                }else if (searchKey == "单位地址"){
                    parameter = "companyAddress=" + searchValue;
                }
                var provinceIndex = $("#provinceSelect").val();
                var cityIndex = $("#citySelect").val();
                var districtIndex = $("#districtSelect").val();

                parameter = parameter + "&provinceIndex=" + provinceIndex + "&cityIndex=" + cityIndex + "&districtIndex=" + districtIndex;

                $.ajax({
                    type : "get",
                    dataType : "text",
                    url : "userTotalCount",
                    data : parameter,
                    success : function(totalCount) {
                        // pageination and data list presentation
                        pageinationHandle(totalCount, parameter);
                    }
                });
            })

            applicants.Controller = {
                addEventListener: function(){
                    $("#provinceSelect").change(function(event){
                        region.Controller.addCitySelectionsOnly();
                    });

                    $("#citySelect").change(function(event){
                        $('#districtSelect option').remove();
                        region.Controller.addDistrictSelectionsOnly();
                    });
                }
            }

            applicants.showQuestionnaireAnswers = function (questionnaireNo, cellphone) {
                $("#questionnaireNo").val(questionnaireNo);
                $("#answerStatus").val(questionnaireNo + '1');
                $("#userTextShow").hide();

                var userCellphone = cellphone;
                if (userCellphone != "") {
                    $("#cellphone").val(userCellphone);
                } else {
                    userCellphone = $("#cellphone").val();
                }
                $.ajax({
                    type : "get",
                    dataType : "json",
                    url : 'questionAndAnswer',
                    data : "questionnaireNo=" + questionnaireNo + "&cellphone="
                    + userCellphone,
                    success : function(data) {
                        var answerStatus = data.answerStatus;
                        var answerStatusStr = answerStatus.toString();
                        var latestQuestionnaireNo = parseInt(answerStatusStr.substring(0, 1));
                        var saveOrSubmit = answerStatusStr.substring(1, 2);
                        // about when admin can update user's questionnaire
                        if (parseInt(questionnaireNo) > latestQuestionnaireNo ||
                            ((parseInt(questionnaireNo) == latestQuestionnaireNo) && saveOrSubmit == 0)){
                            $("#update").attr("disabled", "disabled");
                        }else{
                            $("#update").attr("disabled", false);
                        }

                        if (data.applicant != null) {
                            $("#userName").val(data.applicant.userName);
                            $("#userRealName").text(data.applicant.realName);
                            $("#userTextShow").show();
                        }

                        // before initial table
                        if ($("#questionnaireTable").is(":hidden")) {
                            $("#questionnaireTable").show();
                        } else {
                            $("#applicantsTable").hide();
                            $("#questionList").empty();
                        }
                        $("#applicantsTable").hide();
                        $("#searchBar").hide();
                        $("#questionList").empty();

                        //fill out questionnaire
                        var handleCheckbox = handlebars.compile($("#question-template-checkbox").html());
                        var handleRadio = handlebars.compile($("#question-template-radio").html());
                        var questionObject = null;
                        var html = null;

                        $("#questionnaire").empty();
                        for (var i = 0; i < data.questions.length; i++){
                            handlebars.registerHelper("fromOne",function(){
                                return i+1;
                            });
                            handlebars.registerHelper("fromZero",function(){
                                return i;
                            });

                            questionObject = data.questions[i];
                            if (questionObject.isSingle == 1){
                                html = handleRadio(questionObject);
                            }else{
                                html = handleCheckbox(questionObject);
                            }
                            $("#questionList").append(html);
                        }

                        //remove extra checkbox and radio button
                        $("#questionnaireTable").find(".checkbox-inline").each(function(){
                            var checkbox = $(this).text();
                            if (checkbox.trim() == ""){
                                $(this).remove();
                            }
                        });
                        $("#questionnaireTable").find(".radio-inline").each(function(){
                            var radio = $(this).text();
                            if (radio.trim() == ""){
                                $(this).remove();
                            }
                        });

                        // fill out answers in questionnaire relatively
                        var answerString = "";
                        switch (parseInt(questionnaireNo)){
                            case 1 :
                                answerString = data.questionnaire1Answers;
                                break;
                            case 2 :
                                answerString = data.questionnaire2Answers;
                                break;
                            case 3 :
                                answerString = data.questionnaire3Answers;
                                break;
                            case 4 :
                                answerString = data.questionnaire4Answers;
                                break;
                            case 5 :
                                answerString = data.questionnaire5Answers;
                                break;
                        }

                        if (answerString != "" && answerString != null){
                            var answer = answerString.split(";");
                            var singleAnswer = "";

                            for (var i = 0;i < answer.length;i++){
                                var $_radios = $(".J_group_choice").eq(i).find("input");
                                $_radios.each(function(){
                                    singleAnswer = answer[i].split(",");
                                    for (var j = 0;j < singleAnswer.length;j++){
                                        if($(this).val()===singleAnswer[j]){
                                            $(this).attr("checked","checked");
                                        }
                                    }
                                });
                            }
                        }

                        //comment service
                        if ($("#applicationId")){
                            $("#applicationId").val(data.application.applicationId);
                        }
                        if (data.comment != null && data.comment.content != null){
                            var comment = data.comment.content;
                            $("#questionnaireStatus").children().attr("placeholder",comment);

                            if($("#questionnaireStatus").hide()){
                                $("#questionnaireStatus").show();
                            }
                        } else if (answerString == null || answerString == ""){
                            $("#questionnaireStatus").hide();
                        } else {
                            if($("#questionnaireStatus")){
                                $("#questionnaireStatus").children().val("");
                                $("#questionnaireStatus").children().attr("placeholder","如果需要修改问卷调查的答案，请致电免费电话400-XXXX-XXXX联系我们的工作人员");
                                $("#questionnaireStatus").show();
                            }
                        }
                    }
                });
            }

            function show(currentPageIndex) {
                var parameter = "pageIndex=" + currentPageIndex;
                $("#userTextShow").hide();

                $.ajax({
                    type : "get",
                    dataType : "text",
                    url : "userTotalCount",
                    success : function(totalCount, parameter) {
                        // pageination presentation
                        pageinationHandle(totalCount);
                    }
                });
            }

            function pageinationHandle(totalCount, parameter) {
                var pageIndex = 0; // 页面索引初始值
                var pageSize = 10; // 每页显示条数初始化，修改显示条数，修改这里即可

                InitTable(0, parameter); // Load事件，初始化表格数据，页面索引为0（第一页）

                // 分页，PageCount是总条目数，这是必选参数，其它参数都是可选
                $("#pagination").pagination(totalCount, {
                    callback : PageCallback,
                    prev_text : '上一页', // 上一页按钮里text
                    next_text : '下一页', // 下一页按钮里text
                    items_per_page : pageSize, // 显示条数
                    num_display_entries : 6, // 连续分页主体部分分页条目数
                    current_page : pageIndex, // 当前页索引
                    num_edge_entries : 2
                    // 两侧首尾分页条目数
                });

                // 翻页调用
                function PageCallback(index, jq) {
                    InitTable(index);
                }
                // 请求数据
                function InitTable(pageIndex, parameter) {
                    $.ajax({
                        type : "get",
                        dataType : "json",
                        url : 'showApplicants',
                        data : "pageIndex=" + (pageIndex + 1) + "&" + parameter,
                        success : function(data) {
                            var handleHelper = handlebars.registerHelper("addOne",
                                function(index) {
                                    return index + 1;
                                });
                            var handle = handlebars.compile($("#table-template").html());
                            var html = handle(data);
                            $("#userList").empty();
                            $("#userList").append(html);
                        }
                    });
                }

                $("#exportCSV").click(function() {
                    var searchKey = $("#searchKey").text().trim();
                    var searchValue = $("#searchValue").val();
                    var provinceIndex = $("#provinceSelect").val();
                    var cityIndex = $("#citySelect").val();
                    var districtIndex = $("#districtSelect").val();
                    var parameter;

                    if (searchKey == "手机号"){
                        parameter = "cellphone=" + searchValue;
                    }else if (searchKey == "姓名"){
                        parameter = "realName=" + searchValue;
                    }else if (searchKey == "工作单位"){
                        parameter = "company=" + searchValue;
                    }else if (searchKey == "职位"){
                        parameter = "jobTitle=" + searchValue;
                    }else if (searchKey == "电子邮箱"){
                        parameter = "mailbox=" + searchValue;
                    }else if (searchKey == "单位地址"){
                        parameter = "companyAddress=" + searchValue;
                    }

                    parameter = parameter + "&provinceIndex=" + provinceIndex + "&cityIndex=" + cityIndex + "&districtIndex=" + districtIndex;

                    $.ajax({
                        type : "post",
                        dataType : "json",
                        url : "exportCSV",
                        data : parameter,
                        success : function(data) {
                            $('#exportModal').modal('hide');
                            location.href = "/sannong/downloadCsv?csvFileName=" + data.returnValue;
                        }
                    });

                })
            }


            /************************ user-application-form.js ***************************************/
            var myApplication = {};

            myApplication.submitForm = function (saveOrSubmit){
                if (formValidator.getValidator("#answerForm").form() == true){
                    var questionnaireNo = $("#questionnaireNo").val();
                    var answerStatus = questionnaireNo + saveOrSubmit;
                    $("#answerStatus").val(answerStatus);

                    if (saveOrSubmit == 1){
                        $("#myModalTrigger").click();
                    }else{
                        $("#answerForm").ajaxSubmit(function(message) {
                            if (message.result == true){
                                $("#return").click();

                                if ($("#save-success") != null){
                                    $("#save-success").remove();
                                }

                                $("#submit").after('<label id="save-success" class="error" for="jobTitle">已保存</label>');
                            }else{
                                $("#submit").after('<label id="save-error" class="error" for="jobTitle">保存失败</label>');
                            }
                        });
                    }
                }
            }

            $("#dialogSubmit").click(function(event){
                $("#answerForm").ajaxSubmit(function(message) {
                    if (message.result == true){
                        $("#return").click();

                        //更新成功重新加载questionnaire and answer
                        var questionnaireNo = $("#questionnaireNo").val();
                        questionnaire.showQuestions(questionnaireNo);

                        //show comment
                        $("#questionnaireStatus").children().text("如果需要修改问卷调查的答案，请致电免费电话400-XXXX-XXXX联系我们的工作人员");
                        $("#questionnaireStatus").show();
                    }else{
                        if ($("#save-success") != null){
                            $("#save-success").remove();
                        }
                        if ($("#update-error") != null){
                            $("#update-error").remove();
                        }
                        $("#submit").after('<label id="update-error" class="error" for="jobTitle">更新失败</label>');
                    }
                });
                return false;
            });


            $(function() {
                /******* user-profile.js **********/
                region.Controller.saveRegion();
                region.Controller.addProvinces();
                addEventListener();

                /********* user-management.js *************/
                region.Controller.addProvinceSelectionsOnly();
                applicants.Controller.addEventListener();
                show(1);

                // user-application-form.js
                questionnaire.showQuestions(1);

                $("#save").click(function(){
                    myApplication.submitForm(0);
                });

                $("#submit").click(function(){
                    myApplication.submitForm(1);
                });

                $("#q1").click(function(){
                    questionnaire.showQuestions(1);
                });
                $("#q2").click(function(){
                    questionnaire.showQuestions(2);
                });
                $("#q3").click(function(){
                    questionnaire.showQuestions(3);
                });
                $("#q4").click(function(){
                    questionnaire.showQuestions(4);
                });
                $("#q5").click(function(){
                    questionnaire.showQuestions(5);
                });

                /********** user-password.js *************/
                formValidator.getValidator("#myPasswordForm");
            })

            sannong.UserPersonalCenter = userPersonalCenter;
            return userPersonalCenter;
        });
});
