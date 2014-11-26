package com.sannong.domain.factories;


import org.springframework.stereotype.Component;

/**
 * Created by Bright Huang on 11/13/14.
 */
@Component
public class SmsUrlFactory {
    private static final String SMS_BASE_URL = "http://www.6610086.net/jk.aspx?zh=agropine&mm=itlt7758258";
    private static final String SMS_SIGNATURE = "【三农网】";
    private static final String SMS_TYPE = "&sms_type=45";

    public String generateLoginMessageSmsUrl(String cellphone, String password) {
        String smsContent = "谢谢你联系我们，我们的工作人员会尽快和您取得联系。你可以登录我们的网站查询查询申报审批的进度和状态。";
        String smsContentUsername = "用户名是你的手机号码";
        String smsContentPassword = "密码是";
        String url = SMS_BASE_URL + "&hm=" + cellphone + "&nr=" + smsContent
                + smsContentUsername + cellphone
                + smsContentPassword + password
                + SMS_SIGNATURE
                + SMS_TYPE;
        return url;
    }

    public String generateValidationCodeSmsUrl(String cellphone, String password) {
        String smsContent = "您好，您的验证码是";
        String url = SMS_BASE_URL + "&hm=" + cellphone + "&nr=" + smsContent
                + password
                + SMS_SIGNATURE
                + SMS_TYPE;
        return url;
    }

    public String generateNewPasswordSmsUrl(String cellphone, String password){
        String smsContent = "您好，您的新密码是";
        String url = SMS_BASE_URL + "&hm=" + cellphone + "&nr=" + smsContent
                + password
                + SMS_SIGNATURE
                + SMS_TYPE;
        return url;
    }

}
