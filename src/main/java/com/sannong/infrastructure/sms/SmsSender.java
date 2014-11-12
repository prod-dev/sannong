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

    public String getSmsLoginMessageUrl(String cellphone, String password) {
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

    public String getSmsValidationCodeUrl(String cellphone, String password) {
        String smsUrl = "http://www.6610086.net/jk.aspx?zh=agropine&mm=itlt7758258";
        String smsContent = "验证码是";
        String smsSignature = "【三农网】";

        String url = smsUrl + "&hm=" + cellphone + "&nr=" + smsContent
                + password
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

