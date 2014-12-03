/**
 * Created by apple on 11/27/14.
 */
require(['../main'], function () {
    require(['jquery', 'bootstrap', 'handlebars', 'sannong', 'validate', 'ajaxHandler',
            'formValidator', 'additionalMethods', 'pagination', 'region', 'jqueryForm',
            'questionnaire', 'login', 'clickHandler', 'userManagement', 'userApplicationForm',
            'userProfile', 'userPassword', 'forgotPassword'],
        function($, bootstrap, handlebars, sannong, validate, ajaxHandler,
                 formValidator, additionalMethods, pagination, region, jqueryForm,
                 questionnaire, login, clickHandler, userManagement, userApplicationForm,
                 userProfile, userPassword, forgotPassword) {

            "use strict";

            var userPersonalCenter = {};
            userPersonalCenter.Model = {};
            userPersonalCenter.View = {
            };

            userPersonalCenter.init = function(){

                $("#userManagementTab").click(function(){
                    var currentEditUser = userManagement.Model.currentEditUser;
                    if ( currentEditUser != ""){
                        userProfile.Controller.emptyUserProfileView();
                        userManagement.editUserProfile(currentEditUser);
                    }
                });
                $("#userAppFormTab").click(function(){

                });
                $("#userProfileTab").click(function(){
                    userManagement.Controller.emptyUserProfileEditView();
                    userProfile.show();
                });
                $("#userPasswordTab").click(function(){

                });
            }

            $(function() {
                userPersonalCenter.init();
            })

            sannong.UserPersonalCenter = userPersonalCenter;
            return userPersonalCenter;
        });
});
