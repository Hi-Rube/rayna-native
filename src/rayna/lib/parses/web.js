/**
 * @module parseAndroid
 * @author Rube
 * @date 15/8/13
 * @desc translate the app to be used in android
 */

'use strict';

var fs = require('fs');

var deleteFolder = require('../utils/delete-folder');
var attributes = require('./attributes');
var webDecorate = require('../rayna-framework/web/decorate');

function walk($, tag) {

    $(tag).children().each(function (index) {

        var tagName = $(this).get(0).tagName.toLowerCase();
        var attributeCheck = attributes[tagName];

        try {
            var component = require('../components/' + tagName + '-' + PLATFORM);
            component.parse($(this));
        } catch (e) {
            console.log(e);
        }

        walk($, this);
    });
}

//parse activity by another way
function parseActivity($) {

    var type = $('activity').attr('type');
    var title = $('activity').attr('title');

    //PLATFORM now == 'web' is a global v
    if (type === undefined || type.toLowerCase() === PLATFORM) {
        var dom = $('activity').html();
        $('activity').replaceWith('html');
        $('body').html(dom);
        if (title) {
            $('head').html('<title>' + title + '</title>');
        }
    }
}

function exec(domObject) {

    var staticWeb = APP_PATH + '/../static-web';
    var contentMap = new Map();

    for (var key of domObject.keys()) {

        var $ = domObject.get(key);

        parseActivity($);
        walk($, 'body');
        $('html').add('script');

        var content = '<html>' + $('html').html() + '<\/html>';
        console.log(content);
        console.log('---------------');

        contentMap.set(key, content);

    }

    deleteFolder.delete(staticWeb);
    fs.mkdirSync(staticWeb);

    for (var key of contentMap.keys()) {

        var content = contentMap.get(key);

        //多级目录输出, key 有可能是类似 '/index/rube' 输出应该是 APP_PATH/static/web/index/rube.html
        fs.writeFileSync(staticWeb + '/' + key + '.html', content, 'utf-8');
    }
}

module.exports = {
    exec: exec
};