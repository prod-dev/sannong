define('sannong', ['jquery'], function($) {

    "use strict";

    var sannong = {};
    sannong.Model = {};

    function showWelcome(){
        $.ajax({
            type: "POST",
            url: "login/realName",
            dataType: "json",
            data: {},
            success: function (response) {
                if (response.statusCode < 2000) {
                    $("#welcome").text("欢迎 " + response.models.realName);
                } else {
                }
            },
            fail: function (response) {
            }
        });
    }

    $(function() {
        showWelcome();
    });

    window.Sannong = sannong;
    return sannong;

});