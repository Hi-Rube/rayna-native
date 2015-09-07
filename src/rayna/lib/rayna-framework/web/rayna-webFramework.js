/**
 * @module rayna-framework
 * @author Rube
 * @date 15/8/29
 * @desc rayna-framework version web
 */

Rayna = {
    'name': 'Rayna 0.1',
    'options': {
        ajaxPoolSize: 5          //default
    },
    'cache': {
        'pageName': null,
        'nodeTree': [],
        'objectCache': {},
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
            document.addEventListener('DOMContentLoaded', function () {

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
    '$$': function (selector) {

        var components = this.$(selector, true);
        if (components.length == 1) {
            return components[0].component;
        } else {
            return components.map(function (item) {
                return item.component;
            });
        }
    },
    '$': function (selector, mode) {

        var selector = selector.trim();
        var selectorArr = selector.split(' ');

        function walk(domain, saIndex) {                      //暂时只支持简单的选择器

            if (saIndex == selectorArr.length) {
                return result.push(domain);
            }

            var saItem = selectorArr[saIndex];
            var nowDomain;
            switch (saItem.charAt(0)) {
                case '#':
                    var content = saItem.substr(1, saItem.length - 1);
                    nowDomain = domain._childrenIdMap[content];
                    break;
                case '.':
                    var content = saItem.substr(1, saItem.length - 1);
                    nowDomain = domain._childrenClassMap[content];
                    break;
                default :                                    //label
                    var content = saItem.toLowerCase();
                    nowDomain = domain._childrenTagMap[content];
            }

            if (nowDomain instanceof Array) {
                for (var i = 0, len = nowDomain.length; i < len; i++) {
                    walk(nowDomain[i], saIndex + 1);
                }
            } else {
                walk(nowDomain, saIndex + 1);
            }
        }

        var result = [];
        walk(Rayna.cache.nodeTree[0], 0);
        result = result.filter(function (item) {
            if (item != undefined) {
                return item;
            }
        });
        if (result.length == 1 && !mode) {
            return result[0];
        }
        return result;
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
        if (!R.cache.moduleMap[moduleName]) {
            return null;
        }
        return R.cache.moduleMap[moduleName].func();
    },
    'fetch': function (url, option) {

        var callbackList = [];
        return {
            then: function (callback) {

            },
            done: function (callback) {

            }
        }
    }
};

Rayna._Module = function (func) {
    this.func = func;
};

Rayna._Node = function (tagName, id, className, dom) {
    this.tagName = tagName;
    this.id = id;
    this.className = className;
    this.dom = dom;
    this.component = (R.require('component-' + tagName) && tagName != 'script' && tagName != 'body') ?
        R.require('component-' + tagName).build(dom) :
        null;
    this.children = [];
    this.parent = null;
    this._childrenClassMap = {};
    this._childrenIdMap = {};
    this._childrenTagMap = {};
};

Rayna._Node.prototype.addChildren = function (child) {
    this.children.push(child);
};

Rayna._Node.prototype.setParent = function (parent) {
    this.parent = parent;
};

Rayna._parse = function () {

    var body = document.getElementsByTagName('body');
    var nodeTree = Rayna.cache.nodeTree;

    function restoreClassAndId(tagName, className, id, node, nowNode) {

        if (!node.parent) {
            return;
        }

        var classMap = node.parent._childrenClassMap;
        var idMap = node.parent._childrenIdMap;
        var tagMap = node.parent._childrenTagMap;

        if (className) {
            classMap[className] || (classMap[className] = []);
            classMap[className].push(nowNode);
        }
        if (id) {
            if (idMap[id]) {
                console.error(Rayna.name + ': id:\"' + id + '\" has already exist');
            }
            idMap[id] = nowNode;
        }
        if (tagName) {
            tagMap[tagName] || (tagMap[tagName] = []);
            tagMap[tagName].push(nowNode);
        }
        restoreClassAndId(tagName, className, id, node.parent, nowNode);
    }

    function walk(dom, parent) {

        for (var i = 0; i < dom.children.length; i++) {

            var child = dom.children[i];
            var tagName = child.tagName.toLowerCase();
            var id = child.id;
            var className = child.className;
            var nowNode = new Rayna._Node(tagName, id, className, child);

            nodeTree.push(nowNode);
            nowNode.setParent(parent);
            parent.addChildren(nowNode);

            restoreClassAndId(tagName, className, id, nowNode, nowNode);
            walk(child, nowNode);
        }
    }

    var rootNode = new Rayna._Node('body');
    nodeTree.push(rootNode);
    walk(body[0], rootNode);
};

R = Rayna;