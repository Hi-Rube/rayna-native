/**
 * @module deleteFolder
 * @author Rube
 * @date 15/8/30
 * @desc
 */

'use strict';

var fs = require('fs');

var deleteFolderRecursive = function(path) {

    var files = [];

    if( fs.existsSync(path) ) {

        files = fs.readdirSync(path);

        files.forEach(function(file,index){

            var curPath = path + "/" + file;

            if(fs.statSync(curPath).isDirectory()) { // recurse

                deleteFolderRecursive(curPath);

            } else { // delete file

                fs.unlinkSync(curPath);

            }

        });

        fs.rmdirSync(path);

    }

};

module.exports = {
    delete: deleteFolderRecursive
};