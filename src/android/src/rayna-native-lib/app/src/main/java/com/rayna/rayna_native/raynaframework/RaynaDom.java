package com.rayna.rayna_native.raynaframework;

import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.util.Iterator;

/**
 * a module's DOM group
 * Created by Rube on 15/8/14.
 */
public class RaynaDom {

    private JSONObject domObject = null;
    private String moduleId = null;
    private RaynaDomElement root = new RaynaDomElement();

    public RaynaDom(String moduleId, String domObjectStr) {
        this.moduleId = moduleId;
        JSONTokener jsonTokener = new JSONTokener(domObjectStr);
        try {
            domObject = (JSONObject) jsonTokener.nextValue();

            //parse activity node's attributes , there always are some config
            parseDomActivity(domObject);
            //parse each dom node
            parseDom("activity", domObject.getJSONObject("activity"), root);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public RaynaDomElement getRoot() {
        return root;
    }

    private void parseDom(String elementName, JSONObject domObject, RaynaDomElement domElement) {
        if (domObject == null) {
            return;
        }
        try {
            Iterator<String> keys = domObject.keys();
            JSONObject childDomObject = null;
            while (keys.hasNext()) {
                String attribute = keys.next();
                if ("children".equals(attribute)) {
                    childDomObject = domObject.getJSONObject("children");
                } else if (!elementName.equals("activity")) {
                    if (RaynaAttributes.checkAttributes(domElement.type, attribute)) {
                        domElement.attributes.put(attribute, domObject.getString(attribute));
                    }
                }
            }

            Iterator<String> childKeys = childDomObject.keys();
            while (childKeys.hasNext()) {
                String key = childKeys.next();
                String[] keyArr = key.split("\\.");
                String _elementName = keyArr[0];
                int _elementIndex = Integer.parseInt(keyArr[1]);
                RaynaDomElement childDomElement = new RaynaDomElement();
                childDomElement.type = _elementName;
                childDomElement.indexId = _elementIndex;
                domElement.children.add(childDomElement);
                parseDom(key, childDomObject.getJSONObject(key), childDomElement);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void parseDomActivity(JSONObject domObject) {
        if (!domObject.has("activity")) {
            Log.e("error", "no activity");
            return;
        }
        root.indexId = 0;
        root.type = "activity";
        Iterator<String> keys = null;
        JSONObject activityDOM = null;
        try {
            activityDOM = domObject.getJSONObject("activity");
            keys = activityDOM.keys();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        while (keys.hasNext()) {
            String attribute = keys.next();
            if (attribute != "children") {
                try {
                    root.attributes.put(attribute, activityDOM.getString(attribute));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
