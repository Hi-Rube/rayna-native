#!/usr/bin/env sh
cd ../src/rayna-native-lib/
./gradlew clean makeJar
cp ../../build/rayna-native.jar ../../assert/rayna-native-template/app/libs

#make android classes to jar