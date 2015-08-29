/**
 * @author Rube
 * @date 15/8/12
 * @desc init
 */

'use strict';

var colorConsole = require('color-console');
var parse = require('./lib/parse');

var commands = {
    '-web': 'web',
    '-android': 'android',
    '-ios': 'ios'
};
var option = {
    'path':''
};

var dirPath = process.argv[2];
var command = process.argv[3];

if (!commands[command]) {
    return colorConsole.red('can\'t found this command \'' + command +'\'');
}

var server = require('./lib/server');
if (command == '-web'){
    server = require('./lib/staticServer');
    option.path = dirPath;
}

global.PLATFORM = commands[command];
global.APP_PATH = dirPath;

var exec = function (callback) {

    var time = new Date().getTime();

    parse.parse(dirPath, function (domObject) {      //domObject -> 单个页面的 dom 总对象

        var domParse = require('./lib/parses/' + commands[command]);
        var jsContent = domParse.exec(domObject);       //native 返回 jsContent / web 没有返回

        colorConsole.green('exec time:' + (new Date().getTime() - time) + 'ms');
        if (callback) {
            callback(jsContent);
        }
    });
};

server.start(exec, option);
