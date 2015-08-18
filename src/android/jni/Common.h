#include <android/log.h>
#include "Version.h"

#ifndef _RN_COMMON
#define _RN_COMMON

#define LOG_V(tag, message) __android_log_write(ANDROID_LOG_DEBUG, tag, message)
#define LOG_VERSION() __android_log_print(ANDROID_LOG_INFO, "Rube.RaynaNative", "---------->RaynaNative Runtime Version %s, commit %s<----------", NATIVE_SCRIPT_RUNTIME_VERSION, NATIVE_SCRIPT_RUNTIME_COMMIT_SHA);
#define LOG_E(message) __android_log_write(ANDROID_LOG_DEBUG, "Rube.RaynaNative-Error", message)

#endif

