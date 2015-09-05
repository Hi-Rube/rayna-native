#ifndef _RN_MAIN
#define _RN_MAIN

#include "Global.h"
#include <string>
#include <stdio.h>
#include <stdlib.h>

void execScript(JNIEnv *, jobject, jstring);
jobject callJsMethod(JNIEnv *, jobject, jstring, jint, jobjectArray);
#endif