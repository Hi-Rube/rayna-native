package com.rayna.rayna_native.components;

import java.util.HashMap;

/**
 * base component
 * Created by Rube on 15/8/17.
 */
public interface RaynaBaseComponent {
    void setAttributes(HashMap<String, String> attributes);

    void buildComponent();
}
