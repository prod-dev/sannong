/**
 * Created by Bright Huang on 10/22/14.
 */

(function($) {

    function validateForm(){
        var validator = $("#myPasswordForm").validate({
            rules: {
                "oldPassword": {
                    required: true,
                    minlength: 6
                },
                "newPassword": {
                    required: true,
                    minlength: 6
                },
                "confirmedPassword": {
                    required: true,
                    minlength: 6,
                    equalTo:'#newPassword'
                }
            },
            messages: {
                "oldPassword": {
                    required: "必填",
                    minlength: $.validator.format("密码不能小于{0}个字符")
                },
                "newPassword": {
                    required: "必填",
                    minlength: $.validator.format("密码不能小于{0}个字符")
                },
                "confirmedPassword": {
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
                    error.appendTo(element.next());

                }else if (element.attr("name") == "cellphone") {
                    error.insertAfter(element);
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

    $(function() {
        validateForm();

    });

})(jQuery);