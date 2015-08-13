/**
 * @module parseAndroid
 * @author Rube
 * @date 15/8/13
 * @desc translate the app to be used in android
 */

'use strict';

var attributes = require('./attributes');

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
        walk($, this, jsobject, tagObject);
    });
}

function exec(domObject) {

    var jsContent = "";

    for (var key of domObject.keys()) {

        var $ = domObject.get(key);
        var jsObject = {activity: {}};

        walk($, "activity", jsObject, jsObject.activity);

        var jsObjectStr = JSON.stringify(jsObject);
        jsContent += "Rayna.dom(\""+ key +"\", "  + jsObjectStr + ");" + $("script").text();
    }

    return jsContent;
}

module.exports = {
    exec: exec
};