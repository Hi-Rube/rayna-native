package com.rayna.rayna_native.raynaframework;

import android.app.Activity;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

/**
 * build android component and assemble them
 * Created by Rube on 15/8/15.
 */
public class RaynaDomBuild {

    public static RaynaDomBuild raynaDomBuild = null;

    private RaynaDomBuild() {
    }

    public static RaynaDomBuild getInstance() {
        if (raynaDomBuild == null) {
            raynaDomBuild = new RaynaDomBuild();
        }
        return raynaDomBuild;
    }

    public static void destroy() {
        raynaDomBuild = null;
    }

    public View build(RaynaDomElement root, Context cxt) {
        Activity activity = (Activity) cxt;
        RelativeLayout view = new RelativeLayout(cxt);
        ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        view.setLayoutParams(layoutParams);
        if ("activity".equals(root.type)) {
            activity.setContentView(view);
            TextView tv = new TextView(cxt);
            tv.setText(root.children.get(0).attributes.get("text"));
            view.addView(tv);
        }
        return view;
    }
}
