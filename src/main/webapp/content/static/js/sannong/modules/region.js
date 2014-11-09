/**
 * Created by Bright Huang on 11/5/14.
 */

define(['jquery', 'sannong', 'ajaxHandler'], function($, sannong, ajaxHandler) {

    "use strict";

    var region = {};
    region.Model = {province: "", city: "", district: ""};

    region.Controller = {
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
            if (region.Model.province != ""){
                $("#provinceSelect").val(region.Model.province);
                region.Model.province = "";
            }
            region.Controller.addCities();
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
            if (region.Model.city != ""){
                $("#citySelect").val(region.Model.city);
                region.Model.city = "";
            }
            region.Controller.addDistricts();
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
            if (region.Model.district != ""){
                $("#districtSelect").val(region.Model.district);
                region.Model.district = "";
            }
        },
        saveRegion: function(){
            region.Model.province = $("#provinceValue").val();
            region.Model.city = $("#cityValue").val();
            region.Model.district = $("#districtValue").val();
        },
        restoreRegion: function (){
            $("#provinceSelect").val(region.Model.district);
            $("#citySelect").val(region.Model.district);
            $("#districtSelect").val(region.Model.district);
        }

}

    sannong.Region = region;
    return region;

});