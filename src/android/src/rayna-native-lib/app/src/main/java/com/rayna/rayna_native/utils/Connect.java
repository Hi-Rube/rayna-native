package com.rayna.rayna_native.utils;

import android.net.http.AndroidHttpClient;
import android.util.Log;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Created by Rube on 15/8/14.
 * connect local server or local assert to get jsContent
 * <p/>
 * Usage:
 * <p/>
 * Connect connect = Connect.getInstance();
 * connect.setHost('*');
 * connect.getJsContent(ccb);
 */
public class Connect {

    private static Connect connect = null;
    private String host = null;

    private Connect() {
    }

    public void setHost(String host) {
        this.host = host;
    }


    public String getHost() {
        return host;
    }


    public static Connect getInstance() {

        if (connect == null) {
            connect = new Connect();
        }

        return connect;
    }

    public void getJsContent(final ConnectCallback connectCallback) {

        if (checkHost()) {
            Runnable httpRunnable = new Runnable() {

                @Override
                public void run() {
                    HttpGet httpGet = new HttpGet(host);
                    AndroidHttpClient androidHttpClient = AndroidHttpClient.newInstance("Android");
                    try {
                        HttpResponse httpResponse = androidHttpClient.execute(httpGet);
                        if (httpResponse.getStatusLine().getStatusCode() == 200) {
                            String jsContent = showResponseResult(httpResponse);
                            androidHttpClient.close();
                            connectCallback.getJsContent(jsContent);
                        } else {
                            Log.e("error", "404 Not Found - jsContent not found");
                        }
                    } catch (IOException e) {
                        Log.e("error", e.getMessage());
                        androidHttpClient.close();
                        e.printStackTrace();
                    }
                }
            };

            Thread httpThread = new Thread(httpRunnable);
            httpThread.start();
        } else {
            Log.w("warning", "can't find host");
        }
    }

    private boolean checkHost() {

        return true;
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

    public static void destroy() {

        connect = null;
    }

    public interface ConnectCallback {

        void getJsContent(String jsContent);
    }
}
