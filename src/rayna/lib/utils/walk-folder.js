/**
 * @module walkFolder
 * @author Rube
 * @date 15/8/13
 * @desc folder.foreach 0.0~
 */

'use strict';

var fs = require('fs');

function walk(path, fileHandler, appRelative) {

    var pathArr = [];

    var files = fs.readdirSync(path);

    files.forEach(function (file) {

        var tmpPath = path + '/' + file;
        var tmpAppRelative = appRelative ? appRelative + '/' + file : file;
        var stats = fs.statSync(tmpPath);

        if (stats.isDirectory()) {
            var tmpPathArr = walk(tmpPath, fileHandler, tmpAppRelative);
            pathArr = pathArr.concat(tmpPathArr);
        } else {
            var pathObject = {
                relative: tmpPath,
                appRelative: tmpAppRelative
            };
            pathArr.push(pathObject);
        }
    });

    return pathArr;
}

module.exports = {
    walk: function (path, fileHandler) {
        var pathArr = walk(path);
        fileHandler(pathArr);
    }
};
