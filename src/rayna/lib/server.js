/**
 * @module Server
 * @author Rube
 * @date 15/8/13
 * @desc build a static server for client
 */

'use strict';

var http = require('http');
var colorConsole = require('color-console');

module.exports = {
    start: function (exec) {

        http.createServer(function (req, res) {

            exec(function (jsContent) {

                res.write(jsContent);
                res.end();
            })
        }).listen(6558);

        colorConsole.green('server have started, listening port 6558');
    }
};