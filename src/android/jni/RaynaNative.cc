#include "RaynaNative.h"
#include "Common.h"
#include "ArgConverter.h"

using namespace v8;
using namespace std;

Isolate* g_isolate = nullptr;
Context::Scope *context_scope = nullptr;
Persistent<Context> *PrimaryContext = nullptr;
JavaVM * g_jvm = nullptr;
Local<Context> g_context;

static const char *className = "com/rayna/rayna_native/raynaframework/RaynaNative";

static JNINativeMethod method_table[] = {
  {"execScript", "(Ljava/lang/String;)V", (void*)execScript},
  {"callJsMethod", "(Ljava/lang/String;I[Ljava/lang/Object;)Ljava/lang/Object;", (void*)callJsMethod}
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

  V8::InitializeICU();
  Platform* platform = platform::CreateDefaultPlatform();
  V8::InitializePlatform(platform);
  V8::Initialize();

  return JNI_VERSION_1_6;
}

void fetch(const FunctionCallbackInfo<Value>& args) {
  JNIEnv *g_env = nullptr;
  jint ret = g_jvm->GetEnv(reinterpret_cast<void**>(&g_env), JNI_VERSION_1_6);

  if ((ret != JNI_OK) || (g_env == nullptr))
  {
    ret = g_jvm->AttachCurrentThread(&g_env, nullptr);
  }
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
(JNIEnv * env, jobject obj, jstring str) {
  const char*str_real = env->GetStringUTFChars(str, 0);
  g_isolate = Isolate::New();
  Isolate::Scope isolate_scope(g_isolate);
  HandleScope scope(g_isolate);

  Handle<ObjectTemplate> global = ObjectTemplate::New(g_isolate);

  global->Set(String::NewFromUtf8(g_isolate, "fetch"), FunctionTemplate::New(g_isolate, (FunctionCallback)fetch));

  Local<Context> context = Context::New(g_isolate, NULL, global);
  context_scope = new Context::Scope(context);
  PrimaryContext = new Persistent<Context>(g_isolate,context);
  g_context = context;
  Local<String> source = String::NewFromUtf8(g_isolate, str_real, String::kNormalString);
  Local<Script> compiled_script = Script::Compile(source);
  compiled_script->Run();
}

jobject callJsMethod(JNIEnv *env, jobject obj, jstring methodName, jint returnType, jobjectArray args){
  auto isolate = Isolate::GetCurrent();
  Handle<Object>globalObj = g_context->Global();
  Handle<Object>value = globalObj->Get(String::NewFromUtf8(isolate, "Native")).As<Object>();
  LOG_E("hello-----world-Rube-GOGOGO-------ll");

  Handle<Function> objFunc = value ->Get(String::NewFromUtf8(isolate, "domGet")).As<Function>();
  Handle<Value> domObject = objFunc->Call(globalObj,0,nullptr);

  String::Utf8Value domObjectStr(domObject);
  return env->NewStringUTF(*domObjectStr);
}