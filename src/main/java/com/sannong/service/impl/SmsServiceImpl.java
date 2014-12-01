package com.sannong.service.impl;


import com.sannong.domain.factories.SmsUrlFactory;
import com.sannong.domain.entities.SMS;
import com.sannong.domain.repositories.SmsRepository;
import com.sannong.infrastructure.sms.SmsSender;
import com.sannong.infrastructure.util.AppConfig;
import com.sannong.infrastructure.util.PasswordGenerator;
import com.sannong.service.ISmsService;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.*;

/**
 * Created by Bright Huang on 10/22/14.
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class SmsServiceImpl implements ISmsService {
    private static final Logger logger = Logger.getLogger(SmsServiceImpl.class);

    @Autowired
    private SmsRepository smsRepository;
    @Autowired
    private AppConfig appConfig;
    @Autowired
    private SmsUrlFactory smsUrlFactory;

    public boolean updateSMS(HttpServletRequest request) {
        SMS sms = new SMS();
        String id = request.getParameter("smsid");
        //String time = request.getParameter("sendtime");
        Timestamp time = new Timestamp(System.currentTimeMillis());
        if (id.length() < 0) {
            return false;
        }
        long smsId = new Integer(id);
        /*
        Date now = new Date();
        try {
            now = (new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")).parse(time);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            time = (new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")).format(now);
        }
        */
        sms.setSmsId(smsId);
        sms.setSendTime(time);
        sms.setSmsStatus(1);
        smsRepository.updateSMS(sms);
        return true;
    }

    public List<SMS> getNewSMS() {

        return smsRepository.getNewSMS();
    }

    public int validateSMSCode(HttpServletRequest request) {
        String smsCode = request.getParameter("validationCode");

        if (StringUtils.isBlank(smsCode)) {
            return 0;
        }

        if (request.getSession().getAttribute(appConfig.getSessionSmsCodes()) == null) {
            return 1;
        }

        Map<Date, String> map = (HashMap<Date, String>) request.getSession().getAttribute(appConfig.getSessionSmsCodes());

        Iterator iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry mapEntry = (Map.Entry) iterator.next();
            Date dt = (Date) mapEntry.getKey();
            String savecode = mapEntry.getValue().toString();
            if (savecode.equals(smsCode)) {
                Date dtNow = new Date(System.currentTimeMillis());
                Date dtSms = new Date(dt.getTime());

                @SuppressWarnings("deprecation")
                int diffInHours = dtNow.getHours() - dt.getHours();

                @SuppressWarnings("deprecation")
                int diffInMinuts = dtNow.getMinutes() - dt.getMinutes();
                if (diffInHours == 0 && diffInMinuts < 5) {
                    return 2;
                } else {
                    return 1;
                }
            }
        }
        return 0;
    }

    @Override
    public List<SMS> getSmsByCellphoneAndValidationCode(String cellphone, String validationCode) {
        SMS sms = new SMS();
        sms.setCellphone(cellphone);
        sms.setSmsValidationCode(validationCode);
        return smsRepository.getSmsByCellphoneAndValidationCode(sms);
    }

    public boolean generateCode(HttpServletRequest request) {

        String mobile = request.getParameter("mobile").toString();
        String smstype = request.getParameter("smstype").toString();


        String regcode = PasswordGenerator.generateValidationCode(4);

        Map<Date, String> map = new HashMap<Date, String>();
        if (mobile.length() < 11)
            return false;
        else {
            SMS sms = new SMS();

            sms.setCellphone(mobile);
            sms.setSmsValidationCode(regcode);

            Date ts = new Date(System.currentTimeMillis());
            if (request.getSession().getAttribute(appConfig.getSessionSmsCodes()) != null) {
                map = (HashMap<Date, String>) request.getSession().getAttribute(appConfig.getSessionSmsCodes());
            }
            map.put(ts, regcode);

            request.getSession().setAttribute(appConfig.getSessionSmsCodes(), map);

            String content = "验证码为:" + regcode;
            if (smstype.equals("0")) {
                content = appConfig.getProperty("sms-welcome").replace("{0}", regcode);
            }
            if (smstype.equals("1")) {
                content = appConfig.getProperty("sms-changeMobile").replace("{0}", regcode);
                //content="改变你在三农网上的注册手机号码，验证码为:"+regcode;
            }
            if (smstype.equals("2")) {
                content = appConfig.getProperty("sms-newPassword").replace("{0}", regcode);
                //content="你在三农网上新密码为:"+regcode;
            }

            sms.setSmsContent(content);
            sms.setSendTime(new Timestamp(System.currentTimeMillis()));
            smsRepository.addNewSMS(sms);

            return true;
        }
    }


    @Override
    public String sendValidationCode(String cellphone, String validationCode) {
        String result = "";
        try {
            String smsUrl = smsUrlFactory.generateValidationCodeSmsUrl(cellphone, validationCode);
            SmsSender smsSender = new SmsSender();
            result = smsSender.sendSms(smsUrl);
            addSmsRecord(cellphone, validationCode, result);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return result;
    }

    @Override
    public String sendLoginMessage(String cellphone, String password) {
        String result = "";
        try {
            String smsUrl = smsUrlFactory.generateLoginMessageSmsUrl(cellphone, password);
            SmsSender smsSender = new SmsSender();
            result = smsSender.sendSms(smsUrl);
            addSmsRecord(cellphone, password, result);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return result;
    }

    @Override
    public String sendNewPasswordMessage(String cellphone, String password) {
        String result = "";
        try {
            String url = smsUrlFactory.generateNewPasswordSmsUrl(cellphone, password);
            SmsSender smsSender = new SmsSender();
            result = smsSender.sendSms(url);
            addSmsRecord(cellphone, password, result);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return result;
    }

    private void addSmsRecord(String cellphone, String password, String result) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        if (StringUtils.isNotBlank(result)) {
            SMS sms = new SMS();
            sms.setCellphone(cellphone);
            sms.setSmsValidationCode(password);
            sms.setSmsContent(result);
            sms.setSendTime(timestamp);
            sms.setSmsStatus(0);
            smsRepository.addNewSMS(sms);
        }
    }
}
