/**
 * Created by Bright Huang on 11/5/14.
 */

define(['jquery', 'sannong', 'ajaxHandler'], function($, sannong, ajaxHandler) {

    "use strict";

    var selector = {};
    selector.Model = {companyProvince: "", companyCity: "", companyDistrict: ""};
    selector.View = {
        addCityOptions: function(select, options){
            var citySelect = $(select);
            $(select + ' option').remove();
            for (var i in options){
                var optionValue = options[i].cityIndex;
                var optionText = options[i].cityName;
                var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                citySelect.append(option);
            }
        },
        addDistrictOptions: function(select, options){
            var districtSelect = $(select);
            $(select + ' option').remove();
            for (var i in options){
                var optionValue = options[i].districtIndex;
                var optionText = options[i].districtName;
                var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                districtSelect.append(option);
            }
        },
        selectOption: function(select, optionVal){
            $(select).val(optionVal);
        }
    };

    selector.Controller = {

    }

    selector.initSelect = function(select, initOptions){
        $(select).each(function(){
            var selectName = $(this).attr("name");
            var selectId =  $(this).attr("id");
            var $this = $(this), numberOfOptions = $(this).children('option').length;

            $this.addClass('select-hidden');
            $this.wrap('<div class="select" id="wrap_' + selectId + '"></div>');
            $this.after('<div class="select-styled selected_'+selectName+'"></div>');

            var $styledSelect = $this.next('div.select-styled');
            var styledSelectRel = $this.children('option').eq(0).val();

            if (selectId == "provinceSelect" && initOptions != undefined){
                $styledSelect.text(initOptions.provinceOption.text);
                $styledSelect.attr("rel", initOptions.provinceOption.value);
            }else if (selectId == "citySelect" && initOptions != undefined){
                $styledSelect.text(initOptions.cityOption.text);
                $styledSelect.attr("rel", initOptions.cityOption.value);
            }else if (selectId == "districtSelect" && initOptions != undefined){
                $styledSelect.text(initOptions.districtOption.text);
                $styledSelect.attr("rel", initOptions.districtOption.value);
            }else{
                $styledSelect.text($this.children('option').eq(0).text());
                $styledSelect.attr("rel", styledSelectRel);
            }

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

                if ($this.attr("id") == "companyProvinceSelect"){
                    $("#companyProvinceSelect").val(parseInt(selectedRel, 10));
                    ajaxHandler.sendRequest({
                        url: 'getCitiesWithDistricts',
                        type: 'POST',
                        data: {'provinceIndex': $("#companyProvinceSelect").val()},
                        success: function(data){
                            $("#wrap_citySelect").remove();
                            $("#citySelectDiv").html('<select id="companyCitySelect" name="applicant.companyCity" class="select-hidden"></select>');
                            selector.View.addCityOptions("#companyCitySelect", data.cities);
                            selector.initSelect('select[id=companyCitySelect]');

                            $("#wrap_districtSelect").remove();
                            $("#districtSelectDiv").html('<select id="companyDistrictSelect" name="applicant.companyDistrict" class="select-hidden"></select>');
                            selector.View.addDistrictOptions("#companyDistrictSelect", data.districts);
                            selector.initSelect('select[id=companyDistrictSelect]');

                        },
                        fail: function(data){
                        }
                    });

                }else if ($this.attr("id") == "companyCitySelect"){
                    $("#companyCitySelect").val(parseInt(selectedRel, 10));
                    ajaxHandler.sendRequest({
                        url: 'getDistricts',
                        type: 'POST',
                        data: {'cityIndex': $("#companyCitySelect").val()},
                        success: function(data){
                            $("#wrap_districtSelect").remove();
                            $("#districtSelectDiv").html('<select id="companyDistrictSelect" name="applicant.companyDistrict" class="select-hidden"></select>');
                            selector.View.addDistrictOptions("#companyDistrictSelect", data);
                            selector.initSelect('select[id=companyDistrictSelect]');
                        },
                        fail: function(data){
                        }
                    });
                }else if($this.attr("id") == "companyDistrictSelect"){
                    $("#companyDistrictSelect").val(parseInt(selectedRel, 10));
                }else if ($this.attr("id") == "provinceSelect"){
                    $("#provinceSelect").val(parseInt(selectedRel, 10));
                    ajaxHandler.sendRequest({
                        url: 'getCitiesWithDistricts',
                        type: 'POST',
                        data: {'provinceIndex': parseInt(selectedRel, 10)},
                        success: function(data){
                            $("#wrap_citySelect").remove();
                            $("#citySelectDiv").html('<select id="citySelect" name="companyCity" class="select-hidden"></select>');
                            selector.View.addCityOptions("#citySelect", data.cities);
                            selector.initSelect('select[id=citySelect]');

                            $("#wrap_districtSelect").remove();
                            $("#districtSelectDiv").html('<select id="districtSelect" name="companyDistrict" class="select-hidden"></select>');
                            selector.View.addDistrictOptions("#districtSelect", data.districts);
                            selector.initSelect('select[id=districtSelect]');

                        },
                        fail: function(data){
                        }
                    });

                }else if ($this.attr("id") == "citySelect"){
                    $("#citySelect").val(parseInt(selectedRel, 10));
                    ajaxHandler.sendRequest({
                        url: 'getDistricts',
                        type: 'POST',
                        data: {'cityIndex': parseInt(selectedRel, 10)},
                        success: function(data){
                            $("#wrap_districtSelect").remove();
                            $("#districtSelectDiv").html('<select id="districtSelect" name="companyDistrict" class="select-hidden"></select>');
                            selector.View.addDistrictOptions("#districtSelect", data);
                            selector.initSelect('select[id=districtSelect]');
                        },
                        fail: function(data){
                        }
                    });
                }else if($this.attr("id") == "districtSelect"){
                    $("#districtSelect").val(parseInt(selectedRel, 10));
                }else if($this.attr("id") == "provinceQuerySelect"){
                    $("#provinceQuerySelect").val(parseInt(selectedRel, 10));
                    ajaxHandler.sendRequest({
                        url: 'getCitiesWithDistricts',
                        type: 'POST',
                        data: {'provinceIndex': parseInt(selectedRel, 10)},
                        success: function(data){
                            $("#wrap_cityQuerySelect").remove();
                            $("#cityQuerySelectDiv").html('<select id="cityQuerySelect" name="cityQuerySelect" class="select-hidden"></select>');
                            selector.View.addCityOptions("#cityQuerySelect", data.cities);
                            $("#cityQuerySelect").prepend('<option value="">市</option>');
                            selector.initSelect('select[id=cityQuerySelect]');

                            $("#wrap_districtQuerySelect").remove();
                            $("#districtQuerySelectDiv").html('<select id="districtQuerySelect" name="districtQuerySelect" class="select-hidden"></select>');
                            selector.View.addDistrictOptions("#districtQuerySelect", data.districts);
                            $("#districtQuerySelect").prepend('<option value="">县/市辖区</option>');
                            selector.initSelect('select[id=districtQuerySelect]');

                        },
                        fail: function(data){
                        }
                    });
                }else if($this.attr("id") == "cityQuerySelect"){
                    $("#cityQuerySelect").val(parseInt(selectedRel, 10));
                    ajaxHandler.sendRequest({
                        url: 'getDistricts',
                        type: 'POST',
                        data: {'cityIndex': parseInt(selectedRel, 10)},
                        success: function(data){
                            $("#wrap_districtQuerySelect").remove();
                            $("#districtQuerySelectDiv").html('<select id="districtQuerySelect" name="districtQuerySelect" class="select-hidden"></select>');
                            selector.View.addDistrictOptions("#districtQuerySelect", data);
                            $("#districtQuerySelect").prepend('<option value="">县/市辖区</option>');
                            selector.initSelect('select[id=districtQuerySelect]');
                        },
                        fail: function(data){
                        }
                    });
                }else if($this.attr("id") == "districtQuerySelect"){
                    $("#districtQuerySelect").val(parseInt(selectedRel, 10));
                }else if($this.attr("id") == "searchKey"){
                    $("#searchKey").val(selectedRel);
                }
            });

            $(document).click(function() {
                $styledSelect.removeClass('active');
                $list.hide();
            });

        });

    }

    sannong.Selector = selector;
    return selector;

});