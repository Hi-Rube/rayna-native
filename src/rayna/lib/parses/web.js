/**
 * @module parseWeb
 * @author Rube
 * @date 15/8/13
 * @desc translate the app to be used in web
 */

'use strict';

var fs = require('fs');

var colorConsole = require('color-console');

var deleteFolder = require('../utils/delete-folder');
var attributes = require('./attributes');
var webDecorate = require('../rayna-framework/web/decorate');
var webDone = require('../components/js-web/done-web');

//TODO: 看具体架构决定是否保留 walk
function walk($, tag) {

    $(tag).children().each(function (index) {

        var tagName = $(this).get(0).tagName.toLowerCase();

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
    var encode = $('activity').attr('encode');
    if (!encode) {
        encode = 'utf-8';
    }
    var activityNumber = $('activity').length;

    //PLATFORM now == 'web' is a global v
    if (activityNumber == 1 && (type === undefined || type.toLowerCase() === PLATFORM)) {
        var dom = $('activity').html();
        $('activity').replaceWith('html');
        $('body').html(dom);
        if (title) {
            $('head').html('' +
            '<meta http-equiv="Content-Type" content="text/html; charset=' + encode + '">' +
            '<meta name="apple-mobile-web-app-capable" content="yes">' +
            '<meta content="width=device-width,user-scalable=no" name="viewport">' +
            '<title>' + title + '</title>');
        }
        return true;
    }

    return false;
}

function parseScript($, scriptMap) {

    $('script').each(function (index) {

        var src = $(this).attr('src');            //来判断 js 所引用的样式
        var action = $(this).attr('action');
        var moduleName = $(this).attr('module');
        var script = $(this).html();

        if (src == undefined) {
            $(this).html();
        } else {
            scriptMap.set('script' + index, $(this)[0].outerHTML);
            $(this).html('');    //强制清空带 src 的 script 内部的内容
            return;
        }

        if (moduleName == undefined && script != undefined) {
            colorConsole.red('"' + script + '"' + '\nthis script can\'t find module name');
            throw new Error();
        } else {
            $(this).removeAttr('action');       //强制删除了处理过的属性
            $(this).removeAttr('module');
            scriptMap.set('script' + index, $(this)[0].outerHTML);
        }
    });
}

function exec(domObject) {

    var staticWeb = APP_PATH + '/../static-web';
    var contentMap = new Map();
    var scriptMap = new Map();

    for (var key of domObject.keys()) {

        var $ = domObject.get(key);

        parseScript($, scriptMap);
        if (!parseActivity($)) {

            colorConsole.red('the page must have activity but can\'t have multiple activity ');
            throw new Error();
        }
        walk($, 'body');

        var scriptContent = '<script src="./rayna-webFramework.js"></script>' +
            '<script src="./rayna-webComponents.js"></script>';
        for (var scriptKey of scriptMap.keys()) {

            scriptContent += scriptMap.get(scriptKey);
        }
        var content = '<html>\n' + $('html').html() + scriptContent + '\n<\/html>';

        contentMap.set(key, content);
    }

    deleteFolder.delete(staticWeb);
    fs.mkdirSync(staticWeb);

    for (var key of contentMap.keys()) {

        var content = contentMap.get(key);

        //多级目录输出, key 有可能是类似 '/index/rube' 输出应该是 APP_PATH/static/web/index/rube.html
        fs.writeFileSync(staticWeb + '/' + key + '.html', content, 'utf-8');
    }
    fs.writeFileSync(staticWeb + '/rayna-webFramework.js', webDecorate.frameworkDecorate(), 'utf-8');
    fs.writeFileSync(staticWeb + '/rayna-webComponents.js', webDone.done(), 'utf-8');
}

module.exports = {
    exec: exec
};