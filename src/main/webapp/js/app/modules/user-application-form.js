/**
 * Created by Bright Huang on 11/6/14.
 */
define(['jquery', 'bootstrap', 'sannong', 'validate',  'formValidator', 'additionalMethods', 'questionnaire', 'jqueryForm', 'eventHandler'],
        function($, bootstrap, sannong, validate, formValidator, additionalMethods, questionnaire, jqueryForm, eventHandler) {

            "use strict";

            var userApplicationForm = {};

            function submitForm(saveOrSubmit){
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

            userApplicationForm.Controller = {
                stage: function(){
                    submitForm(0);
                },
                submitForm: function(){
                    submitForm(1);

                },
                confirmSubmit: function(){
                    $("#answerForm").ajaxSubmit(function(message) {
                        if (message.result == true){
                            $("#return").click();

                            //更新成功重新加载questionnaire and answer
                            var questionnaireNo = $("#questionnaireNo").val();
                            questionnaire.Controller.showQuestionnaireAnswers(questionnaireNo);

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
                },
                q1: function(){
                    questionnaire.Controller.showQuestionnaireAnswers(1);
                },
                q2: function(){
                    questionnaire.Controller.showQuestionnaireAnswers(2);
                },
                q3: function(){
                    questionnaire.Controller.showQuestionnaireAnswers(3);
                },
                q4: function(){
                    questionnaire.Controller.showQuestionnaireAnswers(4);
                },
                q5: function(){
                    questionnaire.Controller.showQuestionnaireAnswers(5);
                }
            };

            function subscribeEvent(){
                eventHandler.subscribe("userApplicationForm:save", userApplicationForm.Controller.stage);
                eventHandler.subscribe("userApplicationForm:submit", userApplicationForm.Controller.submitForm);
                eventHandler.subscribe("userApplicationForm:confirmSubmit", userApplicationForm.Controller.confirmSubmit);

                eventHandler.subscribe("userApplicationForm:q1", userApplicationForm.Controller.q1);
                eventHandler.subscribe("userApplicationForm:q2", userApplicationForm.Controller.q2);
                eventHandler.subscribe("userApplicationForm:q3", userApplicationForm.Controller.q3);
                eventHandler.subscribe("userApplicationForm:q4", userApplicationForm.Controller.q4);
                eventHandler.subscribe("userApplicationForm:q5", userApplicationForm.Controller.q5);
            }


            /*************************
             * DOM ready function
             ************************/
            $(function() {
                subscribeEvent();
            })


            sannong.UserApplicationForm = userApplicationForm;
            return userApplicationForm;

});
