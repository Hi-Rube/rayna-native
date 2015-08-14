//
// Created by 董一炜 on 15/8/1.
//

#include "RunScript.h"
#include "com_rube_xiba_native_RunScript.h"
#include "com_rube_xiba_native_NativeActivity.h"
#include "include/v8.h"
#include "include/libplatform/libplatform.h"
#include "Util.h"

using namespace v8;
using namespace std;

static Isolate *isolate = NULL;
JNIEnv* env = NULL;
jobject obj = NULL;

void toast(){
    char* classname = "com/rube/xiba_native/RunScript";
    jclass dpclazz = env->FindClass(classname);
    jmethodID methodID = env->GetMethodID(dpclazz, "showToast", "()V");
    env->CallVoidMethod(obj, methodID);
}

void toastV8(const v8::FunctionCallbackInfo<Value> &args){
    toast();
}

string RunScript::getScriptResult(string script) {
    // Initialize V8.

    string back;
    // Create a new Isolate and make it the current one.
    isolate->Enter();
    {
        Isolate::Scope isolate_scope(isolate);

        // Create a stack-allocated handle scope.
        HandleScope handle_scope(isolate);

        v8::Handle<v8::ObjectTemplate> global = v8::ObjectTemplate::New(isolate);

        Local<FunctionTemplate> globalFunTemplate = v8::FunctionTemplate::New(isolate, (FunctionCallback)toastV8);
        global->Set(v8::String::NewFromUtf8(isolate, "showToast"), globalFunTemplate);

        Local<Context> context = Context::New(isolate, NULL, global);

        // Enter the context for compiling and running the hello world script.
        Context::Scope context_scope(context);


        // Create a string containing the JavaScript source code.
        Local<String> source = String::NewFromUtf8(isolate, script.c_str());

        // Compile the source code.
        Local<Script> script = Script::Compile(source);

        // Run the script to get the result.
        Local<Value> result = script->Run();

        // Convert the result to an UTF8 string and print it.
        String::Utf8Value utf8(result);
        back = *utf8;
    }

    // Dispose the isolate and tear down V8.
    isolate->Exit();
    return back;
}

JNIEXPORT jstring

JNICALL Java_com_rube_xiba_1native_RunScript_runScript
        (JNIEnv *enve, jobject obje, jstring str) {
    env = enve;
    obj = obje;
    V8::InitializeICU();
    Platform *platform = platform::CreateDefaultPlatform();
    V8::InitializePlatform(platform);
    V8::Initialize();
    Isolate::CreateParams params = Isolate::CreateParams();
    isolate = Isolate::New(params);
    RunScript rs = RunScript();
    //RunScript::getScriptResult(realStr).c_str();
    char *realStr = Util::jstringTostring(env, str);
    jstring jstr = env->NewStringUTF(rs.getScriptResult(realStr).c_str());
    //delete realStr;
    isolate->Dispose();
    isolate = NULL;
    V8::Dispose();
    V8::ShutdownPlatform();
    delete platform;
    return jstr;
}


