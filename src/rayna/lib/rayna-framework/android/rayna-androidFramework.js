/**
 * @module rayna-framework
 * @author Rube
 * @date 15/8/19
 * @desc rayna-framework version android
 */

/* private */
var UUID = {
    UUID: 0,
    get: function () {
        this.UUID++;
        return this.UUID;
    }
};

/* connect native */
var Native = {
    fetch: function (url, option, id) {

    },
    domGet: function () {

        var domObject = {};

        for (var key in Rayna.DomCache) {
            var arr = /^domReady(.*)$/.exec(key);
            if (arr == null) continue;
            if (arr.length === 2) {
                domObject[arr[1]] = JSON.stringify(Rayna.DomCache[arr[0]]);
            }
        }
        return JSON.stringify(domObject);
    },
    domDone: function (moduleID) {

        Rayna.DomCache['domOK' + moduleID]();
    },
    log: function (message) {

    }
};

/* support user */
var fetch = function (url, option) {
    var callbackList = [];
    return {
        then: function (callback) {

            callbackList.push(callback);

            return this;
        },
        done: function () {

            var id = UUID.get();
            Rayna.EventCache['resOK' + id] = callbackList[0];
            Rayna.EventCache['resFILED' + id] = callbackList[1];
            Native.fetch(url, option, id);
        }
    }
};

Rayna = {
    EventCache: {},
    DomCache: {},
    dom: function (moduleID, domObject) {
        Rayna.DomCache['domReady' + moduleID] = domObject;
    },
    run: function (moduleID, callback) {
        Rayna.DomCache['domOK' + moduleID] = callback;
    },
    log: function (content) {
        Native.log(content);
    }
};


