/**
 * Created by Bright Huang on 11/6/14.
 */

define(['jquery', 'sannong', 'handlebars'], function($, sannong, handlebars) {

    "use strict";

    if(!String.prototype.trim){
    	String.prototype.trim = function() {
    		return this.replace(/(^\s*)|(\s*$)/g, "");
    	}
    }
    
    var questionnaire = {};

    questionnaire.getAnswers = function(questionnaireNo, data){
        var answerString = "";
        switch (questionnaireNo){
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
        return answerString;
    }

    questionnaire.View = {
        resetQuestionnaireView: function(questionnaireNo){
            if ($("#q" + questionnaireNo).parent().hasClass("disabled")) {
                $("#questionnaire").empty();
                $("#buttonGroup").hide();
                $("#questionnaireStatus").hide();
                $("#submitStatus").hide();
                return false;
            }

            $("#buttonGroup").show();
            $("#submitStatus").show();
            $("#save").removeAttr("disabled");
            $("#questionnaireSubmit").removeAttr("disabled");

            $("#save-success").remove();
            $("#save-error").remove();
            $("#update-success").remove();
            $("#update-error").remove();

            if ($(".steps")){
                $(".no").each(function(){
                    $(this).parent().removeClass("active");

                    if ($(this).text() == questionnaireNo){
                        $(this).parent().addClass("active");
                    }
                })
            }
        },
        renderQuestionnaireView: function(data){
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
                $("#questionnaire").append(html);
            }

            $("#questionnaire").find(".checkboxCustom").each(function(){
                var checkbox = $(this).text();
                if (checkbox.trim() == ""){
                    $(this).remove();
                }
            });

            $("#questionnaire").find(".radioCustom").each(function(){
                var radio = $(this).text();
                if (radio.trim() == ""){
                    $(this).remove();
                }
            });

            $('#questionnaire .radioCustom input').click(function () {
                $(this).parents(".radioRow").find(".radioCustom").removeClass("radioCustom-checked");
                $(this).parent(".radioCustom").addClass("radioCustom-checked");
            });

            $('#questionnaire .checkboxCustom').click(function () {
                $(this).toggleClass('checkboxCustom-checked');
                var $checkbox = $(this).find(':checkbox');
                $checkbox.attr('checked', !$checkbox.attr('checked'));
            });

        },
        disableSubsequentTab: function(nextQuestionnaireNo){
            //之后选项卡不可用
            for (var i = nextQuestionnaireNo; i < 6; i++){
                if ($("#q" + i).parent().hasClass("active")){
                    $("#q" + i).parent().removeClass("active").addClass("disabled");
                }else{
                    $("#q" + i).parent().addClass("disabled");
                }
                $("#q" + i).removeAttr("data-toggle").removeClass("meta-event-source");
                $("#q" + i).parent().attr("data-toggle","tooltip").attr("title","请顺序完成问卷题集");
            }
            $("[data-toggle='tooltip']").tooltip();
        },
        enableSaveButtons: function(){
            //当前选项卡中的button enabled
            $("#save").attr("disabled",false);
            $("#save").removeClass("gray-bt-small").addClass("white-bt");

            $("#questionnaireSubmit").attr("disabled",false);
            $("#questionnaireSubmit").removeClass("gray-bt-small").addClass("orange-bt-small");
        },
        disableSaveButtons: function(){
            //当前选项卡中的button disabled
            $("#save").attr("disabled","disabled");
            $("#save").removeClass("white-bt").addClass("gray-bt-small");

            $("#questionnaireSubmit").attr("disabled","disabled");
            $("#questionnaireSubmit").removeClass("orange-bt-small").addClass("gray-bt-small");
        },
        enableNextTab: function(currentQuestionnaireNo){
            //下一个选项卡可用
            if ($("#q" + (currentQuestionnaireNo + 1).toString()).parent().hasClass("disabled")){
                $("#q" + (currentQuestionnaireNo + 1).toString()).parent().removeClass("disabled");
                $("#q" + (currentQuestionnaireNo + 1).toString()).attr("data-toggle","tab").addClass("meta-event-source");
                $("#q" + (currentQuestionnaireNo + 1).toString()).parent().removeAttr("data-toggle").removeAttr("title").removeAttr("data-original-title");
            }

        },
        fillAnswers: function(questionnaireNo, answerString, disableAnswerOptions){
            if (answerString != "" && answerString != null){
                var answer = answerString.split(";");
                var singleAnswer = "";

                for (var i = 0;i < answer.length;i++){
                    var $_radios = $(".J_group_choice").eq(i).find("input");
                    $_radios.each(function(){
                        if (disableAnswerOptions == true){
                            $(this).attr("disabled","disabled");
                        }
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
        },
        renderQuestionnaireComments: function(data, answerStatus){
            if (data.comment != null && data.comment.content != null && data.comment.content != ""){
                var comment = data.comment.content;
                if($("#questionnaireStatus")){
                    $("#questionnaireStatus").text(comment);
                    $("#questionnaireStatus").show();
                }
            } else if (answerStatus == 51){
                $("#questionnaireStatus").text("您的申请正在审核中。请保存手机畅通，我们的工作人员会尽快联系您。");
                $("#questionnaireStatus").show();
            } else{
                $("#questionnaireStatus").text("请完成所有问卷调查，然后我们的工作人员会第一时间联系您。");
                $("#questionnaireStatus").show();
            }
        },
        renderQuestionnaireAnswers: function(questionnaireNo, data){
            // answerStatus: 10, 11, 20, 21, 30, 31, 40, 41, 50, 51
            // the first digit represent questionnaire page number, it indicates how many questionnaire were done.
            // the second digit represent questionnaire completion status, 0 means temporarily saved, 1 means questionnaire was finished.
            var answerStatus = data.answerStatus,
                answerStatusStr =  answerStatus.toString(),
                latestQuestionnaireNo = parseInt(answerStatusStr.substring(0,1), 10),
                stageOrCommit = answerStatusStr.substring(1,2),//stage: 问卷暂存, commit: 问卷提交
                currentQuestionnaireNo = questionnaireNo,
                disableAnswerOptions = true;

            if (currentQuestionnaireNo == latestQuestionnaireNo && stageOrCommit == 0){         // 当前页面是填写的最大问卷, 暂存状态
                disableAnswerOptions = false;
                questionnaire.View.enableSaveButtons();
                questionnaire.View.disableSubsequentTab(currentQuestionnaireNo + 1);
            }else if(currentQuestionnaireNo < latestQuestionnaireNo && stageOrCommit == 0){     // 当前页面小于填写的最大问卷, 暂存状态
                disableAnswerOptions = true;
                questionnaire.View.disableSaveButtons();
                questionnaire.View.disableSubsequentTab(latestQuestionnaireNo + 1);
            }else if (currentQuestionnaireNo == latestQuestionnaireNo && stageOrCommit == 1){   // 当前页面是填写的最大问卷, 提交状态
                disableAnswerOptions = true;
                questionnaire.View.disableSaveButtons();
                questionnaire.View.enableNextTab(currentQuestionnaireNo);
                //之后第二个开始不可用
                questionnaire.View.disableSubsequentTab(currentQuestionnaireNo + 2);
            }else if(currentQuestionnaireNo < latestQuestionnaireNo && stageOrCommit == 1){     // 当前页面小于填写的最大问卷, 提交状态
                disableAnswerOptions = true;
                questionnaire.View.disableSaveButtons();
                questionnaire.View.disableSubsequentTab(latestQuestionnaireNo + 2);
            }else if (currentQuestionnaireNo == (latestQuestionnaireNo + 1) && stageOrCommit == 1){
                disableAnswerOptions = false;
                questionnaire.View.enableSaveButtons();
                questionnaire.View.disableSubsequentTab(currentQuestionnaireNo + 1);
            }else{
                return;
            }

            questionnaire.View.renderQuestionnaireView(data);

            var answerString = questionnaire.getAnswers(questionnaireNo, data);
            questionnaire.View.fillAnswers(questionnaireNo, answerString, disableAnswerOptions);

            questionnaire.View.renderQuestionnaireComments(data, answerStatus);

        }
    };

    questionnaire.Controller = {
        showProjectQuestionnaire: function(){
            $.ajax({
                type: "get",
                dataType: "json",
                url: 'questionAndAnswer',
                data: "questionnaireNo=1&flag=1",
                success: function(data) {
                    questionnaire.View.renderQuestionnaireView(data);
                }
            });
        },
        showQuestionnaireAnswers: function(questionnaireNo) {
            questionnaire.View.resetQuestionnaireView(questionnaireNo);

            $("#questionnaireNo").val(questionnaireNo);
            var questionnaireNo = parseInt(questionnaireNo);

            $.ajax({
                type: "get",
                dataType: "json",
                url: 'questionAndAnswer',
                data: "questionnaireNo=" + questionnaireNo,
                success: function(data) {
                    questionnaire.View.renderQuestionnaireAnswers(questionnaireNo, data);
                }
            });
        }
    };

    sannong.Questionnaire = questionnaire;
    return questionnaire;

});
