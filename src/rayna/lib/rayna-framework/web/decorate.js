/**
 * @module decorate
 * @author Rube
 * @date 15/8/19
 * @desc framework decorate , add the rayna_web framework to script
 */

var fs = require('fs');

module.exports = {
    frameworkDecorate: function (script) {
        var raynaScript = fs.readdirSync("./rayna-framework.js", "utf-8");
        return script + raynaScript;
    }
};
