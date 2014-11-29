/**
 * Created by Bright Huang on 10/29/14.
 */

define(['jquery', 'bootstrap', 'sannong', 'validate', 'ajaxHandler', 'formValidator', 'additionalMethods'],
        function($, bootstrap, sannong, validate, ajaxHandler, formValidator, additionalMethods) {

        "use strict";

        var forgotPassword = {};

        forgotPassword.Model = {
            cellphoneErrorMsg: '<label id="cellphone-error" class="error" for="cellphone" style="display: inline-block;">姓名或手机号码不存在</label>',
            passwordErrorMsg: '<label id="password-error" class="error" for="password" style="display: inline-block;">验证失败, 请重新输入</label>'
        };

        forgotPassword.View = {
            sendNewPasswordLink: $("#sendNewPasswordLink")
        };


        function showError(){

        }

        function addEventListener(){
            $("#sendNewPasswordLink").click(function(element){
                var validator = formValidator.getValidator("#forgotPasswordForm");
                validator.resetForm();
                var realNameValid = validator.element($("#realName"));
                var cellphoneValid = validator.element($("#cellphone"));
                if ((cellphoneValid == true) && (realNameValid == true)){
                    var options = {
                        url: 'sendNewPasswordMessage',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            cellphone: $("#cellphone").val(),
                            realName: $("#realName").val()
                        },
                        success: function(data){
                            if (data == false){
                                forgotPassword.View.sendNewPasswordLink.after(forgotPassword.Model.cellphoneErrorMsg);
                            }else{
                                additionalMethods.updateTimeLabel("#sendNewPasswordLink", "密码");
                            }
                        },
                        fail: function(data){
                            if (data == false){
                                forgotPassword.View.sendNewPasswordLink.after(forgotPassword.Model.cellphoneErrorMsg);
                            }
                        }
                    }
                    ajaxHandler.sendRequest(options);
                }
           });

            $("#forgotPasswordFormSubmit").click(function () {
                var validator = formValidator.getValidator("#forgotPasswordForm");

                if (validator.form() == true){
                    ajaxHandler.sendRequest({
                        type: "POST",
                        url: "j_spring_security_check",
                        dataType: "json",
                        data: {
                            j_username: $("#cellphone").val(),
                            j_password: $("#password").val()
                        },
                        success: function (response) {
                            if (response.authentication == true) {
                                window.location.href = response.redirect;
                            } else {
                                showError();
                            }
                        },
                        fail: function (response) {
                            showError();
                        }
                    });
                }
            });
        }

        function checkAuthenticationStatus(){
            var status = $("#authentication").attr("status");
            if (status == "false"){
                $("#password").after(forgotPassword.Model.passwordErrorMsg);
            }
        }

        $(function () {
            addEventListener();
            formValidator.getValidator("#forgotPasswordForm");
            checkAuthenticationStatus();
        });

        sannong.ForgotPassword = forgotPassword;
        return forgotPassword;

});
