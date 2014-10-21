/**
 * Created by Bright Huang on 10/9/14.
 */
requirejs.config({
    baseUrl : 'content/static/js',
    paths: {
        "jquery" : "lib/jquery-2.1.1.min",
        "bootstrap" : "lib/bootstrap-3.0.3.min",
        "bootstrap-datepicker" : "lib/bootstrap-datepicker-1.3.0",
        "sannong" : "sannong/sannong",
        "home" : "sannong/home/home",
        "login" : "sannong/login/login"
    },
    shim: {
        'bootstrap' : {
            deps : ['jquery'],
            exports : "bootstrap"
        },
        'bootstrap-datepicker' : {
            deps : ['jquery'],
            exports : "bootstrap-datepicker"
        }
    }
});


requirejs(["jquery", "bootstrap",  "home", "login"], function($, Bootstrap,  Home, Login){

});







