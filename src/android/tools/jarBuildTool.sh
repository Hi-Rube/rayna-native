#!/usr/bin/env sh
cd ../src/rayna-native-lib/
./gradlew makeJar
cp ../../build/rayna-native.jar ../../assert/rayna-native/app/libs

#make android classes to jar