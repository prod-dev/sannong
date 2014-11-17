/**
 * Created by Bright Huang on 10/26/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'handlebars', 'sannong', 'validate', 'ajaxHandler', 'questionnaire', 'jqueryForm', 'formValidator', 'region', 'additionalMethods'],
        function($, bootstrap, handlebars, sannong, validate, ajaxHandler, questionnaire, jqueryForm, formValidator, region, additionalMethods) {

    "use strict";

    var projectApplication = {};
    projectApplication.Model = {
        cellphoneError: '<label id="cellphone-error" class="error" for="cellphone" style="display: inline-block;">手机号码已存在</label>'
    };
    projectApplication.View = {
        cellphone: $("#cellphone"),
        cellphoneError: $("#cellphone-error")
    };


    function showValidationError(){
        projectApplication.View.cellphoneError.remove();
        projectApplication.View.cellphone.removeClass("error");
        projectApplication.View.cellphone.after(projectApplication.Model.newCellphoneError);
        projectApplication.View.cellphone.addClass("error");
    }

    function sendValidationCode(){
        var options = {
            url: 'sendValidationCode',
            type: 'POST',
            data: {mobile: $("#cellphone").val()},
            success: function(data){
                if (data != "") {
                    $("#validationCode").removeAttr("disabled");
                } else {
                    $("#validationCode").attr({disabled: "disabled"});
                }
            },
            fail: function(data){
                $("#validationCode").attr({disabled: "disabled"});
            }

        }
        ajaxHandler.sendRequest(options);
    }

    projectApplication.Controller = {
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

            $("#action-send-code").click(function(event){
                ajaxHandler.sendRequest({
                    type: "GET",
                    url: "validateUniqueCellphone",
                    data:{cellphone: $("#cellphone").val()},
                    success: function(response){
                        if (response == true){
                            if (formValidator.getValidator("#applicationForm").form() == true ){
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
