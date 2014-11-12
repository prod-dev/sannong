package com.sannong.infrastructure.sms;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import java.util.Random;

public class SmsSender {
    private static final Logger logger = Logger.getLogger(SmsSender.class);

    public static String generateCode(int length) {
        String chars = "0123456789";
        Random rnd = new Random();

        if (length == 0) {
            return "";
        }
        char[] buf = new char[length];
        for (int i = 0; i < buf.length; i++) {
            buf[i] = chars.charAt(rnd.nextInt(chars.length()));
        }
        return new String(buf);
    	//return "1234";
    }

    public String generateSmsUrl(String cellphone, String password) throws Exception{
        String smsUrl = "http://www.6610086.net/jk.aspx?zh=agropine&mm=itlt7758258";
        String smsContent = "谢谢你联系我们，我们的工作人员会尽快和您取得联系。你可以登录我们的网站查询查询申报审批的进度和状态。";
        String smsContentUsername = "用户名是你的手机号码";
        String smsContentPassword = "密码是";
        String smsSignature = "【三农网】";

        String url = smsUrl + "&hm=" + cellphone + "&nr=" + smsContent
                + smsContentUsername + cellphone
                + smsContentPassword + password
                + smsSignature
                + "&sms_type=45";

        return url;
    }


    public String sendSms(String smsUrl) {
        String result = null;
        CloseableHttpClient httpClient = null;
        CloseableHttpResponse httpResponse = null;
        try {
            httpClient = HttpClients.createDefault();
            HttpPost httpPost = new HttpPost(smsUrl);
            //HttpGet httpGet = new HttpGet(smsUrl);
            httpResponse = httpClient.execute(httpPost);
            HttpEntity httpEntity = httpResponse.getEntity();
            if (httpEntity != null) {
                result = EntityUtils.toString(httpEntity);
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        } finally {
            try{
                if (httpResponse != null) {
                    httpResponse.close();
                }
                if (httpClient != null){
                    httpClient.close();
                }
            }catch(Exception ex)
            {
                logger.error(ex.getMessage());
            }
        }
        return result;
    }
}

