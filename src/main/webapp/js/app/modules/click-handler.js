/**
 * Created by apple on 11/28/14.
 */

define(['jquery', 'sannong'], function($, sannong) {

    "use strict";

    var ClickHandler = {};
    ClickHandler.defaultElementQuery = '.click-target';
    ClickHandler.elementQuery = ClickHandler.defaultElementQuery;
    ClickHandler.handlers = {};

    ClickHandler.dispatchHandler = function (event) {
        var target = event.srcElement ? event.srcElement : event.target,
            clickHandlerId = target.attributes['data-click-handler'],
            isStopEventPropagation = target.attributes['data-stop-propagate'] !== undefined && target.attributes['data-stop-propagate'].value === 'true',
            isPreventDefault = target.attributes['data-prevent-default'] !== undefined && target.attributes['data-prevent-default'].value === 'true';

        if(isPreventDefault) {
            event.preventDefault();
        }

        if (isStopEventPropagation) {
            event.stopPropagation();
        }

        if (clickHandlerId === undefined) {
            var parent = target.parentNode;
            while (parent !== undefined && parent != document) {
                clickHandlerId = parent.attributes['data-click-handler'];
                if (clickHandlerId !== undefined) {
                    target = parent;
                    break;
                }
                parent = parent.parentNode;
            }
        }

        if (clickHandlerId !== undefined) {
            var handlerList = clickHandlerId.nodeValue;

            // multiple event handlers, separated by commas,
            // are processed left to right
            var handlerIds = handlerList.split(',');
            for (var i = 0; i < handlerIds.length; i++) {
                var handlerName = handlerIds[i];
                var clickHandler = ClickHandler.handlers[handlerName];
                if (clickHandler === undefined) {
                    return;
                }
                clickHandler(target, event);
            }
        }
    };

    ClickHandler.registerHandler = function () {
        $(document).on('click', ClickHandler.elementQuery, function (event) {
            ClickHandler.dispatchHandler(event);
        });
    };

    ClickHandler.addHandler = function (name, handler) {
        ClickHandler.handlers[name] = handler;
    };

    ClickHandler.callbacks = {
        /*
        sideBarClickHandler: function (target, event) {
            if (target.attr('id') == "userProfileTab"){

            }
        }
        */
    };

    ClickHandler.init = function () {
        ClickHandler.registerHandler();
        //ClickHandler.addHandler('sideBarClickHandler', ClickHandler.callbacks.sideBarClickHandler);
    };

    $(function() {
        ClickHandler.init();
    });

    sannong.ClickHandler = ClickHandler;
    return ClickHandler;

});