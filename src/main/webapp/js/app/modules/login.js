/**
 * Created by Bright Huang on 11/5/14.
 */

define(['jquery', 'sannong', 'ajaxHandler', 'formValidator'], function($, sannong, ajaxHandler, formValidator) {

    "use strict";

    var login = {};

    function showLoginError(){

    }

    function addEventListener(){

        $('.radioCustom input').click(function () {
            $(this).parents(".radioRow").find(".radioCustom").removeClass("radioCustom-checked");
            $(this).parent(".radioCustom").addClass("radioCustom-checked");
        });

        $('.checkboxCustom').click(function () {
            $(this).toggleClass('checkboxCustom-checked');
            var $checkbox = $(this).find(':checkbox');
            $checkbox.attr('checked', !$checkbox.attr('checked'));
        });

        $('#forgotPasswordLink').click(function () {
            $('#loginModalCloseBtn').click();
        });


        $("#loginFormSubmit").click(function () {
            var validator = formValidator.getValidator("#loginForm");

            if (validator.form() == true){
                ajaxHandler.sendRequest({
                    type: "POST",
                    url: "j_spring_security_check",
                    dataType: "json",
                    data: {
                        j_password: $("#j_password").val(),
                        j_username: $("#j_username").val()
                    },
                    success: function (response) {
                        if (response.authentication == true) {
                            window.location.href = response.redirect;
                        } else {
                            showLoginError();
                        }
                    },
                    fail: function (response) {
                        showLoginError();
                    }
                });
            }
        });
    }

    $(function() {
        addEventListener();
    });

    sannong.Login = login;
    return login;

});
