package com.rayna.rayna_native.components;

import android.content.Context;
import android.util.Log;

/**
 * through the type return component
 * Created by Rube on 15/8/17.
 */
public class RaynaComponentFactory {
    public static RaynaBaseComponent getComponent(String type, Context cxt){
        switch (type){
            case "textview": return new RaynaTextView(cxt);
        }
        Log.e("error", "can't find " + type + " component" );
        return null;
    }
}
