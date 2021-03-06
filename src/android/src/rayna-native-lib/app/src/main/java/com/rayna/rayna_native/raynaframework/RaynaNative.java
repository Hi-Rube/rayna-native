package com.rayna.rayna_native.raynaframework;

import android.util.Log;

import java.util.HashMap;

/**
 * provide interface to v8
 * Created by Rube on 15/8/18.
 */
public class RaynaNative {

    static {
        System.loadLibrary("rayna_native");
    }

    public static void fetch(String url) {
        RaynaNetOptions options = new RaynaNetOptions();
        options.setUrl(url);
        RaynaNet raynaNet = RaynaNet.getInstance();
        raynaNet.request(options, new RaynaNet.RaynaNetCallback() {
            @Override
            public void success(Object obj) {
                Log.v("****************************************************", (String)obj);
            }

            @Override
            public void failed(Object e) {

            }
        });
    }

    public static native void execScript(String script);

    public static native Object callJsMethod(String methodName, int returnType, Object... args);

}
