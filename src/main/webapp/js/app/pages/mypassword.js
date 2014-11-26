/**
 * Created by Bright Huang on 10/22/14.
 */
require(['../main'], function () {
    require(['jquery', 'bootstrap', 'sannong', 'validate', 'formValidator','custom','select'],
        function($, bootstrap, sannong, validate, formValidator,custom,select) {

            "use strict";

            var myPassword = {};

            $(function() {
                formValidator.getValidator("#myPasswordForm");

            });

            sannong.MyPassword = myPassword;
            return myPassword;
        });
});




