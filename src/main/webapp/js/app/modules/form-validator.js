/**
 * Created by apple on 11/5/14.
 */

define(['jquery', 'sannong'], function($, sannong) {

    "use strict";

    var formValidator = {};

    formValidator.getLoginValidator = function(formName){
        var validator = $(formName).validate({
            errorElement:"em",
            rules: {
                j_username: {
                    required: true,
                    isCellphone: true
                },
                j_password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                j_username: {
                    required: "手机号码不能为空",
                    isCellphone: "请正确填写您的手机号码"
                },
                j_password: {
                    required: "密码不能为空",
                    minlength: $.validator.format("密码不能小于{0}个字符")
                }
            },
            success: function(label) {
            },
            errorPlacement:function(error,element) {
                error.insertAfter(element);
            },
            errorContainer: "span.errorMsg",
            errorLabelContainer: $("#loginForm span.errorMsg"),
            wrapper: "span",
            submitHandler:function(form){
                form.submit();
            }
        });
        return validator;
    }

    formValidator.getForgotPasswordValidator = function(formName){
        var validator = $(formName).validate({
            errorElement:"em",
            rules: {
                realName: {
                    required: true
                },
                j_username: {
                    required: true,
                    isCellphone: true
                },
                j_password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                realName: {required: "姓名不能为空"},
                j_username: {
                    required: "手机号码不能为空",
                    isCellphone: "请正确填写您的手机号码"
                },
                j_password: {
                    required: "密码不能为空",
                    minlength: $.validator.format("密码不能小于{0}个字符")
                }
            },
            success: function(label) {
            },
            errorPlacement:function(error,element) {
                error.insertAfter(element);
            },
            errorContainer: "span.errorMsg",
            errorLabelContainer: $("#forgotPasswordForm span.errorMsg"),
            wrapper: "span",
            submitHandler:function(form){
                form.submit();
            }
        });
        return validator;
    }

    formValidator.getValidator = function(formName){
        var validator = $(formName).validate({
            rules: {
                "answers[0]": "required",
                "answers[1]": "required",
                "answers[2]": "required",
                "answers[3]": "required",
                "answers[4]": "required",
                "answers[5]": "required",
                "answers[6]": "required",
                "answers[7]": "required",
                "answers[8]": "required",
                "answers[9]": "required",
                "answers[10]": "required",
                "answers[11]": "required",
                "answers[12]": "required",
                "applicant.realName": "required",
                "applicant.jobTitle": "required",
                "applicant.company": "required",
                "applicant.provinceSelect": "required",
                "applicant.citySelect": "required",
                "applicant.districtSelect": "required",
                "applicant.companyAddress": "required",
                "applicant.mailbox": {
                    email:true
                },
                "applicant.deskPhone": {
                    isTel: true
                },
                "applicant.cellphone": {
                    required: true,
                    isCellphone: true
                },
                "sms.smsValidationCode":{
                    digits: true,
                    rangelength:[4,4]
                },
                realName: "required",
                jobTitle: "required",
                company: "required",
                provinceSelect: "required",
                citySelect: "required",
                districtSelect: "required",
                companyAddress: "required",
                mailbox: {
                    email:true
                },
                deskPhone: {
                    isTel: true
                },
                cellphone: {
                    required: true,
                    isCellphone: true
                },
                newCellphone:{
                    required: true,
                    isCellphone: true
                },
                j_username: {
                    required: true,
                    isCellphone: true
                },
                j_password: {
                    required: true,
                    minlength: 6
                },
                password: {
                    required: true,
                    minlength: 6
                },
                oldPassword: {
                    required: true,
                    minlength: 6
                },
                newPassword: {
                    required: true,
                    minlength: 6
                },
                confirmedPassword: {
                    required: true,
                    minlength: 6,
                    equalTo:'#newPassword'
                }
            },
            messages: {
                "answers[0]": "必填",
                "answers[1]": "必填",
                "answers[2]": "必填",
                "answers[3]": "必填",
                "answers[4]": "必填",
                "answers[5]": "必填",
                "answers[6]": "必填",
                "answers[7]": "必填",
                "answers[8]": "必填",
                "answers[9]": "必填",
                "answers[10]": "必填",
                "answers[11]": "必填",
                "answers[12]": "必填",
                "comment.content": "必填",
                "applicant.realName": "必填",
                "applicant.jobTitle": "必填",
                "applicant.provinceSelect": "必填",
                "applicant.citySelect": "必填",
                "applicant.districtSelect": "必填",
                "applicant.jobAddress": "必填",
                "applicant.company": "必填",
                "applicant.companyAddress": "必填",
                "applicant.mailbox": "请输入正确格式的电子邮件",
                "applicant.deskPhone": {
                    isTel: "请输入正确格式的电话号码 如:010-12345678"
                },
                "applicant.cellphone": {
                    required: "必填",
                    isCellphone: "请正确填写您的手机号码",
                    remote: "此手机号码已经被使用"
                },
                "sms.smsValidationCode":{
                    digits: "只能输入整数",
                    rangelength: $.validator.format("请输入一个长度为{0}的整数验证码")
                },
                "applicant.password": {
                    required: "请输入密码",
                    minlength: $.validator.format("密码不能小于{0}个字 符")
                },
                realName: "必填",
                jobTitle: "必填",
                company: "必填",
                provinceSelect: "必填",
                citySelect: "必填",
                districtSelect: "必填",
                companyAddress: "必填",
                mailbox: "请输入正确格式的电子邮件",
                deskPhone: {
                    isTel: "请输入正确格式的电话号码 如:010-12345678"
                },
                cellphone: {
                    required: "必填",
                    isCellphone: "请正确填写您的手机号码",
                    remote: "姓名或手机号码不存在"
                },
                newCellphone: {
                    required: "必填",
                    isCellphone: "请正确填写您的手机号码",
                    remote: "此手机号码已经被使用"
                },
                j_username: {
                    required: "必填",
                    remote: "姓名或手机号码不存在",
                    isCellphone: "请正确填写您的手机号码"
                },
                j_password: {
                    required: "必填",
                    minlength: $.validator.format("密码不能小于{0}个字符")
                },
                password: {
                    required: "请输入密码",
                    minlength: $.validator.format("密码不能小于{0}个字符")
                },
                oldPassword: {
                    required: "必填",
                    minlength: $.validator.format("密码不能小于{0}个字符")
                },
                newPassword: {
                    required: "必填",
                    minlength: $.validator.format("密码不能小于{0}个字符")
                },
                confirmedPassword: {
                    required: "必填",
                    minlength: $.validator.format("密码不能小于{0}个字符"),
                    equalTo: "两次输入不一致"
                }

            },
            success: function(label, element) {
            },
            errorPlacement:function(error,element) {
                if ( element.is(":radio") ) {
                    error.appendTo(element.parent().parent());
                }else if ( element.is(":checkbox") ) {
                    error.appendTo(element.parent().parent());
                }else if (element.attr("name") == "cellphone") {
                    error.appendTo(element.next().next());
                } else{
                    error.insertAfter(element);
                }

            },
            submitHandler:function(form){
                form.submit();
            }
        });
        return validator;
    }

    sannong.FormValidator = formValidator;
    return formValidator;

});
