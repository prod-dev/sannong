/**
 * Created by Bright Huang on 11/6/14.
 */

define(['jquery', 'sannong', 'handlebars'], function($, sannong, handlebars) {

    "use strict";

    var questionnaire = {};

    questionnaire.showQuestionnaire = function(){
    	$.ajax({
            type: "get",
            dataType: "json",
            url: 'questionAndAnswer',
            data: "questionnaireNo=1",
            success: function(data) {
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
                	$("#questionnaire").append(html);
                }

                //remove extra checkbox and radio button
                $("#questionnaire").find(".checkbox-inline").each(function(){
                    var checkbox = $(this).text();
                    if (checkbox.trim() == ""){
                        $(this).remove();
                    }
                });
                $("#questionnaire").find(".radio-inline").each(function(){
                    var radio = $(this).text();
                    if (radio.trim() == ""){
                        $(this).remove();
                    }
                });
            }
    	});
    }
    
    questionnaire.showQuestions = function(questionnaireNo){

        $("#buttonGroup").show();
        $("#save").removeAttr("disabled");
        $("#submit").removeAttr("disabled");
        
        if ($("#save-success") != null){
        	$("#save-success").remove();
        }
        
        if ($("#update-success") != null){
        	$("#update-success").remove();
        }

        if ($("#q" + questionnaireNo).parent().hasClass("disabled")) {
            $("#questionnaire").empty();
            $("#buttonGroup").hide();
            return false;
        }

        $("#questionnaireNo").val(questionnaireNo);
        var questionnaireNo = parseInt(questionnaireNo);

        $.ajax({
            type: "get",
            dataType: "json",
            url: 'questionAndAnswer',
            data: "questionnaireNo=" + questionnaireNo,
            success: function(data) {

                //判断哪些选项卡不可用
                var answerStatus = data.answerStatus;
                var answerStatusStr =  answerStatus.toString();
                var latestQuestionnaireNo = parseInt(answerStatusStr.substring(0,1));
                var saveOrSubmit = answerStatusStr.substring(1,2);
                var currentQuestionnaireNo = questionnaireNo;
                var radioStatus = 1;  //1:submit 0:save 默认提交状态，radio不可用
                
                if ($("#questionnaireStatus")){
                	$("#questionnaireStatus").hide();
                }

                if (currentQuestionnaireNo == latestQuestionnaireNo && saveOrSubmit == 0){
                    radioStatus = 0;

                    //当前选项卡中的button enabled
                    $("#save").attr("disabled",false);
                    $("#submit").attr("disabled",false);

                    //之后选项卡不可用
                    if (currentQuestionnaireNo != 5){
                        var nextQuestionnaireNo = currentQuestionnaireNo + 1;
                        for (var i=nextQuestionnaireNo;i<6;i++){
                            if ($("#q" + i).parent().hasClass("active")){
                                $("#q" + i).parent().removeClass("active").addClass("disabled");
                            }else{
                                $("#q" + i).parent().addClass("disabled");
                            }
                        }
                    }
                }else if(currentQuestionnaireNo < latestQuestionnaireNo && saveOrSubmit == 0){
                    radioStatus = 1;

                    //当前选项卡中的button disabled
                    $("#save").attr("disabled","disabled");
                    $("#submit").attr("disabled","disabled");

                    //大于latestQuestionnaireNo之后的选项卡不可用
                    if (latestQuestionnaireNo != 5){
                        var nextQuestionnaireNo = latestQuestionnaireNo + 1;
                        for (var i=nextQuestionnaireNo;i<6;i++){
                            if ($("#q" + i).parent().hasClass("active")){
                                $("#q" + i).parent().removeClass("active").addClass("disabled");
                            }else{
                                $("#q" + i).parent().addClass("disabled");
                            }
                        }
                    }
                }else if (currentQuestionnaireNo == latestQuestionnaireNo && saveOrSubmit == 1){
                    radioStatus = 1;

                    //当前选项卡中的button disabled
                    $("#save").attr("disabled","disabled");
                    $("#submit").attr("disabled","disabled");

                    //下一个选项卡可用
                    if ($("#q" + (currentQuestionnaireNo + 1).toString()).parent().hasClass("disabled")){
                        $("#q" + (currentQuestionnaireNo + 1).toString()).parent().removeClass("disabled");
                    }

                    //之后第二个开始不可用
                    if (latestQuestionnaireNo < 4){
                        var nextQuestionnaireNo = parseInt(latestQuestionnaireNo) + 2;
                        for (var i=nextQuestionnaireNo;i<6;i++){
                            if ($("#q" + i).parent().hasClass("active")){
                                $("#q" + i).parent().removeClass("active").addClass("disabled");
                            }else{
                                $("#q" + i).parent().addClass("disabled");
                            }
                        }
                    }
                }else if(currentQuestionnaireNo < latestQuestionnaireNo && saveOrSubmit == 1){
                    radioStatus = 1;

                    //当前选项卡中的button disabled
                    $("#save").attr("disabled","disabled");
                    $("#submit").attr("disabled","disabled");

                    //大于latestQuestionnaireNo(之后+1)的选项卡不可用
                    if (latestQuestionnaireNo != 5){
                        var nextQuestionnaireNo = latestQuestionnaireNo + 2;
                        if (nextQuestionnaireNo <= 6){
                            for (var i=nextQuestionnaireNo;i<6;i++){
                                if ($("#q" + i).parent().hasClass("active")){
                                    $("#q" + i).parent().removeClass("active").addClass("disabled");
                                }else{
                                    $("#q" + i).parent().addClass("disabled");
                                }
                            }
                        }
                    }
                }

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
                	$("#questionnaire").append(html);
                }

                //remove extra checkbox and radio button
                $("#questionnaire").find(".checkbox-inline").each(function(){
                    var checkbox = $(this).text();
                    if (checkbox.trim() == ""){
                        $(this).remove();
                    }
                });
                $("#questionnaire").find(".radio-inline").each(function(){
                    var radio = $(this).text();
                    if (radio.trim() == ""){
                        $(this).remove();
                    }
                });

                //fill out answers in questionnaire relatively
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

                if (answerString != "" && answerString != null){
                    var answer = answerString.split(";");
                    var singleAnswer = "";
                    
                    for (var i = 0;i < answer.length;i++){
                        var $_radios = $(".J_group_choice").eq(i).find("input");
                        $_radios.each(function(){
                            if (radioStatus == 1){
                                $(this).attr("disabled","disabled");
                            }
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
                if (data.comment != null && data.comment.content != null){
                	var comment = data.comment.content;
                	if($("#questionnaireStatus")){
                		$("#questionnaireStatus").children().text(comment);
                		$("#questionnaireStatus").show();
                	}
                } else if (answerString == null || answerString == ""){
                	$("#questionnaireStatus").hide();
                } else{
                	if($("#questionnaireStatus")){
                		if (!(currentQuestionnaireNo == latestQuestionnaireNo && saveOrSubmit == 0)){
                			$("#questionnaireStatus").children().text("如果需要修改问卷调查的答案，请致电免费电话400-XXXX-XXXX联系我们的工作人员");
                			$("#questionnaireStatus").show();
                		}
                	}
                }
            }
        });

    };

    sannong.Questionnaire = questionnaire;
    return questionnaire;

});