/**
 * Created by apple on 11/28/14.
 */

define(['jquery', 'sannong'], function($, sannong) {

    "use strict";

    var eventHandler = {};
    eventHandler.defaultEventSource = '.meta-event-source';
    eventHandler.eventSource = eventHandler.defaultEventSource;
    eventHandler.callbacks = {};

    eventHandler.publish = function (event) {
        var target = event.srcElement ? event.srcElement : event.target,
            clickHandlerId = target.attributes['meta-event-handler'],
            isStopEventPropagation = target.attributes['meta-stop-propagate'] !== undefined && target.attributes['meta-stop-propagate'].value === 'true',
            isPreventDefault = target.attributes['meta-prevent-default'] !== undefined && target.attributes['meta-prevent-default'].value === 'true';

        if(isPreventDefault) {
            event.preventDefault();
        }

        if (isStopEventPropagation) {
            event.stopPropagation();
        }

        if (clickHandlerId === undefined) {
            var parent = target.parentNode;
            while (parent !== undefined && parent != document) {
                clickHandlerId = parent.attributes['meta-event-handler'];
                if (clickHandlerId !== undefined) {
                    target = parent;
                    break;
                }
                parent = parent.parentNode;
            }
        }

        if (clickHandlerId !== undefined) {
            //var handlerList = clickHandlerId.nodeValue;
            var handlerList = clickHandlerId.value;

            // multiple event handlers, separated by commas,
            // are processed left to right
            var handlerIds = handlerList.split(',');
            for (var i = 0; i < handlerIds.length; i++) {
                var handlerName = handlerIds[i];
                var callback = eventHandler.callbacks[handlerName];
                if (callback === undefined) {
                    return;
                }
                callback(target, event);
            }
        }
    };

    eventHandler.registerEventListener = function () {
        $(document).on('click', eventHandler.eventSource, function (event) {
            eventHandler.publish(event);
        });
    };

    eventHandler.subscribe = function (name, callback) {
        eventHandler.callbacks[name] = callback;
    };

    $(function() {
        //eventHandler.registerEventListener();
    });

    sannong.EventHandler = eventHandler;
    return eventHandler;

});