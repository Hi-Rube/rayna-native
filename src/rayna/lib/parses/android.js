/**
 * @module parseAndroid
 * @author Rube
 * @date 15/8/13
 * @desc translate the app to be used in android
 */

'use strict';

var attributes = require('./attributes');
var androidDecorate = require('../rayna-framework/android/decorate');

function walk($, tag, jsobject, object) {

    object['children'] = {};

    $(tag).children().each(function (index) {

        var tagName = $(this).get(0).tagName.toLowerCase();
        var attributeCheck = attributes[tagName];

        var tagObject = object['children'][tagName + "." + index] = {};                  //warning:标签名不能有 . (点)

        for (var key in attributeCheck) {

            var attribute = attributeCheck[key];
            var value = $(this).attr(attribute);

            if (value) {
                tagObject[attribute] = value;
            }
        }

        try {
            var component = require('../components/' + tagName + '-android');
            component.parse($(this), tagObject);
        } catch (e) {
            console.log(e);
        }

        walk($, this, jsobject, tagObject);
    });
}

//parse activity by another way
function parseActivity($) {

    var attributeCheck = attributes['activity'];
    var obj = {};

    for (var key in attributeCheck) {
        var attribute = attributeCheck[key];
        obj[attribute] = $('activity').attr(attribute);
    }

    return {activity: obj};
}

function exec(domObject) {

    var jsContent = "";

    for (var key of domObject.keys()) {

        var $ = domObject.get(key);
        var jsObject = parseActivity($);

        walk($, "activity", jsObject, jsObject.activity);

        var jsObjectStr = JSON.stringify(jsObject);
        jsContent += "Rayna.dom(\"" + key + "\", " + jsObjectStr + ");" + $("script").text();
    }
    jsContent = androidDecorate.frameworkDecorate(jsContent);

    return jsContent;
}

module.exports = {
    exec: exec
};