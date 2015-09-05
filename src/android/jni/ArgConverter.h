#ifndef ARGCONVERTER
#define ARGCONVERTER

#include "Global.h"
#include <string>

namespace rayna {
    class ArgConverter {
    public:
        static v8::Handle<v8::Array> ConverterJavaArgsToJsArgs(jobjectArray args);
    };
}

#endif