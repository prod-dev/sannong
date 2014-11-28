/**
 * Created by apple on 11/27/14.
 */
require(['../main'], function () {
    require(['jquery', 'bootstrap', 'handlebars', 'sannong', 'validate', 'ajaxHandler',
            'formValidator', 'additionalMethods', 'pagination', 'region', 'jqueryForm',
            'questionnaire', 'login', 'clickHandler', 'userManagement', 'userApplicationForm',
            'userProfile', 'userPassword'],
        function($, bootstrap, handlebars, sannong, validate, ajaxHandler,
                 formValidator, additionalMethods, pagination, region, jqueryForm,
                 questionnaire, login, clickHandler, userManagement, userApplicationForm,
                 userProfile, userPassword) {

            "use strict";

            var userPersonalCenter = {};
            userPersonalCenter.Model = {};
            userPersonalCenter.View = {
                userProfileView: $("#userProfileView")
            };

            userPersonalCenter.Controller = {
                renderUserProfileView: function(data){
                    var userProfileViewHandler = handlebars.compile($("#user-profile-template").html());
                    var html = userProfileViewHandler(data);
                    userPersonalCenter.View.userProfileView.empty();
                    userPersonalCenter.View.userProfileView.append(html);
                }

            };

            userPersonalCenter.edit = function(userName){
                $("#userProfileTab").click();
                //$(".sidebar").hide();

                ajaxHandler.sendRequest({
                    type: "GET",
                    url: "user-personal-center/user-profile",
                    data:{userName: userName},
                    success: function(response){
                        if (response){
                            userPersonalCenter.Controller.renderUserProfileView(response);
                        }
                    },
                    fail: function(){
                    }
                });
            }

            userPersonalCenter.changeContent = function(dropdownName){
                var searchKey = $("#searchKey").text();
                var dropDownNameText = $("#" + dropdownName).text();

                $("#" + dropdownName).text(searchKey);
                $("#searchKey").html(dropDownNameText + '<span class="caret">');
            }

            userPersonalCenter.cancel = function () {
                $("#userTextShow").hide();
                $("#questionnaireTable").hide();
                $("#applicantsTable").show();
                $("#searchBar").show();
            }

            userPersonalCenter.update = function () {
                if (formValidator.getValidator("#answerForm").form() == true){
                    $("#myModalTrigger").click();

                }
            }


            $(function() {

            })

            sannong.UserPersonalCenter = userPersonalCenter;
            return userPersonalCenter;
        });
});
