/**
 * Created by Bright Huang on 11/5/14.
 */

define(['jquery', 'sannong', 'ajaxHandler'], function($, sannong, ajaxHandler) {

    "use strict";

    var region = {};
    region.Model = {
        provinceInit: false,
        cityInit: false,
        districtInit: false
    };

    region.addCities = function(){
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
    }

    region.addProvinces = function(){
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
    }

    region.addDistricts = function(){
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
    }


    region.Controller = {

        addProvinceSelections: function(provinces) {
            var provinceSelect = $('#provinceSelect');
            $('#provinceSelect option').remove();
            $('#citySelect option').remove();
            $('#districtSelect option').remove();

            for (var i in provinces){
                var optionValue = provinces[i].provinceIndex;
                var optionText = provinces[i].provinceName;
                var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                provinceSelect.append(option);
            }
            if (region.Model.provinceInit == false) {
                $("#provinceSelect").val($("#provinceValue").val());
                region.Model.provinceInit = true;
            }
            region.addCities();
        },
        addCitySelections: function(cities) {
            var citySelect = $('#citySelect');
            $('#citySelect option').remove();
            $('#districtSelect option').remove();

            for (var i in cities){
                var optionValue = cities[i].cityIndex;
                var optionText = cities[i].cityName;
                var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                citySelect.append(option);
            }
            if (region.Model.cityInit == false) {
                $("#citySelect").val($("#cityValue").val());
                region.Model.cityInit = true;
            }
            region.addDistricts();
        },

        addDistrictSelections: function(districts) {
            var districtSelect = $('#districtSelect');
            $('#districtSelect option').remove();

            for (var i in districts){
                var optionValue = districts[i].districtIndex
                var optionText = districts[i].districtName;
                var option = "<option value=" + optionValue + ">" + optionText + "</option>";
                districtSelect.append(option);
            }
            if (region.Model.districtInit == false){
                $("#districtSelect").val($("#districtValue").val());
                region.Model.districtInit = true;
            }
        }
    }

    sannong.Region = region;
    return region;

});