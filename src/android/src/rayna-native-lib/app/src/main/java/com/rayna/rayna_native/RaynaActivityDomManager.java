package com.rayna.rayna_native;

import android.content.Context;
import android.util.Log;
import android.view.View;

import com.rayna.rayna_native.raynaframework.RaynaDom;
import com.rayna.rayna_native.raynaframework.RaynaDomBuild;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

/**
 * manage a Activity's doms
 * Created by Rube on 15/8/19.
 */
public class RaynaActivityDomManager {
    private ArrayList<RaynaDom> raynaDoms = new ArrayList<RaynaDom>();
    private HashMap<String, View> raynaDomViews = new HashMap<String, View>();
    private Context context = null;
    private RaynaDomBuild domBuildHelper = null;

    public RaynaActivityDomManager(Context context) {
        this.context = context;
        domBuildHelper = RaynaDomBuild.getInstance().init(context);
    }

    public void addRaynaDom(RaynaDom dom) {
        raynaDoms.add(dom);
        raynaDomViews.put(dom.getModuleId(), domBuildHelper.build(dom.getRoot()));
    }

    public RaynaDom getRayDom(String moduleID) {
        Iterator<RaynaDom> doms = raynaDoms.iterator();
        RaynaDom dom = null;
        while (doms.hasNext()) {
            dom = doms.next();
            if (moduleID.equals(dom.getModuleId())) {
                break;
            }
        }
        return dom;
    }

    public View getMainView() {
        for (int i = 0; i < raynaDoms.size(); i++) {
            if ("main".equals(raynaDoms.get(i).getAction().toLowerCase())) {
                String moduleID = raynaDoms.get(i).getModuleId();
                return raynaDomViews.get(moduleID);
            }
        }
        Log.e("error", "no main Activity");
        return null;
    }

    public void parseDOM(String appStr) {
        JSONTokener jsonTokener = new JSONTokener(appStr);
        try {
            JSONObject jsonObject = (JSONObject) jsonTokener.nextValue();
            Iterator<String> keys = jsonObject.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                RaynaDom dom = new RaynaDom(key, jsonObject.getString(key));
                this.addRaynaDom(dom);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
