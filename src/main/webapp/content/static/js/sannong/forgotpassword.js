/**
 * Created by Bright Huang on 10/29/14.
 */
(function($) {

    $(function () {
        $("#forgetPasswordForm").validate({
            rules: {
                userRealName: "required",
                cellphone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 5
                },
                confirm_password: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                }
            },
            messages: {
                userRealName: "请输入姓名",
                cellphone: "请先填写手机号码",
                email: {
                    required: "请输入Email地址",
                    email: "请输入正确的email地址"
                },
                password: {
                    required: "请输入密码",
                    minlength: $.validator.format("密码不能小于{0}个字 符")
                },
                confirm_password: {
                    required: "请输入确认密码",
                    minlength: "确认密码不能小于5个字符",
                    equalTo: "两次输入密码不一致不一致"
                }
            },
            errorPlacement:function(error,element) {
                if (element.attr("name") == "fname" || element.attr("name") == "lname") {
                    error.insertAfter("#lastname");
                } else if (element.attr("name") == "cellphone") {
                    error.insertAfter("#action-send-code");
                } else{
                    error.insertAfter(element);
                }
            },
            submitHandler:function(form){
                alert("submitted");
                form.submit();
            }
        });

    });


})(jQuery);