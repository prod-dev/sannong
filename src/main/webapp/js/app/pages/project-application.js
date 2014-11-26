/**
 * Created by Bright Huang on 10/26/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'handlebars', 'sannong', 'login', 'validate', 'ajaxHandler', 'questionnaire', 'jqueryForm', 'formValidator', 'region', 'additionalMethods'],
        function($, bootstrap, handlebars, sannong, login, validate, ajaxHandler, questionnaire, jqueryForm, formValidator, region, additionalMethods) {

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

            function showUniqueCellphoneError() {
                projectApplication.View.cellphoneError.remove();
                projectApplication.View.cellphone.removeClass("error");
                projectApplication.View.cellphone.after(projectApplication.Model.cellphoneErrorMsg);
                projectApplication.View.cellphone.addClass("error");
            }

            function showValidationCodeError() {
                projectApplication.View.validationCodeError.remove();
                projectApplication.View.validationCode.removeClass("error");
                projectApplication.View.validationCode.after(projectApplication.Model.validationCodeErrorMsg);
                projectApplication.View.validationCode.addClass("error");
            }

            function enableSubmitButton() {
                $("#projectApplicationFormSubmit").removeAttr("disabled");
                $("#projectApplicationFormSubmit").removeClass().addClass("btn btn-success");
            }

            function disableSubmitButton() {
                $("#projectApplicationFormSubmit").attr({disabled: "disabled"});
                $("#projectApplicationFormSubmit").removeClass().addClass("btn btn-default");
            }

            function sendValidationCode() {
                var options = {
                    url: 'sendValidationCode',
                    type: 'POST',
                    data: {cellphone: $("#cellphone").val()},
                    success: function (data) {
                        if (data != "") {
                            $("#validationCode").removeAttr("disabled");
                            enableSubmitButton();
                        } else {
                            $("#validationCode").attr({disabled: "disabled"});
                            disableSubmitButton();
                        }
                    },
                    fail: function (data) {
                        $("#validationCode").attr({disabled: "disabled"});
                        disableSubmitButton();
                    }

                }
                ajaxHandler.sendRequest(options);
            }

            function addEventListener() {
                $("#provinceSelect").change(function (event) {
                    region.Controller.addCities();
                });

                $("#citySelect").change(function (event) {
                    $('#districtSelect option').remove();
                    region.Controller.addDistricts();
                });

                $("#projectApplicationFormSubmit").click(function (event) {
                    if ((formValidator.getValidator("#projectApplicationForm").form() == true)
                        && $("#applicationSubmit").attr("disabled") != "disabled") {

                        ajaxHandler.sendRequest({
                            type: "GET",
                            url: "validateFormOnSubmit",
                            dataType: "json",
                            data: {
                                cellphone: $("#cellphone").val(),
                                validationCode: $("#validationCode").val()
                            },
                            success: function (response) {
                                if (response.valid == true) {
                                    $("#projectAppModelTrigger").click();
                                } else if (response.uniqueCellphoneValid == false) {
                                    showUniqueCellphoneError();
                                } else if (response.validationCodeValid == false) {
                                    showValidationCodeError();
                                }
                            },
                            fail: function (response) {
                                showValidationCodeError();
                            }
                        });
                    }
                });

                $("#confirmedSubmit").click(function (event) {
                    $("#projectApplicationForm").submit();
                });

                $("#action-send-code").click(function (event) {
                    if (formValidator.getValidator("#projectApplicationForm").element($("#cellphone")) == false) {
                        return;
                    } else {
                        ajaxHandler.sendRequest({
                            type: "GET",
                            url: "validateUniqueCellphone",
                            data: {cellphone: $("#cellphone").val()},
                            success: function (response) {
                                if (response == true) {
                                    if (formValidator.getValidator("#projectApplicationForm").form() == true) {
                                        additionalMethods.updateTimeLabel("#action-send-code", "验证码");
                                        sendValidationCode();
                                    }
                                } else {
                                    showUniqueCellphoneError();
                                }
                            },
                            fail: function () {
                                showUniqueCellphoneError();
                            }
                        });
                    }
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
