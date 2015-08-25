/**
 * @module parse
 * @author Rube
 * @date 15/8/12
 * @desc parse app file for a domObject
 */

'use strict';

var fs = require('fs');
var path = require('path');
var walkFolder = require('./utils/walk-folder');

var env = require('jsdom').env;
var limitFiles = ['.html'];

module.exports = {
    parse: function (appPath, callback) {

        var domObject = new Map();

        walkFolder.walk(appPath, function (pathObjects) {

            pathObjects.forEach(function (pathObject, index) {

                var filePath = pathObject.relative;
                var appPath = pathObject.appRelative;
                var extName = path.extname(filePath);

                if (limitFiles.indexOf(extName) == -1){      //只解析 limitFiles 中标识的文件
                    return;
                }

                var data = fs.readFileSync(filePath, 'utf-8');
                env(data, function (errors, window) {

                    var $ = require('jquery')(window);
                    var activityKey = appPath.split('.')[0];

                    domObject.set(activityKey, $);
                    if (index === pathObjects.length - 1) {
                        callback(domObject);
                    }
                });
            });
        });

    }
};
