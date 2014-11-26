package com.sannong.infrastructure.sms;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

public class SmsSender {
    private static final Logger logger = Logger.getLogger(SmsSender.class);

    public String sendSms(String smsUrl) {
        String result = null;
        CloseableHttpClient httpClient = null;
        CloseableHttpResponse httpResponse = null;
        try {
            httpClient = HttpClients.createDefault();
            //HttpGet httpGet = new HttpGet(smsUrl);
            HttpPost httpPost = new HttpPost(smsUrl);
            httpResponse = httpClient.execute(httpPost);
            HttpEntity httpEntity = httpResponse.getEntity();
            if (httpEntity != null) {
                result = EntityUtils.toString(httpEntity);
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        } finally {
            try {
                if (httpResponse != null) {
                    httpResponse.close();
                }
                if (httpClient != null) {
                    httpClient.close();
                }
            } catch (Exception ex) {
                logger.error(ex.getMessage());
            }
        }
        return result;
    }
}

