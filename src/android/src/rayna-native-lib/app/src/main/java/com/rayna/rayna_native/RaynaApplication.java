package com.rayna.rayna_native;

import android.app.Application;
import android.util.Log;

import com.rayna.rayna_native.raynaframework.RaynaDomAttributes;
import com.rayna.rayna_native.raynaframework.RaynaNative;
import com.rayna.rayna_native.raynaframework.RaynaNet;
import com.rayna.rayna_native.raynaframework.RaynaNetOptions;

/**
 * base main application
 * Created by Rube on 15/8/15.
 */
public class RaynaApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        RaynaDomAttributes.init();
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
        System.exit(0);
    }

}
