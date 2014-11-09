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

                    var userInfoForm = "userInfoForm";
                    var myInfoForm = "myInfoForm";

                    $("#provinceSelect").change(function(event){
                        region.Controller.addCities();
                    });

                    $("#citySelect").change(function(event){
                        $('#districtSelect option').remove();
                        region.Controller.addDistricts();
                    });

                    $("#register-btn").click(function(event){
                        if (formValidator.getValidator("#myInfoForm").form() == true){
                            $("#myInfoForm").submit();
                        }
                    });

                    $("#register-btn").click(function(event){
                        if (formValidator.getValidator("#myInfoForm").form() == true){
                            $("#userInfoForm").submit();
                        }
                    });

                    $("#confirmedSubmit").click(function(event){
                        $("#myInfoForm").submit();
                    });

                    $("#validationCode").keyup(function(){
                        if (formValidator.getValidator("#myInfoForm").element($("#validationCode")) == true && $("#validationCode").val() != ""){
                            $("#applicationSubmit").removeAttr("disabled");
                            $("#applicationSubmit").removeClass().addClass("btn btn-success");
                        } else {
                            $("#applicationSubmit").attr({disabled: "disabled"});
                            $("#applicationSubmit").removeClass().addClass("btn btn-default");
                        }

                    });

                    $("#action-send-code").click(function(event){
                        if (formValidator.getValidator("#myInfoForm").form() == true){
                            var options = {
                                url: 'regcode',
                                type: 'GET',
                                data: {
                                    mobile: $("#cellphone").val(),
                                    smstype: $("#action-send-code").attr("data-type")
                                },
                                success: function(data){
                                },
                                fail: function(data){
                                }
                            }
                            ajaxHandler.sendRequest(options);
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