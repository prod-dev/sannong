/**
 * Created by Bright Huang on 11/5/14.
 */

define(['jquery', 'bootstrap', 'sannong', 'validate', 'ajaxHandler', 'formValidator', 'additionalMethods'],
    function($, bootstrap, sannong, validate, ajaxHandler, formValidator, additionalMethods) {

        "use strict";

        var login = {};
        login.View = {};

        function showLoginError(message){
            $('#loginForm .errorMsg span').remove();
            $('#loginErrorContainer').append('<span><em id="loginError" class="error" style="display: inline;">' + message + '</em></span>');
            $('#loginForm .errorMsg').show();
        }

        function showError(message){
            $('#forgotPasswordForm .errorMsg span').remove();
            $('#forgotPasswordErrorContainer').append('<span><em id="forgotPasswordError" class="error" style="display: inline;">' + message + '</em></span>');
            $('#forgotPasswordForm .errorMsg').show();
        }

        function showMessage(message){
            showError(message);
        }


        function addEventListener(){

            $('.radioCustom input').click(function () {
                $(this).parents(".radioRow").find(".radioCustom").removeClass("radioCustom-checked");
                $(this).parent(".radioCustom").addClass("radioCustom-checked");
            })

            $('.checkboxCustom').click(function () {
                $(this).toggleClass('checkboxCustom-checked');
                var $checkbox = $(this).find(':checkbox');
                $checkbox.attr('checked', !$checkbox.attr('checked'));
            })

            $('#forgotPasswordLink').click(function () {
                $('#loginModalCloseBtn').click();
            })


            $("#loginFormSubmit").click(function () {
                var validator = formValidator.getLoginValidator("#loginForm");
                if (validator.form() == true){
                    ajaxHandler.sendRequest({
                        type: "POST",
                        url: "j_spring_security_check",
                        dataType: "json",
                        data: {
                            j_password: $("#j_password").val(),
                            j_username: $("#j_username").val(),
                            _spring_security_remember_me: $("#_spring_security_remember_me").prop("checked")

                        },
                        success: function (response) {
                            if (response.statusCode < 2000) {
                                window.location.href = response.models.redirect;
                            } else {
                                showLoginError(response.statusDescription);
                            }
                        },
                        fail: function (response) {
                            showLoginError("提交请求失败");
                        }
                    });
                }
            })

            $("#forgotPasswordForm_sendNewPasswordBtn").click(function(element){
                var validator = formValidator.getForgotPasswordValidator("#forgotPasswordForm");
                var realNameValid = validator.element($("#forgotPasswordForm_realName"));
                var cellphoneValid = validator.element($("#forgotPasswordForm_cellphone"));
                if ((cellphoneValid == true) && (realNameValid == true)){
                    ajaxHandler.sendRequest({
                        url: 'forgot-password/sendNewPasswordMessage',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            cellphone: $("#forgotPasswordForm_cellphone").val(),
                            realName: $("#forgotPasswordForm_realName").val()
                        },
                        success: function(response){
                            if (response.statusCode < 2000){
                                showMessage(response.statusDescription)
                                additionalMethods.updateTimeLabel("#forgotPasswordForm_sendNewPasswordBtn", "密码");
                            }else{
                                showError(response.statusDescription)
                            }
                        },
                        fail: function(response){
                            showError("发送新密码失败")
                        }
                    });
                }
            })

            $("#forgotPasswordFormSubmit").click(function () {
                var validator = formValidator.getForgotPasswordValidator("#forgotPasswordForm");
                if (validator.form() == true){
                    ajaxHandler.sendRequest({
                        type: "POST",
                        url: "j_spring_security_check",
                        dataType: "json",
                        data: {
                            j_username: $("#forgotPasswordForm_cellphone").val(),
                            j_password: $("#forgotPasswordForm_password").val(),
                            _spring_security_remember_me: $("#forgotPasswordForm_spring_security_remember_me").prop("checked")
                        },
                        success: function (response) {
                            if (response.statusCode < 2000) {

                                window.location.href = response.models.redirect;
                            } else {
                                showError(response.statusDescription);
                            }
                        },
                        fail: function (response) {
                            showError("提交请求失败");
                        }
                    });
                }
            })
        }

        $(function() {
            addEventListener();
        });

        sannong.Login = login;
        return login;

});
