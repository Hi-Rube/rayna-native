
#include <jni.h>
#include <string>
#include <stdio.h>
#include <stdlib.h>

#include "include/libplatform/libplatform.h"
#include "include/v8.h"
#include "RaynaNative.h"
#include "Common.h"

using namespace v8;
using namespace std;

Isolate* g_isolate = NULL;
Context::Scope *context_scope = nullptr;
Persistent<Context> *PrimaryContext = nullptr;
JavaVM *g_jvm = nullptr;
JNIEnv * g_env = nullptr;
jobject g_obj = NULL;

static const char *className = "com/rayna/rayna_native/raynaframework/RaynaNative";

static JNINativeMethod method_table[] = {
    {"execScript", "(Ljava/lang/String;)V", (void*)execScript}
};

static int registerNativeMethods(JNIEnv* env, const char* className,
        const JNINativeMethod* gMethods, int numMethods)
{
    jclass clazz;
    clazz = env->FindClass(className);
    if (clazz == NULL) {
        LOG_E("FindClass error");
        return JNI_FALSE;
    }

    if (env->RegisterNatives(clazz, gMethods, numMethods) < 0) {
        LOG_E("RegisterNatives error");
        return JNI_FALSE;
    }

    return JNI_TRUE;
}

int register_ndk_load(JNIEnv *env)
{
    return registerNativeMethods(env, className,
            method_table, sizeof(method_table) / sizeof(method_table[0]));
}

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *reserved)
{
	
	LOG_VERSION();

	g_jvm = vm;
	JNIEnv* env = NULL;
	jint result = -1;

    if (vm->GetEnv((void**) &env, JNI_VERSION_1_6) != JNI_OK) {
        return result;
    }

    register_ndk_load(env);

	return JNI_VERSION_1_6;
}

void fetch(const FunctionCallbackInfo<Value>& args){ 
   jclass clazz;
   Handle<Value> arg = args[0]->ToString();
   String::Utf8Value value(arg);
   LOG_E(*value);
   string ob = *value;
   const char* url = ob.c_str(); 
   jstring url_call = g_env->NewStringUTF(url);
   clazz = g_env->FindClass(className);
   jmethodID methodID = g_env->GetStaticMethodID(clazz, "fetch", "(Ljava/lang/String;)V");
   g_env->CallStaticVoidMethod(clazz, methodID, url_call);
 }

void execScript
  (JNIEnv * env, jobject obj, jstring str){
    g_env = env;
    g_obj = obj;
    const char*str_real = env->GetStringUTFChars(str,0);
    V8::InitializeICU();
    Platform* platform = platform::CreateDefaultPlatform();
    V8::InitializePlatform(platform);
    V8::Initialize();
    g_isolate = Isolate::New();
    Isolate::Scope isolate_scope(g_isolate);
    HandleScope scope(g_isolate);
    
    Handle<ObjectTemplate> global = ObjectTemplate::New(g_isolate);
    
    global->Set(String::NewFromUtf8(g_isolate, "fetch"), FunctionTemplate::New(g_isolate, (FunctionCallback)fetch));
    
    Local<Context> context = Context::New(g_isolate, NULL, global);
    context_scope = new Context::Scope(context);
    Local<String> source = String::NewFromUtf8(g_isolate, str_real, String::kNormalString);
    Local<Script> compiled_script = Script::Compile(source);
    compiled_script->Run();
  }