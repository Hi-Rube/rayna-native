/**
 * @author Rube
 * @date 15/8/12
 * @desc init
 */

'use strict';

var parse = require('./lib/parse');
var server = require('./lib/server');


var exec = function (callback) {

    var time = new Date().getTime();

    parse.parse(process.argv[2], function (domObject) {

        var androidParse = require('./lib/parses/android');
        var jsContent = androidParse.exec(domObject);

        console.log('\x1B[32mexec time:' + (new Date().getTime() - time) + "ms\x1B[39m");
        callback(jsContent);
    });
};

server.start(exec);
