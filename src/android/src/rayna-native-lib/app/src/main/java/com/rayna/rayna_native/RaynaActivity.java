package com.rayna.rayna_native;

import android.app.Activity;

import com.rayna.rayna_native.raynaframework.RaynaDom;
import com.rayna.rayna_native.raynaframework.RaynaDomBuild;
import com.rayna.rayna_native.raynaframework.RaynaDomElement;
import com.rayna.rayna_native.utils.Connect;

/**
 * base main activity
 * Created by Rube on 15/8/14.
 */
public class RaynaActivity extends Activity {

    protected Connect connect;
    private String _jsContent = null;

    @Override
    protected void onCreate(android.os.Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        connect = Connect.getInstance();
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
                if (jsContent == null) {
                    _jsContent = jsContent;
                }
                Connect.destroy();
            }
        });
    }

    //just test
    protected void parse(String jsonObjStr){
        RaynaDom raynaDom = new RaynaDom("index", jsonObjStr);
        RaynaDomElement root = raynaDom.getRoot();
        setContentView(RaynaDomBuild.getInstance().build(root, this));
    }
}
