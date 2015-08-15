package com.rayna.rayna_native_template;

import android.os.Bundle;
import android.util.Log;

import com.rayna.rayna_native.RaynaActivity;
import com.rayna.rayna_native.raynaframework.RaynaDom;
import com.rayna.rayna_native.raynaframework.RaynaDomElement;


public class MainActivity extends RaynaActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHost("http://10.17.217.53:6558");
        start();
        parse("{\"activity\":{\"children\":{\"textview.0\":{\"text\":\"rube\",\"children\":{}}}}}");
    }

}
