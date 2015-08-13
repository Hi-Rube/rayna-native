/**
 * @module Server
 * @author Rube
 * @date 15/8/13
 * @desc build a static server for client
 */

'use strict';

var http = require('http');

module.exports = {
    start: function (exec) {

        http.createServer(function (req, res) {

            exec(function (jsContent) {

                res.write(jsContent);
                res.end();
            })
        }).listen(6558);
    }
};