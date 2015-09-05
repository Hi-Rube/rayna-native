//
// Created by 董一炜 on 15/8/23.
//

#ifndef JNI_GLOBAL_H
#define JNI_GLOBAL_H

#include "include/libplatform/libplatform.h"
#include "include/v8.h"
#include "jni.h"

extern v8::Isolate *g_isolate;
extern JavaVM *g_jvm;
extern JNIEnv *g_env;

#endif //JNI_GLOBAL_H
