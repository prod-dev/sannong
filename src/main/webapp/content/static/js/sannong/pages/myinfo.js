/**
 * Created by Bright Huang on 11/1/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'sannong', 'validate', 'ajaxHandler', 'jqueryForm', 'formValidator', 'region', 'additionalMethods'],
        function($, bootstrap, sannong, validate, ajaxHandler, jqueryForm, formValidator, region, additionalMethods) {

            "use strict";

            var myInfo = {};
            myInfo.Model = {
                newCellphoneError: '<label id="newCellphone-error" class="error" for="newCellphone" style="display: inline-block;">手机号码已存在</label>'
            }
            myInfo.View = {
                newCellphone: $("#newCellphone"),
                newCellphoneError: $("#newCellphone-error")
            };

            function sendValidationCode(){
                var options = {
                    url: 'sendValidationCode',
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
                myInfo.View.newCellphoneError.remove();
                myInfo.View.newCellphone.removeClass("error");
                myInfo.View.newCellphone..after(myInfo.Model.newCellphoneError);
                myInfo.View.newCellphone..addClass("error");
            }

            function addEventListener(){
                $("#provinceSelect").change(function(event){
                    region.Controller.addCities();
                });

                $("#citySelect").change(function(event){
                    $('#districtSelect option').remove();
                    region.Controller.addDistricts();
                });

                $("#confirmedSubmit").click(function(event){
                    $("#myInfoForm").submit();
                });

                $("#myInfoSubmit").click(function(event){
                    var validator = formValidator.getValidator("#myInfoForm");
                    if (validator.form() == true){
                        $("#myInfoForm").ajaxSubmit(function(message) {
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
                        url: "validateUniqueCellphone",
                        data:{cellphone: $("#newCellphone").val()},
                        success: function(response){
                            if (response == true){
                                var validator = formValidator.getValidator("#myInfoForm");
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

            myInfo.Controller = {};

            $(function() {
                region.Controller.saveRegion();
                region.Controller.addProvinces();
                addEventListener();

            });

            sannong.MyInfo = myInfo;
            return myInfo;
        });
});