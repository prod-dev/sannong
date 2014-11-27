/**
 * Created by Bright Huang on 11/6/14.
 */
require(['../main'], function () {
    require(['jquery', 'bootstrap', 'sannong', 'validate',  'formValidator', 'additionalMethods', 'questionnaire', 'jqueryForm', 'sidebar'],
        function($, bootstrap, sannong, validate, formValidator, additionalMethods, questionnaire, jqueryForm, sidebar) {

            "use strict";

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

            });

            sannong.MyApplication = myApplication;
            return myApplication;
        });
});