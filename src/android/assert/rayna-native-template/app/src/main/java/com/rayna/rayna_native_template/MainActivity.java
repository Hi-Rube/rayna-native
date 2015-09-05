package com.rayna.rayna_native_template;

import android.os.Bundle;

import com.rayna.rayna_native.RaynaActivity;

public class MainActivity extends RaynaActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHost("http://10.17.217.100:6558");
        start();
    }

}
