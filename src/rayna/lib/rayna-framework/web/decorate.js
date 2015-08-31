/**
 * @module decorate
 * @author Rube
 * @date 15/8/19
 * @desc framework decorate , add the rayna_web framework to script
 */

var fs = require('fs');

module.exports = {
    frameworkDecorate: function (script) {

        var path = __dirname + '/rayna-webFramework.js';
        var raynaScript = fs.readFileSync(path, "utf-8");

        if (script) {
            return '<script type=\"text/javascript\">' + raynaScript + '</script>' + script;                //TODO:分离
        } else {
            return raynaScript;
        }
    }
};
