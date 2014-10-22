package com.sannong.service.impl;

import com.sannong.infrastructure.persistance.entity.SMS;
import com.sannong.infrastructure.persistance.repository.SmsRepository;
import com.sannong.infrastructure.sms.SmsSender;
import com.sannong.service.ISmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Bright Huang on 10/22/14.
 */
@Service
public class SmsServiceImpl implements ISmsService{
    @Autowired
    private SmsRepository smsRepository;

    @Override
    public boolean updateSMS(HttpServletRequest request) {
        SMS sms = new SMS();
        String id = request.getParameter("smsid");
        String time = request.getParameter("sendtime");
        if (id.length() < 0) return false;
        long smsId = new Integer(id);
        Date now = new Date();
        try {
            now = (new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")).parse(time);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            time = (new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")).format(now);
        }
        sms.setSmsId(smsId);
        sms.setSendTime(time);
        sms.setSmsStatus(1);
        smsRepository.updateSMS(sms);
        return true;
    }

    public List<SMS> getNewSMS() {
        return smsRepository.getNewSMS();
    }

    public boolean generateCode(HttpServletRequest request) {
        String mobile = request.getParameter("mobile");
        String regcode = SmsSender.generateCode(6);
        if (mobile.length() < 11)
            return false;
        else {
            SMS sms = new SMS();
            sms.setCellphone(mobile);
            sms.setSmsValidationCode(regcode);
            sms.setSmsContent("welcome you register our website, your register code is" + regcode);
            smsRepository.addNewSMS(sms);
            return true;
        }
    }
}
