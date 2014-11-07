/**
 * Created by Bright Huang on 11/6/14.
 */
require(['../main'], function () {
    require(['jquery', 'bootstrap', 'sannong', 'validate',  'formValidator', 'additionalMethods', 'questionnaire', 'jqueryForm'],
        function($, bootstrap, sannong, validate, formValidator, additionalMethods, questionnaire, jqueryForm) {

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

                                $("#submit").after('<label id="save-success" class="error" for="jobTitle">已保存</label>');

                                //保存成功重新加载questionnaire and answer
                                questionnaire.showQuestions(questionnaireNo);
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

                        $("#save-success").empty();
                        $("#submit").after('<label id="update-success" class="error" for="jobTitle">更新成功</label>');

                        //更新成功重新加载questionnaire and answer
                        var questionnaireNo = $("#questionnaireNo").val();
                        questionnaire.showQuestions(questionnaireNo);
                    }else{
                        $("#save-success").empty();
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