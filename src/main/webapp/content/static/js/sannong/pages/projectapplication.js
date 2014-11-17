/**
 * Created by Bright Huang on 10/26/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'handlebars', 'sannong', 'validate', 'ajaxHandler', 'questionnaire', 'jqueryForm', 'formValidator', 'region', 'additionalMethods'],
        function($, bootstrap, handlebars, sannong, validate, ajaxHandler, questionnaire, jqueryForm, formValidator, region, additionalMethods) {

    "use strict";

    var projectApplication = {};
    projectApplication.Model = {
        cellphoneErrorMsg: '<label id="cellphone-error" class="error" for="cellphone" style="display: inline-block;">手机号码已存在</label>',
        validationCodeErrorMsg: '<label id="validationCode-error" class="error" for="validation" style="display: inline-block;">验证码不匹配</label>'
    };
    projectApplication.View = {
        cellphone: $("#cellphone"),
        cellphoneError: $("#cellphone-error"),
        validationCode: $("#validationCode"),
        validationCodeError: $("#validationCode-error")

    };

    function showCellphoneError(){
        projectApplication.View.cellphoneError.remove();
        projectApplication.View.cellphone.removeClass("error");
        projectApplication.View.cellphone.after(projectApplication.Model.cellphoneErrorMsg);
        projectApplication.View.cellphone.addClass("error");
    }

    function showValidationCodeError(){
        projectApplication.View.validationCodeError.remove();
        projectApplication.View.validationCode.removeClass("error");
        projectApplication.View.validationCode.after(projectApplication.Model.validationCodeErrorMsg);
        projectApplication.View.validationCode.addClass("error");
    }

    function enableSubmitButton(){
        $("#applicationSubmit").removeAttr("disabled");
        $("#applicationSubmit").removeClass().addClass("btn btn-success");
    }

    function disableSubmitButton(){
        $("#applicationSubmit").attr({disabled: "disabled"});
        $("#applicationSubmit").removeClass().addClass("btn btn-default");
    }

    function sendValidationCode(){
        var options = {
            url: 'sendValidationCode',
            type: 'POST',
            data: {cellphone: $("#cellphone").val()},
            success: function(data){
                if (data != "") {
                    $("#validationCode").removeAttr("disabled");
                    enableSubmitButton();
                } else {
                    $("#validationCode").attr({disabled: "disabled"});
                    disableSubmitButton();
                }
            },
            fail: function(data){
                $("#validationCode").attr({disabled: "disabled"});
                disableSubmitButton();
            }

        }
        ajaxHandler.sendRequest(options);
    }

    function addEventListener() {
        $("#provinceSelect").change(function(event){
            region.Controller.addCities();
        });

        $("#citySelect").change(function(event){
            $('#districtSelect option').remove();
            region.Controller.addDistricts();
        });

        $("#applicationSubmit").click(function(event){
            if ((formValidator.getValidator("#applicationForm").form() == true)
                && $("#applicationSubmit").attr("disabled") != "disabled"){

                ajaxHandler.sendRequest({
                    type: "GET",
                    url: "validateValidationCode",
                    data:{
                        cellphone: $("#cellphone").val(),
                        validationCode: $("#validationCode").val()
                    },
                    success: function(response){
                        if (response == true){
                            $("#myModalTrigger").click();
                        }else{
                            showValidationCodeError();
                        }
                    },
                    fail: function(){
                        showValidationCodeError();
                    }
                });
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
                        showCellphoneError();
                    }
                },
                fail: function(){
                    showCellphoneError();
                }
            });
        });
    }


    $(function() {
        questionnaire.showQuestions(1);
        region.Controller.addProvinces();
        addEventListener();

    });

    sannong.ProjectApplication = projectApplication;
    return projectApplication;

    });
});
