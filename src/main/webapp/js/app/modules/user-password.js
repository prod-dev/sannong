/**
 * Created by Bright Huang on 10/22/14.
 */
define(['jquery', 'bootstrap', 'sannong', 'validate', 'formValidator'],
function($, bootstrap, sannong, validate, formValidator) {

    "use strict";

    var myPassword = {};

    $(function() {
        formValidator.getValidator("#myPasswordForm");

    });

    sannong.MyPassword = myPassword;
    return myPassword;

});




