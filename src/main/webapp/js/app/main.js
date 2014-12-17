/**
 * Created by Bright Huang on 10/9/14.
 */
requirejs.config({
    baseUrl : 'js',
    paths: {
        "jquery" : "lib/jquery-1.11.1.min",
        "bootstrap" : "lib/bootstrap-3.0.3.min",
        "handlebars": "lib/handlebars-v2.0.0",
        "pagination": "lib/jquery-pagination",
        "validate" : "lib/jquery-validate-1.13.1",
        "methods": "lib/additional-methods-1.13.1",
        "message_zh": "lib/message_zh.1.13.1",
        "jqueryForm": "lib/jquery-form",
        "sannong" : "app/app",
        "ajaxHandler" : "app/modules/ajax-handler",
        "questionnaire": "app/modules/questionnaire",
        "formValidator": "app/modules/form-validator",
        "selector": "app/modules/selector",
        "additionalMethods": "app/modules/additional-methods",
        "login": "app/modules/login",
        "eventHandler": "app/modules/event-handler",
        "userManagement": "app/modules/user-management",
        "userApplicationForm": "app/modules/user-application-form",
        "userPassword": "app/modules/user-password",
        "userProfile": "app/modules/user-profile",
        "custom": "app/modules/custom",
        "slider": "app/modules/slider",
        "html5shiv": "lib/html5shiv.min",
        "jcarouselResponsive": "lib/jcarousel.responsive",
        "jqueryJcarousel": "lib/jquery.jcarousel.min",
        "npm": "lib/npm",
        "owlCarousel": "lib/owl.carousel",
        "respond": "lib/respond.min"
    },
    shim: {
        'bootstrap' : {
            deps : ['jquery'],
            exports : "bootstrap"
        },
        'handlebars' : {
            deps : ['jquery'],
            exports : "handlebars"
        },
        "pagination": {
            deps :['jquery'],
            exports : "pagination"
        },
        "additionalMethods": {
            deps :['jquery'],
            exports : "additionalMethods"
        },
        "validate": {
            deps : ['jquery'],
            exports : "validate"
        },
        "methods": {
            deps : ['jquery'],
            exports : "methods"
        },
        "ajaxHandler": {
            deps : ['jquery'],
            exports : "ajaxHandler"
        },
        "questionnaire": {
            deps : ['handlebars'],
            exports : "questionnaire"
        },
        "applicants": {
            deps : ['jquery'],
            exports : "questionnaire"
        },
        "jqueryForm": {
        	deps :['jquery'],
            exports : "jqueryForm"
        },
        "formValidator": {
            deps :['jquery', 'validate'],
            exports : "formValidator"
        },
        "selector": {
            deps :['jquery'],
            exports : "selector"
        },
        "login": {
            deps :['jquery'],
            exports : "login"
        },
        "eventHandler": {
            deps :['jquery'],
            exports : "eventHandler"
        },
        "userManagement": {
            deps :['jquery'],
            exports : "userManagement"
        },
        "userApplicationForm": {
            deps :['jquery'],
            exports : "userApplicationForm"
        },
        "userPassword": {
            deps :['jquery'],
            exports : "userPassword"
        },
        "userProfile": {
            deps :['jquery'],
            exports : "userProfile"
        },
        "custom": {
            deps :['jquery'],
            exports : "custom"
        },
        "slider": {
            deps :['jquery'],
            exports : "slider"
        },
        "html5shiv": {
            deps :['jquery'],
            exports : "html5shiv"
        },
        "jcarouselResponsive": {
            deps :['jquery'],
            exports : "jcarouselResponsive"
        },
        "jqueryJcarousel": {
            deps :['jquery'],
            exports : "jqueryJcarousel"
        },
        "npm": {
            deps :['jquery'],
            exports : "npm"
        },
        "owlCarousel": {
            deps :['jquery'],
            exports : "owlCarousel"
        },
        "respond": {
            deps :['jquery'],
            exports : "respond"
        }
    }
});








