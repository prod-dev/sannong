/**
 * Created by apple on 11/5/14.
 */
define(['jquery', 'sannong', 'formValidator'], function($, sannong, formValidator) {

    "use strict";
    var timer,
        duration = 60,
        timeRemained = 0;
    var additionalMethods = {};

    $.validator.addMethod("isTel", function(value, element) {
        var tel = /^\d{3,4}-?\d{7,9}$/; //电话号码格式010-12345678
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的电话号码");


    $.validator.addMethod("isCellphone", function(value, element) {
        var length = value.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})||(18[0-9]{1}))+\d{8})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号码");


    additionalMethods.setDuration = function(timeDuration){
        duration = timeDuration;
    }

    additionalMethods.updateTimeLabel = function(elementId, text){
        if(timeRemained > 0){ return; }
        timeRemained = duration;

        $(elementId).attr("disabled", "true");
        $(elementId).val("请在" + timeRemained + "秒内输入" + text);
        $(elementId).text("请在" + timeRemained + "秒内输入" + text);

        timer = window.setInterval(function setRemainTime() {
            if (timeRemained == 0) {
                window.clearInterval(timer);
                $(elementId).removeAttr("disabled");
                $(elementId).removeClass("disabled");

                $(elementId).val("重新发送" + text);
                $(elementId).text("重新发送" + text);
            }
            else {
                timeRemained --;
                $(elementId).val("请在" + timeRemained + "秒内输入" + text);
                $(elementId).text("请在" + timeRemained + "秒内输入" + text);
            }
        }, 1000);
    }

    sannong.AdditionalMethods = additionalMethods;
    return additionalMethods;

});