package com.rayna.rayna_native;

import android.app.NativeActivity;
import android.util.Log;

import com.rayna.rayna_native.utils.Connect;

/**
 * base main activity
 * Created by Rube on 15/8/14.
 */
public class RaynaActivity extends NativeActivity {

    @Override
    protected void onCreate(android.os.Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Connect connect = Connect.getInstance();
        connect.setHost("http://localhost:6558/");
        connect.getJsContent(new Connect.ConnectCallback() {
            @Override
            public void getJsContent(String jsContent) {
                Log.v("js", jsContent);
                Connect.destroy();
            }
        });
    }
}
