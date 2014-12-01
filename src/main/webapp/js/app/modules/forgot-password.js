/**
 * Created by Bright Huang on 10/29/14.
 */

define(['jquery', 'bootstrap', 'sannong', 'validate', 'ajaxHandler', 'formValidator', 'additionalMethods'],
        function($, bootstrap, sannong, validate, ajaxHandler, formValidator, additionalMethods) {

        "use strict";

        var forgotPassword = {};

        function showError(message){
            $('#forgotPasswordErrorMsg').remove();
            $('#forgotPasswordErrorContainer').append('<span id="forgotPasswordErrorMsg">' + message + '</span>');
        }

        function showMessage(message){
            showError(message);
        }

        function addEventListener(){
            $("#sendNewPasswordLink").click(function(element){
                var validator = formValidator.getValidator("#forgotPasswordForm");
                validator.resetForm();
                var realNameValid = validator.element($("#realName"));
                var cellphoneValid = validator.element($("#cellphone"));
                if ((cellphoneValid == true) && (realNameValid == true)){
                    ajaxHandler.sendRequest({
                        url: 'sendNewPasswordMessage',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            cellphone: $("#cellphone").val(),
                            realName: $("#realName").val()
                        },
                        success: function(response){
                            if (response.statusCode < 2000){
                                showMessage(response.statusDescription)
                                additionalMethods.updateTimeLabel("#sendNewPasswordLink", "密码");
                            }else{
                                showError(response.statusDescription)
                            }
                        },
                        fail: function(response){
                            showError("发送新密码失败")
                        }
                    });
                }
           });

            $("#forgotPasswordFormSubmit").click(function () {
                if (formValidator.getValidator("#forgotPasswordForm").form() == true){
                    ajaxHandler.sendRequest({
                        type: "POST",
                        url: "j_spring_security_check",
                        dataType: "json",
                        data: {
                            j_username: $("#cellphone").val(),
                            j_password: $("#password").val()
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
            });
        }


        $(function () {
            addEventListener();
        });

        sannong.ForgotPassword = forgotPassword;
        return forgotPassword;

});
