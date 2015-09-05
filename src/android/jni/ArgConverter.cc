#include "ArgConverter.h"
#include <cstdlib>

using namespace rayna;
using namespace v8;
using namespace std;

v8::Handle<v8::Array> ArgConverter::ConverterJavaArgsToJsArgs(jobjectArray args) {
    JNIEnv *g_env = nullptr;
    jint ret = g_jvm->GetEnv(reinterpret_cast<void**>(&g_env), JNI_VERSION_1_6);

    if ((ret != JNI_OK) || (g_env == nullptr))
    {
        ret = g_jvm->AttachCurrentThread(&g_env, nullptr);
    }

    auto isolate = Isolate::GetCurrent();
    const char *param[20];
    int stringCount = g_env->GetArrayLength(args);
    v8::Handle<v8::Array> array = v8::Array::New(isolate, stringCount);
    for (int i = 0; i < stringCount; i++) {
        jstring nowString = (jstring) g_env->GetObjectArrayElement(args, i);
        const char *rawString = g_env->GetStringUTFChars(nowString, 0);
        g_env->ReleaseStringUTFChars(nowString, rawString);
        array->Set(0, v8::String::NewFromUtf8(isolate, rawString));
    }
    return array;
}

