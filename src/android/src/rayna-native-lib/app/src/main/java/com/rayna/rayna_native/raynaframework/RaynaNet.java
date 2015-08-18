package com.rayna.rayna_native.raynaframework;

import android.net.http.AndroidHttpClient;
import android.util.Log;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * net I/O request
 * Created by Rube on 15/8/17.
 */
public class RaynaNet {

    private static RaynaNet raynaNet = null;

    private RaynaNet() {
    }

    public static RaynaNet getInstance() {
        if (raynaNet == null) {
            raynaNet = new RaynaNet();
        }
        return raynaNet;
    }

    public void request(final RaynaNetOptions raynaNetOptions, final RaynaNetCallback callback) {
        if (raynaNetOptions.isSSL()) {
            //TODO:  --->https<---
        } else {
            final AndroidHttpClient androidHttpClient = AndroidHttpClient.newInstance("Android");
            Runnable httpRunnable = new Runnable() {

                @Override
                public void run() {
                    try {
                        HttpResponse httpResponse = androidHttpClient.execute(raynaNetOptions.buildRequest());
                        Integer statusCode = httpResponse.getStatusLine().getStatusCode();
                        if (statusCode == 200) {
                            callback.success(showResponseResult(httpResponse));
                        } else {
                            callback.failed("error" + statusCode);
                            Log.e("error", "404 Not Found - jsContent not found");
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    androidHttpClient.close();
                }
            };

            Thread httpThread = new Thread(httpRunnable);
            httpThread.start();
        }
    }

    /**
     * parse response
     *
     * @param response the response from static server
     * @return the data from static server
     */
    private String showResponseResult(HttpResponse response) {
        if (null == response) {
            return null;
        }

        HttpEntity httpEntity = response.getEntity();
        try {
            InputStream inputStream = httpEntity.getContent();
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    inputStream));
            String result = "";
            String line = "";
            while (null != (line = reader.readLine())) {
                result += line;
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public interface RaynaNetCallback<T> {
        void success(T obj);

        void failed(Object e);
    }
}
