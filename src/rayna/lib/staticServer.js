/**
 * @module staticServer
 * @author Rube
 * @date 15/8/29
 * @desc 开启一个静态服务器提供 web 端输出的预览
 */

var fs = require('fs');
var colorConsole = require('color-console');
var serve = require('koa-static');
var koa = require('koa');

var app = koa();

module.exports = {
  start: function(exec, option){
    var dirPath = option.path + '/../static-web';
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    app.use(function *(next) {
      exec();                     //执行解析,使解析结果输出到应用的 static-web 目录下
      yield next;
    });
    app.use(serve(dirPath));
    app.listen(6556);
    colorConsole.green('static server have started, listening port 6556');
  }
};


