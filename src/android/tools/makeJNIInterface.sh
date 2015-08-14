#!/usr/bin/env sh

javah -d ../jni -classpath ../src/rayna-native-lib/app/src/main/java/ $1

# make interface between java and c++