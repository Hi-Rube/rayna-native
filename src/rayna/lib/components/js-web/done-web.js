/**
 * @module doneWeb
 * @author Rube
 * @date 15/8/31
 * @desc 测试时打包这个组件的资源，仅测试时用
 */
var fs = require('fs');
var walkFolder = require('../../utils/walk-folder');

module.exports = {
    done: function (nextContent) {

        var jsContent = '';

        walkFolder.walk(__dirname, function (pathObjects) {

            pathObjects.forEach(function (pathObject) {

                var filePath = pathObject.appRelative;
                if (filePath != 'done-web.js') {
                    jsContent += fs.readFileSync(pathObject.relative);
                }
            });
        });

        if (nextContent) {
            jsContent = jsContent + nextContent;
        }

        return jsContent;
    }
};