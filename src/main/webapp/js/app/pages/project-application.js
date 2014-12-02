/**
 * Created by Bright Huang on 10/26/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'handlebars', 'sannong', 'login', 'validate', 'ajaxHandler',
            'questionnaire', 'jqueryForm', 'formValidator', 'region', 'additionalMethods', 'forgotPassword'],
        function($, bootstrap, handlebars, sannong, login, validate, ajaxHandler,
                 questionnaire, jqueryForm, formValidator, region, additionalMethods, forgotPassword) {

            "use strict";

            var projectApplication = {};
            projectApplication.Model = {};
            projectApplication.View = {
                cellphone: $("#projectAppForm_cellphone"),
                cellphoneError: $("#cellphone-error"),
                validationCode: $("#projectAppForm_validationCode"),
                validationCodeError: $("#validationCode-error"),
                projectApplicationFormSubmit: $("#projectAppForm_submit")
            };

            projectApplication.Controller = {
                showUniqueCellphoneError: function(message) {
                    var errorLabel = '<label id="projectAppForm_cellphone-error" class="error" for="cellphone" style="display: inline-block;">' + message + '</label>';
                    projectApplication.View.cellphoneError.remove();
                    projectApplication.View.cellphone.removeClass("error");
                    projectApplication.View.cellphone.after(errorLabel);
                    projectApplication.View.cellphone.addClass("error");
                },
                showValidationCodeError: function(message) {
                    var errorLabel = '<label id="projectAppForm_validationCode-error" class="error" for="validation" style="display: inline-block;">' + message + '</label>';
                    projectApplication.View.validationCodeError.remove();
                    projectApplication.View.validationCode.removeClass("error");
                    projectApplication.View.validationCode.after(errorLabel);
                    projectApplication.View.validationCode.addClass("error");
                },
                showValidationCodeMessage: function(message) {
                    projectApplication.Controller.showValidationCodeError(message);
                },
                enableSubmitButton: function() {
                    projectApplication.View.projectApplicationFormSubmit.removeClass("disabled");
                },
                disableSubmitButton: function() {
                    projectApplication.View.projectApplicationFormSubmit.addClass("disabled");
                }
            };

            function addEventListener() {
                $("#projectAppForm_provinceSelect").change(function() {
                    region.Controller.addCities();
                });

                $("#projectAppForm_citySelect").change(function() {
                    $('#districtSelect option').remove();
                    region.Controller.addDistricts();
                });

                $("#projectAppForm_validationBtn").click(function() {
                    if ($("#projectAppForm_validationBtn").hasClass("disabled")){
                        return;
                    }
                    if (formValidator.getValidator("#projectAppForm").form() == true) {
                        ajaxHandler.sendRequest({
                            url: 'project-application/sendValidationCode',
                            type: 'POST',
                            data: {cellphone: $("#projectAppForm_cellphone").val()},
                            success: function (response) {
                                if (response.statusCode < 2000) {
                                    additionalMethods.updateTimeLabel("#projectAppForm_validationBtn", "验证码");
                                    projectApplication.Controller.enableSubmitButton();
                                    $("#projectAppForm_validationBtn").addClass("disabled");
                                    $("#projectAppForm_validationCode").removeAttr("disabled");
                                    projectApplication.Controller.showValidationCodeMessage(response.statusDescription);
                                } else {
                                    $("#projectAppForm_validationBtn").removeClass("disabled");
                                    $("#projectAppForm_validationCode").attr({disabled: "disabled"});
                                    projectApplication.Controller.disableSubmitButton();
                                    if (response.statusCode == 2012){
                                        projectApplication.Controller.showUniqueCellphoneError(response.statusDescription);
                                    }else{
                                        projectApplication.Controller.showValidationCodeError(response.statusDescription);
                                    }
                                }
                            },
                            fail: function (response) {
                                $("#projectAppForm_validationBtn").removeClass("disabled");
                                $("#projectAppForm_validationCode").removeAttr("disabled");
                                projectApplication.Controller.disableSubmitButton();
                                projectApplication.Controller.showValidationCodeError("验证码发送失败");
                            }

                        });
                    }
                });


                $("#projectAppForm_submit").click(function (event) {
                    if ($("#projectAppForm_submit").hasClass("disabled") == true) { return;}

                    if (formValidator.getValidator("#projectAppForm").form() == true){

                        ajaxHandler.sendRequest({
                            type: "POST",
                            url: "project-application/validate-application-form",
                            dataType: "json",
                            data: {
                                cellphone: $("#projectAppForm_cellphone").val(),
                                validationCode: $("#projectAppForm_validationCode").val()
                            },
                            success: function (response) {
                                if (response.statusCode < 2000) {
                                    $("#projectAppModelTrigger").click();
                                } else{
                                    projectApplication.Controller.showValidationCodeError(response.statusDescription);
                                }
                            },
                            fail: function (response) {
                                projectApplication.Controller.showValidationCodeError(response.statusDescription);
                            }
                        });
                    }
                });

                $("#confirmedSubmit").click(function (event) {
                    $("#projectAppForm").submit();
                });
            }

            $(function() {
                questionnaire.showQuestionnaire();
                region.Controller.addProvinces();
                addEventListener();
            });

    sannong.ProjectApplication = projectApplication;
    return projectApplication;

    });
});
