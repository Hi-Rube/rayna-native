/**
 * @module rayna-framework
 * @author Rube
 * @date 15/8/29
 * @desc rayna-framework version web
 */

Rayna = {
    'name': 'Rayna 0.1',
    'cache': {
        'pageName': null,
        'classMap': {},
        'idMap': {},
        'nodeTree': [],
        'moduleMap': {}
    },
    'page': function (pageName) {
        Rayna.cache['pageName'] = pageName;                     //应用加载时自动设定
    },
    'log': function (message, type) {
        if (type && (type === 'alert' || type === 'a')) {
            alert(message);
        } else {
            console.log(message);
        }
    },
    'run': function (pageName, func) {
        if (!Rayna.cache['pageName'] || pageName == Rayna.cache['pageName']) {
            document.addEventListener('DOMContentLoaded', function(){

                Rayna._parse();
                func();
            }, false);
        } else {
            console.error(Rayna.name + ':pageName error');
        }
    },
    'runTo': function (url, func) {
        func();                                                //注意这个回调是提前执行,并没有回调执行
        window.location = url;
    },
    '$': function (selector) {

    },
    'define': function () {

        var arg = arguments;

        switch (arg.length) {
            case 0:
                console.error(Rayna.name + ':can\'t run the module \"define()\"');
                break;
            case 1:
                try {
                    arg[0]();
                } catch (e) {
                    console.error(Rayna.name + ':can\'t run the module \"define(' + arg[0] + ')\"');
                    console.log(e);
                }
                break;
            case 2:
                if (typeof arg[0] == 'string') {

                    var moduleName = arg[0];
                    if (typeof arg[1] == 'function') {

                        if (R.cache.moduleMap[moduleName]) {
                            return console.error(Rayna.name + ':' + moduleName + 'already exist in scope');
                        }
                        R.cache.moduleMap[moduleName] = new Rayna._Module(arg[1]);
                    } else {
                        R.cache.moduleMap[moduleName] = new Rayna._Module(function () {
                            return arg[1];
                        })
                    }
                } else {
                    console.error(Rayna.name + ':can\'t run the module \"define(' + arg[0] + ',' + arg[1] + ')\"');
                }
                break;
        }
    },
    'require': function (moduleName) {
        return R.cache.moduleMap[moduleName].func();
    }
};

Rayna._Module = function (func) {
    this.func = func;
};

Rayna._Node = function (tagName, id, className) {
    this.tagName = tagName;
    this.id = id;
    this.className = className;
    this.component = tagName != 'script' ? R.require('component-' + tagName) : null;
    this.children = [];
};

Rayna._Node.prototype.addChildren = function (child) {
    this.children.push(child);
};

Rayna._parse = function () {

    var body = document.getElementsByTagName('body');

    function walk(dom) {

        for (var i = 0; i < dom.children.length; i++) {

            var child = dom.children[i];
            var tagName = child.tagName.toLowerCase();
            var id = child.id;
            var className = child.className;
            var nowNode = new Rayna._Node(tagName, id, className);
            Rayna.cache.nodeTree.push(nowNode);
        }
    }

    walk(body[0]);
};

R = Rayna;