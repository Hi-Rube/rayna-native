/**
 * @module decorate
 * @author Rube
 * @date 15/8/19
 * @desc framework decorate , add the rayna_android framework to script
 */

var fs = require('fs');

module.exports = {
    frameworkDecorate: function (script) {

        var path = __dirname + '/rayna-androidFramework.js';
        var raynaScript = fs.readFileSync(path, "utf-8");

        return raynaScript + script;
    }
};
