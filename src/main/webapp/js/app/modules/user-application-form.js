/**
 * Created by Bright Huang on 11/6/14.
 */
define(['jquery', 'bootstrap', 'sannong', 'validate',  'formValidator', 'additionalMethods', 'questionnaire', 'jqueryForm'],
        function($, bootstrap, sannong, validate, formValidator, additionalMethods, questionnaire, jqueryForm) {

            "use strict";

            var userApplicationForm = {};

            userApplicationForm.submitForm = function (saveOrSubmit){
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
                                
                                $("#questionnaireSubmit").after('<label id="save-success" class="error" for="jobTitle">已保存</label>');
                            }else{
                                $("#questionnaireSubmit").after('<label id="save-error" class="error" for="jobTitle">保存失败</label>');
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
                        $("#questionnaireSubmit").after('<label id="update-error" class="error" for="jobTitle">更新失败</label>');
                    }
                });
                return false;
            });

            $("#save").click(function(){
                userApplicationForm.submitForm(0);
            });

            $("#questionnaireSubmit").click(function(){
                userApplicationForm.submitForm(1);
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
            
            $(function() {
                // questionnaire.showQuestions(1);
            });

            sannong.UserApplicationForm = userApplicationForm;
            return userApplicationForm;

});
