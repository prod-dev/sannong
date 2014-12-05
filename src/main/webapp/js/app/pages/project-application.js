/**
 * Created by Bright Huang on 10/26/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'handlebars', 'sannong', 'login', 'validate', 'ajaxHandler',
            'questionnaire', 'jqueryForm', 'formValidator', 'region', 'additionalMethods'],
        function($, bootstrap, handlebars, sannong, login, validate, ajaxHandler,
                 questionnaire, jqueryForm, formValidator, region, additionalMethods) {

            "use strict";

            var projectApplication = {};
            projectApplication.Model = {};
            projectApplication.View = {
                cellphone: $("#projectAppForm_cellphone"),
                cellphoneError: $("#cellphone-error"),
                validationCode: $("#projectAppForm_validationCode"),
                validationCodeError: $("#validationCode-error"),
                projectApplicationFormSubmit: $("#projectAppForm_submit")
            };

            projectApplication.Controller = {
                showUniqueCellphoneError: function(message) {
                    var errorLabel = '<label id="projectAppForm_cellphone-error" class="error" for="cellphone" style="display: inline-block;">' + message + '</label>';
                    projectApplication.View.cellphoneError.remove();
                    projectApplication.View.cellphone.removeClass("error");
                    projectApplication.View.cellphone.after(errorLabel);
                    projectApplication.View.cellphone.addClass("error");
                },
                showValidationCodeError: function(message) {
                    var errorLabel = '<label id="projectAppForm_validationCode-error" class="error" for="validation" style="display: inline-block;">' + message + '</label>';
                    projectApplication.View.validationCodeError.remove();
                    projectApplication.View.validationCode.removeClass("error");
                    projectApplication.View.validationCode.after(errorLabel);
                    projectApplication.View.validationCode.addClass("error");
                },
                showValidationCodeMessage: function(message) {
                    projectApplication.Controller.showValidationCodeError(message);
                },
                enableSubmitButton: function() {
                    projectApplication.View.projectApplicationFormSubmit.removeClass("disabled");
                },
                disableSubmitButton: function() {
                    projectApplication.View.projectApplicationFormSubmit.addClass("disabled");
                }
            };

            function addEventListener() {
                $("#provinceSelect").change(function() {
                    ajaxHandler.sendRequest({
                        url: 'getCities',
                        type: 'POST',
                        data: {'provinceIndex': $("#projectAppForm_provinceSelect").val()},
                        success: function(data){
                            region.View.addCityOptions("#projectAppForm_citySelect", data);
                        },
                        fail: function(data){
                        }
                    });

                });


                $("#projectAppForm_validationBtn").click(function() {
                    if ($("#projectAppForm_validationBtn").hasClass("disabled")){
                        return;
                    }
                    if (formValidator.getValidator("#projectAppForm").form() == true) {
                        ajaxHandler.sendRequest({
                            url: 'project-application/sendValidationCode',
                            type: 'POST',
                            data: {cellphone: $("#projectAppForm_cellphone").val()},
                            success: function (response) {
                                if (response.statusCode < 2000) {
                                    additionalMethods.updateTimeLabel("#projectAppForm_validationBtn", "验证码");
                                    projectApplication.Controller.enableSubmitButton();
                                    $("#projectAppForm_validationBtn").addClass("disabled");
                                    $("#projectAppForm_validationCode").removeAttr("disabled");
                                    projectApplication.Controller.showValidationCodeMessage(response.statusDescription);
                                } else {
                                    $("#projectAppForm_validationBtn").removeClass("disabled");
                                    $("#projectAppForm_validationCode").attr({disabled: "disabled"});
                                    projectApplication.Controller.disableSubmitButton();
                                    if (response.statusCode == 2012){
                                        projectApplication.Controller.showUniqueCellphoneError(response.statusDescription);
                                    }else{
                                        projectApplication.Controller.showValidationCodeError(response.statusDescription);
                                    }
                                }
                            },
                            fail: function (response) {
                                $("#projectAppForm_validationBtn").removeClass("disabled");
                                $("#projectAppForm_validationCode").removeAttr("disabled");
                                projectApplication.Controller.disableSubmitButton();
                                projectApplication.Controller.showValidationCodeError("验证码发送失败");
                            }

                        });
                    }
                });


                $("#projectAppForm_submit").click(function (event) {
                    if ($("#projectAppForm_submit").hasClass("disabled") == true) { return;}

                    if (formValidator.getValidator("#projectAppForm").form() == true){

                        ajaxHandler.sendRequest({
                            type: "POST",
                            url: "project-application/validate-application-form",
                            dataType: "json",
                            data: {
                                cellphone: $("#projectAppForm_cellphone").val(),
                                validationCode: $("#projectAppForm_validationCode").val()
                            },
                            success: function (response) {
                                if (response.statusCode < 2000) {
                                    $("#projectAppModelTrigger").click();
                                } else{
                                    projectApplication.Controller.showValidationCodeError(response.statusDescription);
                                }
                            },
                            fail: function (response) {
                                projectApplication.Controller.showValidationCodeError(response.statusDescription);
                            }
                        });
                    }
                });

                $("#confirmedSubmit").click(function (event) {
                    $("#projectAppForm").submit();
                });
            }


            projectApplication.select = function(select){
                $(select).each(function(){
                    var selectName = $(this).attr("name");
                    var selectId =  $(this).attr("id");
                    var $this = $(this), numberOfOptions = $(this).children('option').length;

                    $this.addClass('select-hidden');
                    $this.wrap('<div class="select" id="wrap_' + selectId + '"></div>');
                    $this.after('<div class="select-styled selected_'+selectName+'"></div>');


                    var $styledSelect = $this.next('div.select-styled');
                    $styledSelect.text($this.children('option').eq(0).text());

                    var styledSelectRel = $this.children('option').eq(0).val();
                    $styledSelect.attr("rel", styledSelectRel);

                    var $list = $('<ul />', {'class': 'select-options option_'+selectName+''}).insertAfter($styledSelect);

                    for (var i = 0; i < numberOfOptions; i++) {
                        $('<li />', {
                            text: $this.children('option').eq(i).text(),
                            rel: $this.children('option').eq(i).val()
                        }).appendTo($list);
                    }

                    var $listItems = $list.children('li');

                    $styledSelect.click(function(e) {
                        e.stopPropagation();
                        $('div.select-styled.active').each(function(){
                            $(this).removeClass('active').next('ul.select-options').hide();
                        });
                        $(this).toggleClass('active').next('ul.select-options').slideToggle(200);
                    });

                    $listItems.click(function(e) {
                        e.stopPropagation();
                        $styledSelect.text($(this).text()).removeClass('active');
                        var selectedRel = $(this).attr('rel');
                        $styledSelect.attr("rel", selectedRel);
                        $this.val($(this).attr('rel'));
                        //alert($(this).text());
                        $list.hide();
                        //console.log($this.val());
                        if ($this.attr("id") == "provinceSelect"){
                            $("#provinceSelect").val(parseInt(selectedRel, 10));
                            ajaxHandler.sendRequest({
                                url: 'getCitiesWithDistricts',
                                type: 'POST',
                                data: {'provinceIndex': $("#provinceSelect").val()},
                                success: function(data){
                                    $("#wrap_citySelect").remove();
                                    $("#citySelectDiv").html('<select id="citySelect" name="applicant.companyCity" class="select-hidden"></select>');
                                    region.View.addCityOptions("#citySelect", data.cities);
                                    projectApplication.select('select[id=citySelect]');

                                    $("#wrap_districtSelect").remove();
                                    $("#districtSelectDiv").html('<select id="districtSelect" name="applicant.companyDistrict" class="select-hidden"></select>');
                                    region.View.addDistrictOptions("#districtSelect", data.districts);
                                    projectApplication.select('select[id=districtSelect]');

                                },
                                fail: function(data){
                                }
                            });

                        }else if ($this.attr("id") == "citySelect"){
                            $("#citySelect").val(parseInt(selectedRel, 10));
                            ajaxHandler.sendRequest({
                                url: 'getDistricts',
                                type: 'POST',
                                data: {'cityIndex': $("#citySelect").val()},
                                success: function(data){
                                    $("#wrap_districtSelect").remove();
                                    $("#districtSelectDiv").html('<select id="districtSelect" name="applicant.companyDistrict" class="select-hidden"></select>');
                                    region.View.addDistrictOptions("#districtSelect", data);
                                    projectApplication.select('select[id=districtSelect]');
                                },
                                fail: function(data){
                                }
                            });
                        }else if($this.attr("id") == "districtSelect"){
                            $("#districtSelect").val(parseInt(selectedRel, 10));
                        }
                    });

                    $(document).click(function() {
                        $styledSelect.removeClass('active');
                        $list.hide();
                    });

                });

            }


            $(function() {
                projectApplication.select('select');
                questionnaire.showQuestionnaire();
                addEventListener();
            });

    sannong.ProjectApplication = projectApplication;
    return projectApplication;

    });
});
