#ifndef UTIL_H
#define UTIL_H

#include <jni.h>

class Util {
public:
    static char *jstringTostring(JNIEnv*, jstring);
};

#endif