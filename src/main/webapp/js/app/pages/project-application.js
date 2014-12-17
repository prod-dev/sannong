/**
 * Created by Bright Huang on 10/26/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'handlebars', 'sannong', 'login', 'validate', 'ajaxHandler',
            'questionnaire', 'jqueryForm', 'formValidator', 'selector', 'additionalMethods', 'custom'],
        function($, bootstrap, handlebars, sannong, login, validate, ajaxHandler,
                 questionnaire, jqueryForm, formValidator, selector, additionalMethods, custom) {

            "use strict";

            var projectApplication = {};

            projectApplication.Model = {};

            projectApplication.View = {
                cellphone: $("#projectAppForm_cellphone"),
                cellphoneError: $("#cellphone-error"),
                validationCode: $("#projectAppForm_validationCode"),
                projectApplicationFormSubmit: $("#projectAppForm_submit"),
                showUniqueCellphoneError: function(message) {
                    var errorLabel = '<label id="projectAppForm_cellphone-error" class="error" for="cellphone" style="display: inline-block;">' + message + '</label>';
                    projectApplication.View.cellphoneError.remove();
                    projectApplication.View.cellphone.removeClass("error");
                    projectApplication.View.cellphone.after(errorLabel);
                    projectApplication.View.cellphone.addClass("error");
                },
                showValidationCodeError: function(message) {
                    var errorLabel = '<label id="projectAppForm_validationCode-error" class="error" for="projectAppForm_validationCode">' + message + '</label>';
                    projectApplication.View.validationCode.removeClass("error");
                    projectApplication.View.validationCode.removeAttr("aria-invalid");

                    if ( $("#projectAppForm_validationCode-error") !== undefined){
                        $("#projectAppForm_validationCode-error").text(message);
                    }else{
                        projectApplication.View.validationCode.after(errorLabel);
                    }
                    projectApplication.View.validationCode.addClass("error");
                    projectApplication.View.validationCode.attr("aria-invalid", "true");
                    projectApplication.View.validationCode.attr("style", "display: inline-block");

                },
                showValidationCodeMessage: function(message) {
                    projectApplication.View.showValidationCodeError(message);
                },
                enableSubmitButton: function() {
                    projectApplication.View.projectApplicationFormSubmit.removeClass("disabled");
                },
                disableSubmitButton: function() {
                    projectApplication.View.projectApplicationFormSubmit.addClass("disabled");
                }

            };

            projectApplication.Controller = {
                handleValidationCodeClick: function(){
                    if ($("#projectAppForm_validationBtn").hasClass("disabled")){
                        return;
                    }
                    //projectApplication.View.showValidationCodeError("test");

                    if (formValidator.getValidator("#projectAppForm").form() == true) {
                        ajaxHandler.sendRequest({
                            url: 'project-application/sendValidationCode',
                            type: 'POST',
                            data: {cellphone: $("#projectAppForm_cellphone").val()},
                            success: function (response) {
                                if (response.statusCode < 2000) {
                                    additionalMethods.updateTimeLabel("#projectAppForm_validationBtn", "验证码");
                                    projectApplication.View.enableSubmitButton();
                                    $("#projectAppForm_validationBtn").addClass("disabled");
                                    $("#projectAppForm_validationCode").removeAttr("disabled");
                                    projectApplication.View.showValidationCodeMessage(response.statusDescription);
                                } else {
                                    $("#projectAppForm_validationBtn").removeClass("disabled");
                                    $("#projectAppForm_validationCode").attr({disabled: "disabled"});
                                    projectApplication.View.disableSubmitButton();
                                    if (response.statusCode == 2012){
                                        projectApplication.View.showUniqueCellphoneError(response.statusDescription);
                                    }else{
                                        projectApplication.View.showValidationCodeError(response.statusDescription);
                                    }
                                }
                            },
                            fail: function (response) {
                                $("#projectAppForm_validationBtn").removeClass("disabled");
                                $("#projectAppForm_validationCode").removeAttr("disabled");
                                projectApplication.View.disableSubmitButton();
                                projectApplication.View.showValidationCodeError("验证码发送失败");
                            }

                        });
                    }
                },
                handleFormSubmit: function(){
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
                                    projectApplication.View.showValidationCodeError(response.statusDescription);
                                }
                            },
                            fail: function (response) {
                                projectApplication.View.showValidationCodeError(response.statusDescription);
                            }
                        });
                    }
                },
                handleConfirmedSubmit: function(){
                    $("#projectAppForm").submit();
                }
            };

            function registerEventListener() {
                $("#projectAppForm_validationBtn").click(function(){
                    projectApplication.Controller.handleValidationCodeClick();
                });

                $("#projectAppForm_submit").click(function () {
                    projectApplication.Controller.handleFormSubmit();
                });

                $("#confirmedSubmit").click(function () {
                    projectApplication.Controller.handleConfirmedSubmit();
                });
            }

            $(function() {
                selector.initSelect('select');
                questionnaire.Controller.showProjectQuestionnaire();
                registerEventListener();
            });

    sannong.ProjectApplication = projectApplication;
    return projectApplication;

    });
});
