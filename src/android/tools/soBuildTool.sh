#!/usr/bin/env sh
clear
rm -rf ../build/*
rm -rf ../src/rayna-native-lib/app/libs/*
cd ../jni
ndk-build
mv ../libs ../obj ../build
cp -r ../build/libs/* ../src/rayna-native-lib/app/libs
cp -r ../build/libs/* ../assert/rayna-native-template/app/libs

#build c++ module to .so
