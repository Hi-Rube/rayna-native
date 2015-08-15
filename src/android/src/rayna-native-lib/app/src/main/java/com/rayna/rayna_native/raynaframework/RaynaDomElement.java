package com.rayna.rayna_native.raynaframework;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Single DOM Element Entity
 * Created by Rube on 15/8/15.
 */
public class RaynaDomElement {
    public String type;
    public int indexId;
    public HashMap<String, String> attributes = new HashMap<String, String>();
    public ArrayList<RaynaDomElement> children = new ArrayList<RaynaDomElement>();
}
