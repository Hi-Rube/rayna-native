package com.rayna.rayna_native;

import android.app.Activity;
import android.util.Log;

import com.rayna.rayna_native.raynaframework.RaynaDom;
import com.rayna.rayna_native.raynaframework.RaynaDomBuild;
import com.rayna.rayna_native.raynaframework.RaynaDomElement;
import com.rayna.rayna_native.raynaframework.RaynaNative;
import com.rayna.rayna_native.raynaframework.RaynaNativeType;
import com.rayna.rayna_native.utils.Connect;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

/**
 * base main activity
 * Created by Rube on 15/8/14.
 */
public class RaynaActivity extends Activity {

    protected Connect connect;
    private RaynaActivityDomManager domManager = null;
    private String _jsContent = null;

    @Override
    protected void onCreate(android.os.Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        connect = Connect.getInstance();
        domManager = new RaynaActivityDomManager(this);
    }

    protected void setHost(String host) {
        connect.setHost(host);
    }

    protected void setJsContent(String jsContent) {
        this._jsContent = jsContent;
    }

    protected void start() {
        if (_jsContent != null) {
            RaynaNative.execScript(_jsContent);
            return;
        }
        if (connect.getHost() == null) {
            connect.setHost("http://127.0.0.1:6558/");
        }
        connect.getJsContent(new Connect.ConnectCallback() {
            @Override
            public void getJsContent(String jsContent) {
                if (jsContent != null) {
                    _jsContent = jsContent;
                    RaynaNative.execScript(_jsContent);
                    showView();
                } else {
                    Log.e("warning", "can't load jsContent");
                }
                Connect.destroy();
            }
        });
    }

    private void showView() {
        String appStr = (String) RaynaNative.callJsMethod("domGet", RaynaNativeType.STRING);
        domManager.parseDOM(appStr);
        this.setContentView(domManager.getMainView());
    }
}
