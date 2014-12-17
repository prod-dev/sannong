/**
 * Created by apple on 11/24/14.
 */
/**
 * Created by Bright Huang on 11/6/14.
 */

require(['../main'], function () {
    require(['jquery', 'bootstrap', 'sannong', 'login', 'formValidator', 'additionalMethods', 'custom'],
        function($, bootstrap, sannong, login, formValidator, additionalMethods, custom) {

            "use strict";

            var projectLanding = {};

            sannong.ProjectLanding = projectLanding;
            return projectLanding;
        });
});
