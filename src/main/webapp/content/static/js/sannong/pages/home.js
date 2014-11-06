/**
 * Created by Bright Huang on 11/6/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'sannong', 'formValidator'],
        function($, bootstrap, sannong, formValidator) {

            "use strict";

            var home = {};

            $(function () {
                formValidator.getValidator("#loginForm");
            });

            sannong.Home = home;
            return home;
        });
});

