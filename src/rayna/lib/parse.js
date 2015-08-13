/**
 * @module parse
 * @author Rube
 * @date 15/8/12
 * @desc parse app file for a domObject
 */

'use strict';

var fs = require('fs');

var env = require('jsdom').env;

var walkFolder = require('./utils/walk-folder');

module.exports = {
    parse: function (path, callback) {

        var domObject = new Map();

        walkFolder.walk(path, function (pathObjects) {

            pathObjects.forEach(function (pathObject, index) {

                var filePath = pathObject.relative;
                var appPath = pathObject.appRelative;

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
