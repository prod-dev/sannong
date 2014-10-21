/**
 * Created by apple on 10/21/14.
 */
define('login', ['jquery', 'sannong', "bootstrap"], function ($, Sannong, Bootstrap) {

    "use strict";

    var Login = {};

    Login.Model = {};

    Login.View = {};

    Login.Controller = {
        signin : function(){
            var signinJsonData = $('.form-signin').serialize();

            $.ajax({
                type: 'POST',
                url: 'j_spring_security_check',
                data: signinJsonData,
                success: function(response){
                    if (response == "authentication-failure") {

                        $("#authentication-failure").css("display","block");
                    }else{
                        $("#authentication-failure").css("display","none");
                        //window.location.href = response;
                    }
                },
                error: function(error){
                    alert("failed >>> " + error);
                },
                always:function(data){
                    alert("always >>> " + data);
                }
            });
        }

    };

    //------------------ Public functions -------------------------
    Login.temp = function(){

    }

    //------------------ Private functions -------------------------
    function init() {
        /*
        $("#submit").click(function(){
            Login.Controller.signin();
        });
        */
    }


    $(function () {
        var status = $("#auth").attr("status");
        if (status == "authentication-failure"){
            $("#auth-msg").css("display","block");
        }else{
            $("#auth-msg").css("display","none");
        }

        init();
    });


    Sannong.Login = Login;
    return Login;
});



