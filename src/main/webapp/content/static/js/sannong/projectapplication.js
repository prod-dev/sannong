/**
 * Created by Bright Huang on 10/26/14.
 */

(function($) {
    "use strict";

    var ProjectApplication = {};

    ProjectApplication.Model = {};

    ProjectApplication.View = {};


    function addEventListener(){
        $("#provinceSelect").change(function(event){
            var provinceIndex = event;
//            $('#citySelect option').remove();
//            $('#districtSelect option').remove();
            addCities();


        })

        $("#citySelect").change(function(event){
            var cityIndex = event;
            $('#districtSelect option').remove();
            addDistricts();
        })
    }

    function addProvinceSelections(provinces) {
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
        addCities();

    }

    function addCitySelections(cities) {
        var citySelect = $('#citySelect');
        $('#citySelect option').remove();
        $('#districtSelect option').remove();

        for (var i in cities){
            var optionValue = cities[i].cityIndex;
            var optionText = cities[i].cityName;
            var option = "<option value=" + optionValue + ">" + optionText + "</option>";
            citySelect.append(option);
        }
        addDistricts();

    }

    function addDistrictSelections(districts) {
        var districtSelect = $('#districtSelect');
        $('#districtSelect option').remove();

        for (var i in districts){
            var optionValue = districts[i].districtIndex
            var optionText = districts[i].districtName;
            var option = "<option value=" + optionValue + ">" + optionText + "</option>";
            districtSelect.append(option);
        }

    }

    function addProvinces(){
        var options = {
            url: 'getProvinces',
            type: 'POST',
            success: function(data){
                addProvinceSelections(data);
            },
            fail: function(error){

            }
        }
        ProjectApplication.Controller.ajaxRequest(options);

    }

    function addCities(){
        var provinceIndex;

        provinceIndex = $("#provinceSelect").val(); //获取选中记录的value值
        //$("#provinceSelect option:selected").text(); //获取选中记录的text值

        var options = {
            url: 'getCities',
            type: 'POST',
            data: {'provinceIndex': provinceIndex},
            success: function(data){
                addCitySelections(data);
            },
            fail: function(data){
            }
        }

        ProjectApplication.Controller.ajaxRequest(options);
    }

    function addDistricts(){
        var cityIndex= $('#citySelect').val();

        var options = {
            url: 'getDistricts',
            type: 'POST',
            data: {'cityIndex': cityIndex},
            success: function(data){
                addDistrictSelections(data);
            },
            fail: function(data){

            }
        }
        ProjectApplication.Controller.ajaxRequest(options);
    }

    ProjectApplication.Controller = {
        ajaxRequest : function(options) {
            return $.ajax({
                cache: false,
                data: options.data,
                dataType: options.dataType,
                type: options.type,
                url: options.url
            }).success(function (data, status, xhr) {
                options.success(data);
            }).fail(function (xhr, status, error) {
                options.fail(error);
            }).always(function (xhr, status, error) {

            });


        }

    };


    $(function() {
        addProvinces();


        addEventListener();
    });

    //Sannong.ProjectApplication = ProjectApplication;
    return ProjectApplication;
})(jQuery);
