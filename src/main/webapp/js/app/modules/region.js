/**
 * Created by Bright Huang on 11/5/14.
 */

define(['jquery', 'sannong', 'ajaxHandler'], function($, sannong, ajaxHandler) {

    "use strict";

    var region = {};
    region.Model = {companyProvince: "", companyCity: "", companyDistrict: ""};

    region.Controller = {
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
        },
        addProvinceSelectionsOnly: function(){
            var options = {
                url: 'getProvinces',
                type: 'POST',
                success: function(provinces){
                    var provinceSelect = $('#provinceSelect');
                    $('#provinceSelect option').remove();
                    $('#citySelect option').remove();
                    $('#districtSelect option').remove();

                    $('#provinceSelect').append('<option value="">省/直辖市</option>');
                    $('#citySelect').append('<option value="">市</option>');
                    $('#districtSelect').append('<option value="">县/市辖区</option>');

                    for (var i in provinces){
                        var optionValue = provinces[i].provinceIndex;
                        var optionText = provinces[i].provinceName;
                        var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                        provinceSelect.append(option);
                    }
                },
                fail: function(error){
                }
            }
            ajaxHandler.sendRequest(options);
        },
        addCitySelectionsOnly: function() {
            var provinceIndex = $("#provinceSelect").val();
            var options = {
                url: 'getCities',
                type: 'POST',
                data: {'provinceIndex': provinceIndex},
                success: function(cities){
                    var citySelect = $('#citySelect');
                    $('#citySelect option').remove();
                    $('#districtSelect option').remove();

                    $('#citySelect').append('<option value="">市</option>');
                    $('#districtSelect').append('<option value="">县/市辖区</option>');
                    for (var i in cities){
                        var optionValue = cities[i].cityIndex;
                        var optionText = cities[i].cityName;
                        var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                        citySelect.append(option);
                    }
                    if (region.Model.companyCity != ""){
                        $("#citySelect").val(region.Model.companyCity);
                        region.Model.companyCity = "";
                    }
                },
                fail: function(data){
                }
            }
            ajaxHandler.sendRequest(options);
        },
        addDistrictSelectionsOnly: function(){
            var cityIndex= $('#citySelect').val();
            var options = {
                url: 'getDistricts',
                type: 'POST',
                data: {'cityIndex': cityIndex},
                success: function(districts){
                    var districtSelect = $('#districtSelect');
                    $('#districtSelect option').remove();

                    $('#districtSelect').append('<option value="">县/市辖区</option>');
                    for (var i in districts){
                        var optionValue = districts[i].districtIndex
                        var optionText = districts[i].districtName;
                        var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                        districtSelect.append(option);
                    }
                },
                fail: function(data){
                }
            }
            ajaxHandler.sendRequest(options);

        },
        addProvinces: function(){
            var options = {
                url: 'getProvinces',
                type: 'POST',
                success: function(data){
                    region.Controller.addProvinceSelections(data);
                },
                fail: function(error){
                }
            }
            ajaxHandler.sendRequest(options);
        },
        addProvinceSelections: function(provinces) {
            var provinceSelect = $('#provinceSelect');
            $('#provinceSelect option').remove();
            $('#citySelect option').remove();
            $('#districtSelect option').remove();

            //provinceSelect.append('<option value="">省/直辖市</option>');

            for (var i in provinces){
                var optionValue = provinces[i].provinceIndex;
                var optionText = provinces[i].provinceName;
                var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                provinceSelect.append(option);
            }
            if (region.Model.companyProvince != ""){
                $("#provinceSelect").val(region.Model.companyProvince);
                region.Model.companyProvince = "";
            }
            region.Controller.addCities();
        },

        addCities: function(){
            var provinceIndex = $("#provinceSelect").val();
            var options = {
                url: 'getCities',
                type: 'POST',
                data: {'provinceIndex': provinceIndex},
                success: function(data){
                    region.Controller.addCitySelections(data);
                },
                fail: function(data){
                }
            }
            ajaxHandler.sendRequest(options);
        },
        addCitySelections: function(cities) {
            var citySelect = $('#citySelect');
            $('#citySelect option').remove();
            $('#districtSelect option').remove();

            //citySelect.append('<option value="">市</option>');
            for (var i in cities){
                var optionValue = cities[i].cityIndex;
                var optionText = cities[i].cityName;
                var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                citySelect.append(option);
            }
            if (region.Model.companyCity != ""){
                $("#citySelect").val(region.Model.companyCity);
                region.Model.companyCity = "";
            }
            region.Controller.addDistricts();
        },
        addDistricts: function(){
            var cityIndex= $('#citySelect').val();
            var options = {
                url: 'getDistricts',
                type: 'POST',
                data: {'cityIndex': cityIndex},
                success: function(data){
                    region.Controller.addDistrictSelections(data);
                },
                fail: function(data){
                }
            }
            ajaxHandler.sendRequest(options);
        },
       addDistrictSelections: function(districts) {
            var districtSelect = $('#districtSelect');
            $('#districtSelect option').remove();

            //districtSelect.append('<option value="">县/市辖区</option>');
            for (var i in districts){
                var optionValue = districts[i].districtIndex
                var optionText = districts[i].districtName;
                var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                districtSelect.append(option);
            }
            if (region.Model.companyDistrict != ""){
                $("#districtSelect").val(region.Model.companyDistrict);
                region.Model.companyDistrict = "";
            }
        },
        saveRegion: function(){
            region.Model.companyProvince = $("#provinceValue").val();
            region.Model.companyCity = $("#cityValue").val();
            region.Model.companyDistrict = $("#districtValue").val();
        }

    }

    region.select = function(select, initOptions){
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
                if ($this.attr("id") == "provinceSelect"){
                    $("#provinceSelect").val(parseInt(selectedRel, 10));
                    ajaxHandler.sendRequest({
                        url: 'getCitiesWithDistricts',
                        type: 'POST',
                        data: {'provinceIndex': parseInt(selectedRel, 10)},
                        success: function(data){
                            $("#wrap_citySelect").remove();
                            $("#citySelectDiv").html('<select id="citySelect" name="companyCity" class="select-hidden"></select>');
                            region.Controller.addCityOptions("#citySelect", data.cities);
                            region.select('select[id=citySelect]');

                            $("#wrap_districtSelect").remove();
                            $("#districtSelectDiv").html('<select id="districtSelect" name="companyDistrict" class="select-hidden"></select>');
                            region.Controller.addDistrictOptions("#districtSelect", data.districts);
                            region.select('select[id=districtSelect]');

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
                            region.Controller.addDistrictOptions("#districtSelect", data);
                            region.select('select[id=districtSelect]');
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
                            region.Controller.addCityOptions("#cityQuerySelect", data.cities);
                            $("#cityQuerySelect").prepend('<option value="">市</option>');
                            region.select('select[id=cityQuerySelect]');

                            $("#wrap_districtQuerySelect").remove();
                            $("#districtQuerySelectDiv").html('<select id="districtQuerySelect" name="districtQuerySelect" class="select-hidden"></select>');
                            region.Controller.addDistrictOptions("#districtQuerySelect", data.districts);
                            $("#districtQuerySelect").prepend('<option value="">县/市辖区</option>');
                            region.select('select[id=districtQuerySelect]');

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
                            region.Controller.addDistrictOptions("#districtQuerySelect", data);
                            $("#districtQuerySelect").prepend('<option value="">县/市辖区</option>');
                            region.select('select[id=districtQuerySelect]');
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

    sannong.Region = region;
    return region;

});