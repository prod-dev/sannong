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

    sannong.Region = region;
    return region;

});