/**
 * Created by Bright Huang on 10/29/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'sannong', 'validate', 'ajaxHandler', 'formValidator', 'additionalMethods'],
        function($, bootstrap, sannong, validate, ajaxHandler, formValidator, additionalMethods) {

        "use strict";

        var forgotPassword = {};

        function addEventListener(){
            $("#action-send-code").click(function(element){

                var validator = formValidator.getValidator("#forgotPasswordForm");

                validator.resetForm();

                if (validator.element($("#realName")) == true && validator.element($("#cellphone")) == true){
                    var options = {
                        url: 'getNewPassword',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            cellphone: $("#cellphone").val(),
                            realName: $("#realName").val()
                        },
                        success: function(data){

                        },
                        fail: function(data){

                        }
                    }
                    ajaxHandler.sendRequest(options);
                }
            });

        }

        $(function () {
            addEventListener();
            formValidator.getValidator("#forgotPasswordForm");
        });

        sannong.ForgotPassword = forgotPassword;
        return forgotPassword;
    });
});
