package com.rayna.rayna_native.components;

import android.content.Context;
import android.widget.TextView;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

/**
 * RaynaTextView <TextView></TextView>
 * Created by Rube on 15/8/15.
 */
public class RaynaTextView extends TextView implements RaynaBaseComponent {
    private HashMap<String, String> attributes = null;

    public RaynaTextView(Context context) {
        super(context);
    }

    @Override
    public void setAttributes(HashMap<String, String> attributes) {
        this.attributes = attributes;
        Set<String> keySet = attributes.keySet();
        Iterator<String> keys = keySet.iterator();
        while (keys.hasNext()){
            String key = keys.next();
            buildAttributes(key, attributes.get(key));
        }
    }

    @Override
    public void buildComponent() {

    }

    private void buildAttributes(String attrName, String attribute){
        switch (attrName){
            case "text": this.setText(attribute); break;
        }
    }
}
