/**
 * Created by Bright Huang on 10/21/14.
 */

require(['../main'], function () {
    require(['jquery', 'sannong', 'validate', 'ajaxHandler', 'formValidator', 'additionalMethods'],
        function($, sannong, validate, ajaxHandler, formValidator, additionalMethods) {

        "use strict";

        var login = {};

        $(function () {
            formValidator.getValidator("#loginForm");
        });


        sannong.Login = login;
        return login;
    });
});


