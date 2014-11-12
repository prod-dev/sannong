/**
 * Created by Bright Huang on 10/26/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'handlebars', 'sannong', 'validate', 'ajaxHandler', 'questionnaire', 'jqueryForm', 'formValidator', 'region', 'additionalMethods'],
        function($, bootstrap, handlebars, sannong, validate, ajaxHandler, questionnaire, jqueryForm, formValidator, region, additionalMethods) {

    "use strict";

    var projectApplication = {};
    projectApplication.Model = {};
    projectApplication.View = {};

    var showError = function($obj, txt) {
        var $td = $obj.parent();
        $td.find("#errorDiv").removeAttr("style").text(txt);
        $("#applicationSubmit").attr("disabled","true");
    };

    projectApplication.Controller = {
        timeRemained: 0,
        updateTimeLabel:function(duration) {
            projectApplication.Controller.timeRemained = duration;
            var timer = setInterval(function() {
                $("#action-send-code").val( projectApplication.Controller.timeRemained + '秒后重新发送');
                projectApplication.Controller.timeRemained -= 1;
                if ( projectApplication.Controller.timeRemained == -1) {
                    clearInterval(timer);
                    $("#action-send-code").val('重新发送').removeAttr('disabled').removeClass("gray");
                }
            }, 1000);
        },
        addEventListener: function(){
            $("#provinceSelect").change(function(event){
                region.Controller.addCities();
            });

            $("#citySelect").change(function(event){
                $('#districtSelect option').remove();
                region.Controller.addDistricts();
            });

            $("#applicationSubmit").click(function(event){
                if ((formValidator.getValidator("#applicationForm").form() == true) && $("#applicationSubmit").attr("disabled") != "disabled"){
                    $("#myModalTrigger").click();
                }
            });

            $("#confirmedSubmit").click(function(event){
                $("#applicationForm").submit();
            });


            $("#validationCode").keyup(function(){
                if($("#validationCode").val().length < 4){ return; }
            	var options = {
                    type: "get",
                    async: false,
                    url: 'validateSMSCode',
                    data: {
                        "validationcode": $("#validationCode").val()
                    },
                    success: function(data) {
                        $("#applicationSubmit").removeAttr("disabled");
                        /*
                         $("#errorDiv").css("display","none");
                        if(data == 0){
                            showError($("#validationCode"), '验证码错误');
                        }
                        if(data==1){
                            showError($("#validationCode"), '验证码过期，请重新获取验证码');
                        }
                        if(data==2){
                            $("#applicationSubmit").removeAttr("disabled");
                        }
                        */

                    }
                };

                ajaxHandler.sendRequest(options);

                if (formValidator.getValidator("#applicationForm").element($("#validationCode")) == true && $("#validationCode").val() != ""){
                    $("#applicationSubmit").removeAttr("disabled");
                    $("#applicationSubmit").removeClass().addClass("btn btn-success");
                } else {
                    $("#applicationSubmit").attr({disabled: "disabled"});
                    $("#applicationSubmit").removeClass().addClass("btn btn-default");
                }

            });

            $("#action-send-code").click(function(event){
               if (formValidator.getValidator("#applicationForm").form() == true){
                    var options = {
                        url: 'sendValidationCode',
                        type: 'GET',
                        data: {
                            mobile: $("#cellphone").val(),
                            smstype: $(this).attr("data-type")
                        },
                        success: function(data){

                            $("#validationCode").removeAttr("disabled");
                            /*
                             if (data != "") {
                                  projectApplication.Controller.updateTimeLabel(60);
                             } else {
                                $( this).val('重新发送').removeAttr('disabled').removeClass("gray");
                            }
                            */
                        },
                        fail: function(data){
                            $(this).val('重新发送').removeAttr('disabled').removeClass("gray");
                        }

                    }
                   ajaxHandler.sendRequest(options);
                }
            });
        }
    };

    $(function() {
        questionnaire.showQuestions(1);
        region.Controller.addProvinces();
        projectApplication.Controller.addEventListener();

    });

    sannong.ProjectApplication = projectApplication;
    return projectApplication;

    });
});
