/**
 * Created by apple on 11/5/14.
 */
define(['jquery', 'sannong', 'formValidator', 'additionalMethods'], function($, sannong, formValidator, additionalMethods) {

    "use strict";

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

    sannong.AdditionalMethods = additionalMethods;
    return additionalMethods;

});