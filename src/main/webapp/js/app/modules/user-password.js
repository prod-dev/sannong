/**
 * Created by Bright Huang on 10/22/14.
 */
define(['jquery', 'bootstrap', 'sannong', 'validate', 'formValidator', 'jqueryForm'],
function($, bootstrap, sannong, validate, formValidator, jqueryForm) {

    "use strict";

    var userPassword = {};

    userPassword.addEventListener = function (){
        $("#userPasswordSubmit").click(function(event){
            $("#userPasswordForm").ajaxSubmit(function(response) {
                if (response != undefined){

                }
            });
        });
    }

    $(function() {
        userPassword.addEventListener();
    });

    sannong.UserPassword = userPassword;
    return userPassword;

});




