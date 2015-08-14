LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE    := v8_base
ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
    LOCAL_SRC_FILES := libs/arm/libv8_base.a
else ifeq ($(TARGET_ARCH_ABI),armeabi)
    LOCAL_SRC_FILES := libs/arm/libv8_base.a
else ifeq ($(TARGET_ARCH_ABI),x86)
    LOCAL_SRC_FILES := libs/x86/libv8_base.a
endif
include $(PREBUILT_STATIC_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE    := v8_libplatform
ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
    LOCAL_SRC_FILES := libs/arm/libv8_libplatform.a
else ifeq ($(TARGET_ARCH_ABI),armeabi)
    LOCAL_SRC_FILES := libs/arm/libv8_libplatform.a
else ifeq ($(TARGET_ARCH_ABI),x86)
    LOCAL_SRC_FILES := libs/x86/libv8_libplatform.a
endif
include $(PREBUILT_STATIC_LIBRARY)


include $(CLEAR_VARS)
LOCAL_MODULE    := v8_libbase
ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
    LOCAL_SRC_FILES := libs/arm/libv8_libbase.a
else ifeq ($(TARGET_ARCH_ABI),armeabi)
    LOCAL_SRC_FILES := libs/arm/libv8_libbase.a
else ifeq ($(TARGET_ARCH_ABI),x86)
    LOCAL_SRC_FILES := libs/x86/libv8_libbase.a
endif
include $(PREBUILT_STATIC_LIBRARY)



include $(CLEAR_VARS)
LOCAL_MODULE    := v8_nosnapshot
ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
    LOCAL_SRC_FILES := libs/arm/libv8_nosnapshot.a
else ifeq ($(TARGET_ARCH_ABI),armeabi)
    LOCAL_SRC_FILES := libs/arm/libv8_nosnapshot.a
else ifeq ($(TARGET_ARCH_ABI),x86)
    LOCAL_SRC_FILES := libs/x86/libv8_nosnapshot.a
endif
include $(PREBUILT_STATIC_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE    := zip
ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
    LOCAL_SRC_FILES := libs/arm/libzip.a
else ifeq ($(TARGET_ARCH_ABI),armeabi)
    LOCAL_SRC_FILES := libs/arm/libzip.a
else ifeq ($(TARGET_ARCH_ABI),x86)
    LOCAL_SRC_FILES := libs/x86/libzip.a
endif
include $(PREBUILT_STATIC_LIBRARY)


include $(CLEAR_VARS)
LOCAL_CPPFLAGS += -std=c++11
LOCAL_MODULE    := rayna_native
LOCAL_SRC_FILES := RunScript.cpp Util.cpp
#LOCAL_C_INCLUDES := $(LOCAL_PATH)/include
LOCAL_C_INCLUDES := $(LOCAL_PATH)

LOCAL_LDLIBS    := -llog -landroid -lz
ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
LOCAL_STATIC_LIBRARIES := v8_base v8_libbase v8_libplatform v8_nosnapshot
#LOCAL_CFLAGS += -pg -DNDK_PROFILER_ENABLED
else
LOCAL_STATIC_LIBRARIES := v8_base v8_libbase v8_libplatform v8_nosnapshot
endif
include $(BUILD_SHARED_LIBRARY)

ifeq ($(TARGET_ARCH_ABI),armeabi-v7a)
# at the end of Android.mk
#$(call import-module,android-ndk-profiler)
endif

