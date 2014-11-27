/**
 * Created by Bright Huang on 11/27/14.
 */

define(['jquery', 'sannong'], function($, sannong) {

    "use strict";

    var sidebar = {};

    function removeActiveClass(){
        $("ul li.active").removeClass("active");
    }

    function addEventListener(){
        $("#sidebar-user-management").click(function () {
            removeActiveClass();
            $(this).parent().addClass("active")
        });

        $("#sidebar-user-application-form").click(function () {
            removeActiveClass();
            $(this).parent().addClass("active")
        });

        $("#sidebar-user-profile").click(function () {
            removeActiveClass();
            $(this).parent().addClass("active")
        });

        $("#sidebar-user-password").click(function () {
            removeActiveClass();
            $(this).parent().addClass("active")
        });
    }

    $(function() {
        addEventListener();
    });

    sannong.SideBar = sidebar;
    return sidebar;

});
