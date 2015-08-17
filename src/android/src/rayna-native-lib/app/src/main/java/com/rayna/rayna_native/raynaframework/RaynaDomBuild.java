package com.rayna.rayna_native.raynaframework;

import android.app.Activity;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import com.rayna.rayna_native.components.RaynaBaseComponent;
import com.rayna.rayna_native.components.RaynaComponentFactory;

import java.util.Iterator;

/**
 * build android component and assemble them
 * Created by Rube on 15/8/15.
 */
public class RaynaDomBuild {

    public static RaynaDomBuild raynaDomBuild = null;

    private Activity cxt = null;
    private ViewGroup view = null;

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

    public RaynaDomBuild init(Context cxt) {
        this.cxt = (Activity) cxt;
        view = new RelativeLayout(cxt);
        ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        view.setLayoutParams(layoutParams);
        return this;
    }

    public View build(RaynaDomElement root) {
        Iterator<RaynaDomElement> doms = root.children.iterator();
        while (doms.hasNext()) {
            RaynaDomElement dom = doms.next();
            RaynaBaseComponent component = RaynaComponentFactory.getComponent(dom.type, cxt);
            component.setAttributes(dom.attributes);
            view.addView((View) component);             //TODO:需要优雅的转换 RaynaBaseComponent -> View
            if (dom.children.size() != 0){
                build(dom);
            }
        }
        return view;
    }

    public View getView() {
        return view;
    }
}
