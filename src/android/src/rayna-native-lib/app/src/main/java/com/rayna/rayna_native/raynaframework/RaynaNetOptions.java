package com.rayna.rayna_native.raynaframework;

import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.message.BasicNameValuePair;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Set;

/**
 * net I/O request params
 * Created by Rube on 15/8/17.
 */
public class RaynaNetOptions {

    private String url = null;
    private boolean ssl = false;
    private boolean form = false;           //TODO: support form
    private LinkedList<BasicNameValuePair> params = new LinkedList<BasicNameValuePair>();
    private HashMap<String, String> headers = new HashMap<String, String>();
    private String method = "GET";

    public RaynaNetOptions setUrl(String url) {
        if (url.split("https:").length == 2) {
            this.ssl = true;
        }
        this.url = url;
        return this;
    }

    public boolean isSSL() {
        return ssl;
    }

    public RaynaNetOptions addParams(String key, String value) {
        params.add(new BasicNameValuePair(key, value));
        return this;
    }

    public RaynaNetOptions setHeaders(String key, String value) {
        headers.put(key, value);
        return this;
    }

    public RaynaNetOptions setMethod(String method) {
        this.method = method;
        return this;
    }

    public RaynaNetOptions setForm(boolean isForm) {
        this.form = isForm;
        return this;
    }

    public HttpRequestBase buildRequest() {
        HttpRequestBase request = null;
        switch (this.method) {
            case "post":
                try {
                    ((HttpPost) request).setEntity(new UrlEncodedFormEntity(params, "utf-8"));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                request = new HttpPost(this.url);
                break;
            case "delete":
                break;
            case "put":
                break;
            default:
                String param = URLEncodedUtils.format(params, "UTF-8");
                request = new HttpGet(this.url + "?" + param);
        }

        Set<String> keySet = headers.keySet();
        Iterator<String> keys = keySet.iterator();
        while (keys.hasNext()) {
            String key = keys.next();
            request.setHeader(key, headers.get(key));
        }

        return request;
    }
}
