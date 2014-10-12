/**
 * Created by Bright Huang on 8/27/14.
 */

define('home', ['jquery', 'travel', "bootstrap", "bootstrap-datepicker"], function ($, Travel, Bootstrap, BootstrapDatePicker) {

    "use strict";

    var Home = {};

    Home.Model = {cities:{"CityType":"flightsrc","TabList":[
            {"TabId":"1","Name":"\u70ED\u95E8","NameEn":"Hot","CityList":[
                {"ProvinceId":"1","CityId":"529","CityCode":"BJS","CityNameCn":"\u5317\u4EAC","CityNameEn":"Beijing","CityThreeSign":"BJS","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"2","CityCode":"SHA","CityNameCn":"\u4E0A\u6D77","CityNameEn":"Shanghai","CityThreeSign":"SHA","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"566","CityCode":"SZX","CityNameCn":"\u6DF1\u5733","CityNameEn":"Shenzhen","CityThreeSign":"SZX","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"418","CityCode":"HGH","CityNameCn":"\u676D\u5DDE","CityNameEn":"Hangzhou","CityThreeSign":"HGH","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"358","CityCode":"CAN","CityNameCn":"\u5E7F\u5DDE","CityNameEn":"Guangzhou","CityThreeSign":"CAN","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"376","CityCode":"CTU","CityNameCn":"\u6210\u90FD","CityNameEn":"Chengdu","CityThreeSign":"CTU","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"517","CityCode":"NKG","CityNameCn":"\u5357\u4EAC","CityNameEn":"Nanjing","CityThreeSign":"NKG","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"595","CityCode":"WUH","CityNameCn":"\u6B66\u6C49","CityNameEn":"Wuhan","CityThreeSign":"WUH","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"416","CityCode":"HET","CityNameCn":"\u547C\u548C\u6D69\u7279","CityNameEn":"Hohhot","CityThreeSign":"HET","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"370","CityCode":"CKG","CityNameCn":"\u91CD\u5E86","CityNameEn":"Chongqing","CityThreeSign":"CKG","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"375","CityCode":"CSX","CityNameCn":"\u957F\u6C99","CityNameEn":"Changsha","CityThreeSign":"CSX","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"460","CityCode":"KMG","CityNameCn":"\u6606\u660E","CityNameEn":"Kunming","CityThreeSign":"KMG","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"603","CityCode":"SIA","CityNameCn":"\u897F\u5B89","CityNameEn":"Xian","CityThreeSign":"SIA","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"568","CityCode":"TAO","CityNameCn":"\u9752\u5C9B","CityNameEn":"Qingdao","CityThreeSign":"TAO","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"580","CityCode":"TSN","CityNameCn":"\u5929\u6D25","CityNameEn":"Tianjin","CityThreeSign":"TSN","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"514","CityCode":"NGB","CityNameCn":"\u5B81\u6CE2","CityNameEn":"Ningbo","CityThreeSign":"NGB","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"604","CityCode":"XMN","CityNameCn":"\u53A6\u95E8","CityNameEn":"Xiamen","CityThreeSign":"XMN","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"583","CityCode":"TYN","CityNameCn":"\u592A\u539F","CityNameEn":"Taiyuan","CityThreeSign":"TYN","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"387","CityCode":"DLC","CityNameCn":"\u5927\u8FDE","CityNameEn":"Dalian","CityThreeSign":"DLC","CityType":"flightsrc","OldEnglishName":null},
                {"ProvinceId":"1","CityId":"575","CityCode":"TNA","CityNameCn":"\u6D4E\u5357","CityNameEn":"Jinan","CityThreeSign":"TNA","CityType":"flightsrc","OldEnglishName":null}]
            },
            {"TabId":"2","Name":"ABCD","NameEn":"ABCD","CityList":[]},
            {"TabId":"3","Name":"EFGHJ","NameEn":"EFGHJ","CityList":[]},
            {"TabId":"4","Name":"KLMN","NameEn":"KLMN","CityList":[]},
            {"TabId":"5","Name":"PQRSTW","NameEn":"PQRSTW","CityList":[]},
            {"TabId":"6","Name":"XYZ","NameEn":"XYZ","CityList":[]}]
        }};

    Home.View = {};

    Home.Controller = {
        selectTreeNode : function(target, event){
            var organizationId = target.attributes.getNamedItem("index").value;

            AjaxHandler.request({
                type: 'GET',
                url: "/organization/" + organizationId,
                data: {},
                dataType: 'json',
                success: function (rps) {


                },
                fail: function (xhr, status, error) {
                    view.loader.hide();
                    view.error.show();
                    alert('AJAX request error in Ajax(' + error + ')');
                },
                always: function () {

                }
            });

        }
    };


     Home.getBusFromCity = function(){

    }

    function init() {

    }


    $(function () {
        init();
        $('#dateObj').datepicker({
            autoclose: true
        });

    });


    Travel.Home = Home;
    return Home;
});



