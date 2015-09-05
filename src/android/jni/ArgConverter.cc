#include "ArgConverter.h"
#include <cstdlib>

using namespace rayna;
using namespace v8;
using namespace std;

v8::Handle<v8::Array> ArgConverter::ConverterJavaArgsToJsArgs(jobjectArray args) {
    auto isolate = g_isolate::GetCurrent();
    const char *param[20];
    int stringCount = g_env->GetArrayLength(stringArray);
    for (int i = 0; i < stringCount; i++) {
        jstring string = (jstring) GetObjectArrayElement(env, stringArray, i);
        const char *rawString = GetStringUTFChars(env, string, 0);
        string s(rawString);
        ReleaseStringUTFChars(env, string, rawString);
    }
    v8::Handle<v8::Array> array = v8::Array::New(isolate, stringCount);
    array->Set();
}

