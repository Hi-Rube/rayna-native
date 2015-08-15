package com.rayna.rayna_native;

import android.app.Application;

import com.rayna.rayna_native.raynaframework.RaynaAttributes;

/**
 * base main application
 * Created by Rube on 15/8/15.
 */
public class RaynaApplication extends Application {

    @Override
    public void onCreate(){
        RaynaAttributes.init();
    }
}
