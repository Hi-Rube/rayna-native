#ifndef ARGCONVERTER
#define ARGCONVERTER

#include "include/v8.h"
#include "jni.h"
#include <string>

namespace rayna {
    class ArgConverter {
    public:
        static v8::Handle<v8::Array> ConverterJavaArgsToJsArgs(jobjectArray args);
    };
}

#endif