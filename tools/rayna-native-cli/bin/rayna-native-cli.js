#!/usr/bin/env node

'use strict';

var checkArgs = require('../lib/check-argv');
var colorConsole = require('color-console');
var exec = require('child_process').exec;

var result = checkArgs.check(process.argv);

if (!result) {
    return colorConsole.red('please input as \' rayna-native-cli <appliction name> <package name> \'');
}

var applicationName = result.applicationName;
var packageName = result.packageName;

var appPath = process.cwd();

