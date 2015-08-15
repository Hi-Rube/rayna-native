package com.rayna.rayna_native.raynaframework;

import java.util.HashMap;

/**
 * dom's attributes
 * Created by Rube on 15/8/15.
 */
public class RaynaAttributes {

    private static HashMap<String, String[]> attributesMap = new HashMap<String, String[]>();

    public static String[] getAttributes(String element) {
        return attributesMap.get(element);
    }

    public static void init() {
        String[] BASE = new String[]{"id", "class", "style"};
        String[] TEXTVIEW = new String[]{"id", "class", "style", "text"};
        attributesMap.put("base", BASE);
        attributesMap.put("textview", TEXTVIEW);
    }

    public static boolean checkAttributes(String type, String attribute) {
        String[] attributes = attributesMap.get(type);
        for (int i = 0; i < attributes.length; i++) {
            if (attributes[i].equals(attribute)) {
                return true;
            }
        }
        return false;
    }
}
