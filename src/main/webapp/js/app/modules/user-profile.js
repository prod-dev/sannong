/**
 * Created by Bright Huang on 11/1/14.
 */

define(['jquery', 'bootstrap', 'handlebars', 'sannong', 'validate', 'ajaxHandler', 'jqueryForm', 'formValidator',
        'region', 'additionalMethods'],
        function($, bootstrap, handlebars, sannong, validate, ajaxHandler, jqueryForm, formValidator,
                 region, additionalMethods) {

    "use strict";

    var userProfile = {};
    userProfile.Model = {
        newCellphoneError: '<label id="newCellphone-error" class="error" for="newCellphone" style="display: inline-block;">手机号码已存在</label>'
    };
    userProfile.View = {
        userProfileView: $("#userProfileView"),
        sideBar: $(".sidebar"),
        userManagementTab: $("#userManagementTab"),
        userProfileTab: $("#userProfileTab"),
        userPasswordTab: $("#userPasswordTab"),
        newCellphone: $("#newCellphone"),
        newCellphoneError: $("#newCellphone-error")
    };

    function sendValidationCode(){
        var options = {
            url: 'user-profile/sendValidationCode',
            type: 'POST',
            data: {
                newCellphone: $("#newCellphone").val()
            },
            success: function(response){
                if (response != "") {
                    $("#validationCode").removeAttr("disabled");
                } else {
                    $("#validationCode").attr({disabled: "disabled"});
                }
            },
            fail: function(response){
                $("#validationCode").attr({disabled: "disabled"});
            }
        }
        ajaxHandler.sendRequest(options);
    }

    function showValidationError(){
        userProfile.View.newCellphoneError.remove();
        userProfile.View.newCellphone.removeClass("error");
        userProfile.View.newCellphone.after(userProfile.Model.newCellphoneError);
        userProfile.View.newCellphone.addClass("error");
    }
            userProfile.addEventListener = function (){
        $("#provinceSelect").change(function(event){
            region.Controller.addCities();
        });

        $("#citySelect").change(function(event){
            $('#districtSelect option').remove();
            region.Controller.addDistricts();
        });

        $("#confirmedSubmit").click(function(event){
            $("#userProfileForm").submit();
        });

        $("#userProfileSubmit").click(function(event){
            var validator = formValidator.getValidator("#userProfileForm");
            if (validator.form() == true){
                $("#userProfileForm").ajaxSubmit(function(message) {
                    $("#return").after('<label id="jobTitle-error" class="error" for="jobTitle">已保存</label>');
                    return false;
                });
            }
        });

        $("#userInfoSubmit").click(function(event){
            if (formValidator.getValidator("#userInfoForm").form() == true){
                $("#userInfoForm").ajaxSubmit(function(message) {
                    $("#return").after('<label id="jobTitle-error" class="error" for="jobTitle">已保存</label>');
                    return false;
                });
            }
        });

        $("#action-send-code").click(function(event){
            ajaxHandler.sendRequest({
                type: "GET",
                url: "user-profile/validateUniqueCellphone",
                data:{cellphone: $("#newCellphone").val()},
                success: function(response){
                    if (response == true){
                        var validator = formValidator.getValidator("#userProfileForm");
                        var newCellphoneValid = validator.element($("#newCellphone"));
                        if (validator.form() == true && newCellphoneValid == true ){
                            additionalMethods.updateTimeLabel("#action-send-code", "验证码");
                            sendValidationCode();
                        }
                    }else{
                        showValidationError();
                    }
                },
                fail: function(){
                    showValidationError();
                }
            });
        });
    }

    userProfile.show = function(userName){
        ajaxHandler.sendRequest({
            type: "GET",
            url: "user-personal-center/user-profile",
            data:{userName: userName},
            success: function(response){
                if (response){
                    userProfile.Controller.renderUserProfileView(response);
                }
            },
            fail: function(){
            }
        });
    };

    userProfile.Controller = {
        renderUserProfileView: function(data){
            var userProfileViewHandler = handlebars.compile($("#user-profile-template").html());
            var html = userProfileViewHandler(data);
            userProfile.View.userProfileView.empty();
            userProfile.View.userProfileView.append(html);
        }

    };

    $(function() {
        region.Controller.saveRegion();
        region.Controller.addProvinces();
        userProfile.addEventListener();

    });

    sannong.UserProfile = userProfile;
    return userProfile;

});