/**
 * Created by Bright Huang on 10/22/14.
 */
define(['jquery', 'bootstrap', 'sannong', 'validate', 'formValidator', 'jqueryForm'],
function($, bootstrap, sannong, validate, formValidator, jqueryForm) {

    "use strict";

    var userPassword = {};
    userPassword.View = {
        userPasswordForm: $("#userPasswordForm"),
        userPasswordSubmit: $("#userPasswordSubmit")
    };

    function showMessage(message){
        var messageLabel = '<label id="userPasswordMessage" class="error" style="display: inline-block;">' + message + '</label>';
        userPassword.View.userPasswordForm.resetForm();
        userPassword.View.userPasswordSubmit.after(messageLabel);
    }

    userPassword.addEventListener = function (){
        $("#userPasswordSubmit").click(function(event){
            if (formValidator.getValidator("#userPasswordForm").form() == true){
                $("#userPasswordForm").ajaxSubmit(function(response) {
                    if (response.statusCode < 2000){
                        showMessage(response.statusDescription)
                    }else{
                        showMessage(response.statusDescription)
                    }
                });
            }
        });
    }

    $(function() {
        userPassword.addEventListener();
    });

    sannong.UserPassword = userPassword;
    return userPassword;

});




