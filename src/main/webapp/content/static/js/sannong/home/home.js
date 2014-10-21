/**
 * Created by Bright Huang on 8/27/14.
 */

define('home', ['jquery', 'sannong', "bootstrap"], function ($, Sannong, Bootstrap) {

    "use strict";

    var Home = {};

    Home.Model = {};

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

    });


    Sannong.Home = Home;
    return Home;
});



