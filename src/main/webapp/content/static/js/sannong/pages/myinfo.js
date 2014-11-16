/**
 * Created by Bright Huang on 11/1/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'sannong', 'validate', 'ajaxHandler', 'jqueryForm', 'formValidator', 'region', 'additionalMethods'],
        function($, bootstrap, sannong, validate, ajaxHandler, jqueryForm, formValidator, region, additionalMethods) {

            "use strict";

            var myInfo = {};
            myInfo.Model = {}
            myInfo.View = {};

            myInfo.Controller = {
                addEventListener: function(){
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

                    /*
                    $("#validationCode").keyup(function(){
                        if (formValidator.getValidator("#myInfoForm").element($("#validationCode")) == true && $("#validationCode").val() != ""){
                            $("#applicationSubmit").removeAttr("disabled");
                            $("#applicationSubmit").removeClass().addClass("btn btn-success");
                        } else {
                            $("#applicationSubmit").attr({disabled: "disabled"});
                            $("#applicationSubmit").removeClass().addClass("btn btn-default");
                        }

                    });
                    */

                    $("#action-send-code").click(function(event){
                        var validator = formValidator.getValidator("#myInfoForm");
                        if (validator.form() == true && validator.element($("#newCellphone")) == true ){
                            additionalMethods.updateTimeLabel("#action-send-code", "验证码");
                            var options = {
                                url: 'sendValidationCode',
                                type: 'POST',
                                data: {
                                    newCellphone: $("#newCellphone").val(),
                                    smstype: $("#action-send-code").attr("data-type")
                                },
                                success: function(data){
                                    if (data != "") {
                                        $("#validationCode").removeAttr("disabled");
                                    } else {
                                        $("#validationCode").attr({disabled: "disabled"});
                                    }
                                },
                                fail: function(data){
                                    $("#validationCode").attr({disabled: "disabled"});
                                }
                            }
                            ajaxHandler.sendRequest(options);
                        }
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
                }
            };


            $(function() {
                region.Controller.saveRegion();
                region.Controller.addProvinces();
                myInfo.Controller.addEventListener();

            });

            sannong.MyInfo = myInfo;
            return myInfo;
        });
});