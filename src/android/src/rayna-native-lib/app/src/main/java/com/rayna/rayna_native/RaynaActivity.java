package com.rayna.rayna_native;

import android.app.Activity;
import android.util.Log;

import com.rayna.rayna_native.raynaframework.RaynaDom;
import com.rayna.rayna_native.raynaframework.RaynaDomBuild;
import com.rayna.rayna_native.raynaframework.RaynaDomElement;
import com.rayna.rayna_native.raynaframework.RaynaNative;
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
                }
                RaynaNative.execScript(_jsContent);
                Connect.destroy();
            }
        });
    }

    private void parseDOM(){
        HashMap<String, String> doms = RaynaNative.buildDom();
        Set<String> domSet = doms.keySet();
        Iterator<String> keys = domSet.iterator();
        while (keys.hasNext()){
            String key = keys.next();
            RaynaDom dom = new RaynaDom(key, doms.get(key));
            domManager.addRaynaDom(dom);
        }
    }
}
