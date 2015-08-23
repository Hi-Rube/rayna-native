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
        'idTree': {}
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
        if (pageName == Rayna.cache['pageName']) {
            window.onload = func;
        } else {
            console.error(Rayna.name + ':pageName error');
        }
    },
    'runTo': function (url, func) {
        func();                                                //注意这个回调是提前执行,并没有回调执行
        window.location = url;
    },
    '$': function (selector) {

    }
};

R = Rayna;