/**
 * @module decorate
 * @author Rube
 * @date 15/8/19
 * @desc framework decorate , add the rayna_android framework to script
 */

var fs = require('fs');

module.exports = {
    frameworkDecorate: function (script) {

        var path = '~/.rayna_native/rayna-framework.js';    //TODO: default install in ~/.rayna_native by rayna_native_cli

        if (fs.existsSync('./lib/rayna-framework/android/rayna-framework.js')){
            path = './lib/rayna-framework/android/rayna-framework.js';
        } else if (fs.existsSync('./node_modules/rayna/lib/rayna-framework/android/rayna-framework.js')){
            path = './node_modules/rayna/lib/rayna-framework/android/rayna-framework.js';
        }

        var raynaScript = fs.readFileSync(path, "utf-8");

        return raynaScript + script;
    }
};
