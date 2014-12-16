/**
 * Created by Bright Huang on 11/6/14.
 */

define(['jquery', 'bootstrap', 'handlebars', 'sannong', 'validate', 'ajaxHandler', 'formValidator',
        'additionalMethods', 'pagination', 'selector', 'jqueryForm', 'eventHandler'],
        function($, bootstrap, handlebars, sannong, validate, ajaxHandler, formValidator,
                 additionalMethods, pagination, selector, jqueryForm, eventHandler) {

            "use strict";
            var searchParams = "";
            var userManagement = {};

            userManagement.Model = {
                currentEditUser: ""
            };

            userManagement.View = {
                userProfileEditView: $("#userProfileEditView"),
                questionnaireTable: $("#questionnaireTable"),
                searchBar: $("#searchBar"),
                userManagementTitle: $("#user-management-title"),
                userTextShow: $("#userTextShow"),
                userManagementTable: $("#userManagementTable"),
                userProfileCancel: $("#userProfileCancel"),
                emptyUserProfileEditView: function(){
                    $("#userProfileEditView").empty();
                },
                showUserProfileEditView: function(){
                    userManagement.View.questionnaireTable.hide();
                    userManagement.View.userManagementTitle.hide();
                    userManagement.View.userTextShow.hide();
                    userManagement.View.searchBar.hide();
                    userManagement.View.userManagementTable.hide();
                    userManagement.View.userProfileEditView.show();
                },
                resetView: function(){
                    userManagement.View.userManagementTitle.show();
                    userManagement.View.userManagementTable.show();
                    userManagement.View.searchBar.show();
                    userManagement.View.questionnaireTable.hide();
                    userManagement.View.userTextShow.hide();
                    userManagement.View.userProfileEditView.hide();
                },
                showQuestionnaire: function(questionnaireNo){
                    $("#questionnaireNo").val(questionnaireNo);
                    $("#userTextShow").show();
                    $("#user-management-title").hide();
                    $("#userManagementTable").hide();
                    $("#questionnaireTable").show();
                    $("#questionnaireStatus").show();

                    if ($("#questionnaireTable").show()) {
                        $("#questionList").empty();
                    }

                    if ($(".steps")){
                        $(".no").each(function(){
                            $(this).parent().removeClass("active");

                            if ($(this).text() == questionnaireNo){
                                $(this).parent().addClass("active");
                            }
                        })
                    }

                    if ($(".error")) {
                        $(".error").empty();
                    }
                },
                renderQuestionnaireView: function(questionnaireNo, data){
                    var answerStatus = data.answerStatus,
                        answerStatusStr = answerStatus.toString(),
                        latestQuestionnaireNo = parseInt(answerStatusStr.substring(0, 1)),
                        saveOrSubmit = answerStatusStr.substring(1, 2);

                    // about when admin can update user's questionnaire
                    if(parseInt(questionnaireNo) > latestQuestionnaireNo){
                        $("#update").removeClass("orange-bt-small").addClass("gray-bt-small");
                        $("#update").attr("disabled",true);
                    }else{
                        $("#update").removeClass("gray-bt-small").addClass("orange-bt-small");
                        $("#update").attr("disabled",false);
                    }

                    if (data.applicant != null) {
                        $("#userName").val(data.applicant.userName);
                        $("#userRealName").text(data.applicant.realName);
                        $("#userTextShow").show();
                    }

                    //fill out questionnaire
                    var handleCheckbox = handlebars.compile($("#question-template-checkbox").html()),
                        handleRadio = handlebars.compile($("#question-template-radio").html()),
                        questionObject = null,
                        html = null;

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
                    $("#questionnaireTable").find(".checkboxCustom").each(function(){
                        var checkbox = $(this).text();
                        if (checkbox.trim() == ""){
                            $(this).remove();
                        }
                    });
                    $("#questionnaireTable").find(".radioCustom").each(function(){
                        var radio = $(this).text();
                        if (radio.trim() == ""){
                            $(this).remove();
                        }
                    });

                    $('.radioCustom input').click(function () {
                        $(this).parents(".radioRow").find(".radioCustom").removeClass("radioCustom-checked");
                        $(this).parent(".radioCustom").addClass("radioCustom-checked");
                    });

                    $('.checkboxCustom').click(function () {
                        $(this).toggleClass('checkboxCustom-checked');
                        var $checkbox = $(this).find(':checkbox');
                        $checkbox.attr('checked', !$checkbox.attr('checked'));
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
                            var $_radiosOrCheckboxs = $(".J_group_choice").eq(i).find("input");
                            $_radiosOrCheckboxs.each(function(){
                                singleAnswer = answer[i].split(",");
                                for (var j = 0;j < singleAnswer.length;j++){
                                    if($(this).val()===singleAnswer[j]){
                                        if ($(this).parent(".radioCustom")){
                                            $(this).parent(".radioCustom").addClass("radioCustom-checked");
                                        }
                                        if ($(this).parent(".checkboxCustom")){
                                            $(this).parent(".checkboxCustom").toggleClass("checkboxCustom-checked");
                                            $(this).attr("checked", "checked");
                                        }
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
                        $("#questionnaireStatus").children().val("");
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

            };

            userManagement.Controller = {
                retrieve: function() {
                    var searchKey = $("#searchKey").val();
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
                    var provinceIndex = $("#provinceQuerySelect").val();
                    var cityIndex = $("#cityQuerySelect").val();
                    var districtIndex = $("#districtQuerySelect").val();

                    parameter = parameter + "&provinceIndex=" + provinceIndex + "&cityIndex=" + cityIndex + "&districtIndex=" + districtIndex;
                    //parameter = "realName=william&provinceIndex=&cityIndex=&districtIndex=";
                    searchParams = parameter;

                    $.ajax({
                        type : "get",
                        dataType : "text",
                        url : "userTotalCount",
                        data : parameter,
                        success : function(totalCount) {
                            // pagination and data list presentation
                            paginationHandle(totalCount, parameter);
                        }
                    });
                },
                cancel: function () {
                    userManagement.View.userTextShow.hide();
                    $("#questionnaireTable").hide();
                    $("#userManagementTable").show();
                    $("#searchBar").show();
                    $("#user-management-title").show();
                    $("#questionnaireTab li").removeClass("active")
                    $("#questionnaireTab li:first-child").addClass("active");
                },
                update: function () {
                    if (formValidator.getValidator("#answerForm").form() == true){
                        $("#myModalTrigger").click();
                    }
                },
                submit: function(event){
                    $("#answerForm").ajaxSubmit(function(message) {
                        if (message.result == true){
                            $("#return").click();
                        }else{
                            alert("更新失败！");
                        }
                    });
                    return false;
                },
                previous: function(){
                    $("#previous").addClass("activeBt");
                    $("#next").addClass("activeBt");
                    var currentPage = $("#currentPage").text();
                    var previousPage = parseInt(currentPage) - 1;

                    if (currentPage == 1){
                        $("#previous").removeClass("activeBt");
                        return;
                    }
                    if (previousPage == 1){
                        $("#previous").removeClass("activeBt");
                    }

                    var pageIndex = parseInt(currentPage) - 1;
                    $("#currentPage").text(pageIndex);
                    InitTable(pageIndex, searchParams);
                },
                next: function(){
                    $("#previous").addClass("activeBt");
                    $("#next").addClass("activeBt");
                    var currentPage = $("#currentPage").text();
                    var nextPage = parseInt(currentPage) + 1;
                    var totalPage = $("#totalPage").text();

                    if (currentPage == totalPage){
                        $("#next").removeClass("activeBt");
                        return;
                    }
                    if (nextPage == totalPage){
                        $("#next").removeClass("activeBt");
                    }

                    var pageIndex = parseInt(currentPage) + 1;
                    $("#currentPage").text(pageIndex);
                    InitTable(pageIndex, searchParams);
                },
                exportCSV: function() {
                    var searchKey = $("#searchKey").val(),
                        searchValue = $("#searchValue").val(),
                        provinceIndex = $("#provinceQuerySelect").val(),
                        cityIndex = $("#cityQuerySelect").val(),
                        districtIndex = $("#districtQuerySelect").val(),
                        parameter;

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
                },
                q1: function(){
                    userManagement.Controller.showQuestionnaireAnswers(1,"");
                },
                q2: function(){
                    userManagement.Controller.showQuestionnaireAnswers(2,"");
                },
                q3: function(){
                    userManagement.Controller.showQuestionnaireAnswers(3,"");
                },
                q4: function(){
                    userManagement.Controller.showQuestionnaireAnswers(4,"");
                },
                q5: function(){
                    userManagement.Controller.showQuestionnaireAnswers(5,"");
                },
                renderUserProfileEditView: function(userName, viewName){
                    ajaxHandler.sendRequest({
                        type: "GET",
                        url: "user-personal-center/user-profile",
                        data:{userName: userName},
                        success: function(response){
                            if (response.statusCode < 2000){
                                var userProfileViewHandler = handlebars.compile($("#user-profile-template").html());
                                var html = userProfileViewHandler(response.models.userProfile);
                                $(viewName).empty();
                                $(viewName).append(html);

                                selector.View.addCityOptions(viewName + " #citySelect", response.models.cities);
                                selector.View.addDistrictOptions(viewName + " #districtSelect", response.models.districts);
                                selector.View.selectOption(viewName + " #provinceSelect", response.models.userProfile.companyProvince);
                                selector.View.selectOption(viewName + " #citySelect", response.models.userProfile.companyCity);
                                selector.View.selectOption(viewName + " #districtSelect", response.models.userProfile.companyDistrict);

                                selector.initSelect('select', {
                                    provinceOption: {
                                        value: response.models.userProfile.companyProvince,
                                        text: $("#provinceSelect option:selected").text()
                                    },
                                    cityOption: {
                                        value: response.models.userProfile.companyCity,
                                        text: $("#citySelect option:selected").text()
                                    },
                                    districtOption: {
                                        value: response.models.userProfile.companyDistrict,
                                        text: $("#districtSelect option:selected").text()
                                    }
                                });

                                if (viewName == "#userProfileEditView"){
                                    $("#userProfileCancel").removeClass("hidden");
                                    $("#userProfileCancel").click(function () {
                                        userManagement.Model.currentEditUser = "";
                                        userManagement.View.resetView();
                                    });
                                }
                            }
                        },
                        fail: function(){
                        }
                    });
                },
                editUserProfile: function(userName){
                    userManagement.Model.currentEditUser = userName;
                    userManagement.View.showUserProfileEditView();
                    userManagement.Controller.renderUserProfileEditView(userName, "#userProfileEditView");
                },
                showQuestionnaireAnswers: function (questionnaireNo, cellphone) {
                    // before initial table
                    userManagement.View.showQuestionnaire(questionnaireNo);

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
                        data : "questionnaireNo=" + questionnaireNo + "&cellphone=" + userCellphone,
                        success : function(data) {
                            userManagement.View.renderQuestionnaireView(questionnaireNo, data);
                        }
                    });
                }
            }


            /************************************************************
             *
             * Private functions
             *
             ************************************************************/
            function show(currentPageIndex) {
                var parameter = "pageIndex=" + currentPageIndex;
                $("#userTextShow").hide();

                $.ajax({
                    type : "get",
                    dataType : "text",
                    url : "userTotalCount",
                    success : function(totalCount, parameter) {
                        // pagination presentation
                        paginationHandle(totalCount);
                    }
                });
            }

            function paginationHandle(totalCount, parameter) {
                var pageIndex = 0;
                var pageSize = 10;

                //初始化分页
                $("#totalPage").text(Math.ceil(totalCount/pageSize));

                //加载表格数据
                InitTable(1, parameter);
            }

            function InitTable(pageIndex, parameter) {
                $.ajax({
                    type : "get",
                    dataType : "json",
                    url : 'showApplicants',
                    data : "pageIndex=" + pageIndex + "&" + parameter,
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

            function init(){
                eventHandler.subscribe("userManagement:cancel", userManagement.Controller.cancel);
                eventHandler.subscribe("userManagement:update", userManagement.Controller.update);
                eventHandler.subscribe("userManagement:submit", userManagement.Controller.submit);
                eventHandler.subscribe("userManagement:retrieve", userManagement.Controller.retrieve);
                eventHandler.subscribe("userManagement:previous", userManagement.Controller.previous);
                eventHandler.subscribe("userManagement:next", userManagement.Controller.next);
                eventHandler.subscribe("userManagement:exportCSV", userManagement.Controller.exportCSV);
                eventHandler.subscribe("userManagement:q1", userManagement.Controller.q1);
                eventHandler.subscribe("userManagement:q2", userManagement.Controller.q2);
                eventHandler.subscribe("userManagement:q3", userManagement.Controller.q3);
                eventHandler.subscribe("userManagement:q4", userManagement.Controller.q4);
                eventHandler.subscribe("userManagement:q5", userManagement.Controller.q5);
            }


            /**
             * DOM ready function
             */
            $(function() {
                init();
                show(1);
            })

            sannong.UserManagement = userManagement;
            return userManagement;
});