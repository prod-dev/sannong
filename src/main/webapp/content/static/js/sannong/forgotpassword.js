/**
 * Created by Bright Huang on 10/29/14.
 */
(function($) {

    function ajaxHandler(options) {
        return $.ajax({
            cache: false,
            data: options.data,
            dataType: options.dataType,
            type: options.type,
            url: options.url
        }).success(function (data, status, xhr) {
            options.success(data);
        }).fail(function (xhr, status, error) {
            options.fail(error);
        }).always(function (xhr, status, error) {

        });
    }
    function validateForm(){
        var validator = $("#confirmPasswordForm").validate({
            rules: {
                realName: {
                    required: true //,
                    /*
                    remote: {
                        url: "getNewPassword",     //后台处理程序
                        type: "post",               //数据发送方式
                        dataType: "json",           //接受数据格式
                        data: {                     //要传递的数据
                            userRealName: function() {
                                return $("#userRealName").val();
                            }
                        }
                    }
                     */

                },
                cellphone: {
                    required: true,
                    isCellphone: true
                    /*
                    remote: {
                        url: "getNewPassword",     //后台处理程序
                        type: "post",               //数据发送方式
                        dataType: "json",           //接受数据格式
                        data: {                     //要传递的数据
                            userRealName: function() {
                                return $("#userRealName").val();
                            }
                        }
                    }
                    */
                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                realName: {
                    required: "请先填写姓名",
                    remote: "姓名或手机号码不存在"
                },
                cellphone: {
                    required: "请先填写手机号码",
                    remote: "姓名或手机号码不存在",
                    isCellphone: "请正确填写您的手机号码"
                },
                password: {
                    required: "请输入密码",
                    minlength: $.validator.format("密码不能小于{0}个字 符")
                }

            },
            errorPlacement:function(error,element) {
                if (element.attr("name") == "cellphone") {
                    error.insertAfter("#action-send-code");
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

    function addEventListener(){


        $("#action-send-code").click(function(){
            var validator = validateForm();

            validator.resetForm();

            var realNameValid = validator.element($("#realName"));
            var cellphoneValid = validator.element($("#cellphone"));

            if (realNameValid == true && cellphoneValid == true){
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
                ajaxHandler(options);
            }
        });

    }

    function init(){
        $.validator.addMethod("isCellphone", function(value, element) {
            var length = value.length;
            var mobile = /^(((13[0-9]{1})|(15[0-9]{1})||(18[0-9]{1}))+\d{8})$/;
            return this.optional(element) || (length == 11 && mobile.test(value));
        }, "请正确填写您的手机号码");
    }


    $(function () {
        init();
        addEventListener();
        validateForm();
    });


})(jQuery);