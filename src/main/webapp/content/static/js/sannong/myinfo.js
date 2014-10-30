;
(function($) {
    $(document).ready(function() {
        $province = $("#provinceSelect");
        $city = $("#citySelect");
        $district = $("#districtSelect");
        var initProvince = function() {
            $.ajax({
                type: "get",
                async: false,
                url: 'getProvinces',
                success: function(data) {
                    for (var i = 0; i < data.length; i = i + 1) {
                        if ($("#provinceValue").val() == data[i].provinceIndex)
                            $province.append("<option value='" + data[i].provinceIndex + "' selected>" + data[i].provinceName + "</option>");
                        else
                            $province.append("<option value='" + data[i].provinceIndex + "' >" + data[i].provinceName + "</option>");
                    }
                }
            });
        };
        initProvince();
        $province.change(function() {
            var index = $(this).children('option:selected').val();
            if ($city.find('option') != undefined)
                $city
                .find('option')
                .remove()
                .end()
                .append('<option></option>');
            if ($district.find('option') != undefined)
                $district
                .find('option')
                .remove()
                .end()
                .append('<option></option>');

            $.ajax({
                type: "get",
                async: false,
                url: 'getCities',
                data: {
                    "provinceIndex": index
                },
                success: function(data) {
                    for (var i = 0; i < data.length; i = i + 1) {
                        if ($("#cityValue").val() == data[i].cityIndex) {
                            $city.append("<option value='" + data[i].cityIndex + "' selected>" + data[i].cityName + "</option>");
                            $city.change();
                        } else
                            $city.append("<option value='" + data[i].cityIndex + "' >" + data[i].cityName + "</option>");
                    }
                }
            });
        });
        $city.change(function() {
            var index = $(this).children('option:selected').val();
            if ($district.find('optioin') != undefined)
                $district
                .find('option')
                .remove()
                .end()
                .append('<option></option>');
            $.ajax({
                type: "get",
                async: false,
                url: 'getDistricts',
                data: {
                    "cityIndex": index
                },
                success: function(data) {
                    for (var i = 0; i < data.length; i = i + 1) {
                        if ($("#districtValue").val() == data[i].districtIndex)
                            $district.append("<option value='" + data[i].districtIndex + "' selected>" + data[i].districtName + "</option>");
                        else
                            $district.append("<option value='" + data[i].districtIndex + "' >" + data[i].districtName + "</option>");
                    }
                }
            });
        });
        $province.change();
    });
    $(function() {
        var emailRegEx = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i,
            mobileRegEx = /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/,
            userNameRegEx = /^[a-zA-Z0-9]\w+$/,
            passRegEx = /^.{5,25}$/,
            numRegEx = /^[_\d]+$/;
        var errorSpan = $('#error-row');
        var username_hash = {};
        var store = {};
        //解决firefox下刷新不了用户名的问题
        $user = $('#userName');
        $user.val('');
        var username_valid = function(ev) {
            var showError = function($obj, txt) {
                var $td = $obj.parent();
                $td.find(".errorDiv").html(txt);
                $td.find("i").css("display", "inline-block").removeClass("icon_yes");
            };
            var showTrue = function($obj) {
                var $td = $obj.closest("td");
                $td.find(".errorDiv").html("");
                $td.find("i").css("display", "inline-block").removeClass("icon_no").addClass("icon_yes")
            };

            var userName = $.trim($user.val());

            var sep = ',',
                isErr = 0,
                msg = '';
            if (!userName || userName.length < 4 || userName.length > 16 || !userNameRegEx.test(userName)) {
                msg = '请输入4-16个字符，支持英文或英文与数字组合';
                showError($user, msg);
                isErr = 1;
            } else if (numRegEx.test(userName)) {
                msg = '不能只有数字或下划线';
                showError($user, msg);
                isErr = 1;
            } else if (userName in username_hash) {
                msg = '该用户名已被使用';
                showError($user, msg);
                isErr = 1;
            }

            if (isErr) {
                $user.get(0).setAttribute("iserr", isErr);
                $user.get(0).setAttribute("msg", msg);
                return false;
            }

            var url = "useravail";

            $.ajax({
                type: "get",
                async: false,
                data: {
                    "username": userName
                },
                beforeSend: function() {
                    msg = '验证中...';
                    showError($user, msg);
                },
                url: url,
                success: function(data) {
                    if (!data) {
                        {
                            //本地存储
                            username_hash[userName] = true;
                            msg = '该用户名已被使用';
                            showError($user, msg);
                            isErr = 1;
                        }

                    } else if (data == null) {
                        msg = '系统发生错误';
                        showError($user, msg);
                        isErr = 1;
                    } else {
                        showTrue($user);
                    }
                },
                error: function(e) {
                    console.log('error', e);
                }
            });
            $user.attr("iserr", isErr);
            $user.attr("msg", msg);
        };

        var valid = function(ev) {
            var hasError = false,
                $user = $('#userName');
            $('#applicationForm').find(".errorDiv").html("");
            $('#applicationForm').find("i").removeClass();
            var showError = function($obj, txt) {
                var $td = $obj.parent();
                $td.find(".errorDiv").html(txt);
                $td.find("i").css("display", "inline-block").removeClass("icon_yes");
            };
            var showTrue = function($obj) {
                var $td = $obj.closest("td");
                $td.find(".errorDiv").html("");
                $td.find("i").css("display", "inline-block").removeClass("icon_no").addClass("icon_yes")
            };
            if ($user.attr("iserr")) {
                if ($user.attr("iserr") == '1') {
                    showError($user, $user.attr("msg") || '');
                    hasError = true;
                    return false;
                } else {
                    showTrue($user);
                    hasError = false;
                }
            } else {
                var msg = '请输入4-16个字符，支持英文或英文与数字组合';
                showError($user, msg);
                hasError = true;
                return false;
            }
            if (!$.trim($('#mailbox').val())) {
                showError($('#mailbox'), '请填写有效的邮箱地址');
                hasError = true;
                return false;
            } else if (!emailRegEx.test($.trim($('#mailbox').val()))) {
                showError($('#mailbox'), '请填写有效的邮箱地址');
                hasError = true;
                return false;
            } else {
                showTrue($('#mailbox'));
                hasError = false;
            }
            if (!$.trim($('#cellphone').val())) {
                showError($('#cellphone'), '请填写有效的手机号');
                hasError = true;
                return false;
            } else if (!mobileRegEx.test($.trim($('#cellphone').val()))) {
                showError($('#cellphone'), '请填写有效的手机号');
                hasError = true;
                return false;
            } else {
                showTrue($('#input-mobile'));
                hasError = false;
            }
            $regcode = $('#validationCode');
            if (!$.trim($regcode.val())) {
                showError($regcode, '请填写6位数字验证码');
                hasError = true;
                return false;
            } else if (!/^\d{6}$/.test($regcode.val())) {
                showError($regcode, '请填写6位数字验证码');
                hasError = true;
                return false;
            } else {
                showTrue($regcode);
                hasError = false;
            }
            if (!!hasError) {
                ev.preventDefault();
                return false;
            }
            return true;
        };
        $('#register-btn').click(function(ev) {
            //         $('#applicationForm').submit(function(ev) {
            if (!valid(ev)) {
                return false;
            } else {
                var url = 'CheckInvitecode';
                var invite_code = $('#validationcode').val();
                if (invite_code && invite_code != '') {
                    var returnStatus = false;
                    $('#register-btn').addClass("gray");
                    $('#register-btn').attr('disabled', true);
                    $.ajax({
                        type: "get",
                        data: {
                            code: invite_code
                        },
                        url: url,
                        success: function(data) {
                            if (data == '1') {
                                returnStatus = true;
                                $('#applicationForm').submit();
                            } else {

                                if (returnStatus === false) {
                                    $('#register-btn').removeClass("gray");
                                    $('#register-btn').attr('disabled', false);
                                }
                            }
                        }
                    });
                } else {
                    //防止重复点击
                    $('.register-btn').addClass("gray").attr('disabled', true);
                    $('#applicationForm').submit();
                }
                return returnStatus;
            }
        });
        $('#userName').on("blur", function(ev) {
            username_valid(ev);
        });

        $('#applicationForm').on("blur focus", ".text", function(ev) {
            valid(ev);
        });

        $('#applicationForm').on("click", "#agree", function(ev) {
            valid(ev);
        });
        //发送短信请求ajax
        var sendNum = 1; //判断是否第一次点击发送

        $('#action-send-code').removeAttr('disabled').click(function(ev) {
            var phone = $("#cellphone").val();
            var mobileRegEx = /^0?(13[0-9]|15[0-9]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/;
            var errorSpan = $(this).parent().find(".errorDiv");
            var button = $(this);
            var btGray = function() {
                button.addClass("gray");
                button.val("正在获取中...");
                button.attr('disabled', 'disabled');
                // updateTimeLabel(180);
            };


            errorSpan.html('');
            if (!mobileRegEx.test(phone)) {
                errorSpan.html('手机号格式不正确');
                return false;
            }
            btGray();

            function updateTimeLabel(duration) {
                var timeRemained = duration;
                var timer = setInterval(function() {
                    button.val(timeRemained + '秒后重新发送');
                    timeRemained -= 1;
                    if (timeRemained == -1) {
                        clearInterval(timer);
                        button.val('重新发送').removeAttr('disabled').removeClass("gray");
                    }
                }, 1000);
            }

            var sendMsg = function(url, smstype) {
                sendNum = 2;
                $.ajax({
                    type: "get",
                    data: {
                        type: '1',
                        smstype: smstype,
                        t: new Date().getTime(),
                        mobile: phone,
                    },
                    url: url,
                    //async: false,
                    dataType: "json",
                    success: function(data) {

                        if (data == true) {
                            updateTimeLabel(60, 'action-send-code');
                            return;
                        } else {
                            $.showErr(data.message, function() {}, "提示");
                        }
                        button.val('重新发送').removeAttr('disabled').removeClass("gray");
                    }
                });
            };
            //updateTimeLabel(180, 'action-send-code');
            if (sendNum == 1) {
                sendMsg(button.data("url"), button.data("type"));
            } else {
                $("#cellphone").parent().find(".errorDiv").text('*如未收到验证码，再次发送');
                sendMsg(button.data("url2"), button.data("type"));
            }

        });
    })
})(jQuery);
//用于未来扩展的提示正确错误的JS
$.showErr = function(str, func, title) {
    $.weeboxs.open(str, {
        boxid: 'fanwe_error_box',
        contenpe: 'text',
        showButton: true,
        showCancel: false,
        showOk: true,
        title: title,
        width: 250,
        type: 'wee',
        onclose: func
    });
};
