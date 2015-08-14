cmake_minimum_required(VERSION 3.2)
project(jni)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

include_directories(.)
include_directories(libs)
include_directories(libs/arm)
include_directories(libs/x86)
include_directories(/Users/Rube/WorkSpace/Tools/android-ndk-r10e/platforms/android-14/arch-arm/usr/include)

