package com.sannong.presentation.controller;

import com.sannong.infrastructure.persistance.entity.SMS;
import com.sannong.infrastructure.sms.SmsSender;
import com.sannong.infrastructure.util.PasswordGenerator;
import com.sannong.service.ISmsService;
import com.sun.tools.corba.se.idl.constExpr.Times;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by Bright Huang on 11/9/14.
 */
@Controller
public class SmsController {
    @Resource
    private ISmsService smsService;

    @RequestMapping(value = "updatesms", method = RequestMethod.GET)
    public @ResponseBody
    boolean updateSMS(HttpServletRequest request) {
        return smsService.updateSMS(request);
    }

    @RequestMapping(value = "getnewsms", method = RequestMethod.GET)
    public @ResponseBody
    List<SMS> getNewSMS() {return smsService.getNewSMS();}

    @RequestMapping(value = "regcode", method = RequestMethod.GET)
    public @ResponseBody boolean generateCode(HttpServletRequest request) {
        return smsService.generateCode(request);
    }

    @RequestMapping(value = "validateSMSCode")
    public @ResponseBody int  validateRegcode(HttpServletRequest request) {
        return smsService.validateSMSCode(request);
    }

    @RequestMapping(value = "sendValidationCode")
    public @ResponseBody String sendValidationCode(HttpServletRequest request) throws Exception {
        String validationCode = PasswordGenerator.generateValidationCode(4);
        String cellphone = request.getParameter("mobile");

        SmsSender smsSender = new SmsSender();
        String smsUrl = smsSender.generateSmsUrl(cellphone, validationCode);

        String result = smsSender.sendSms(smsUrl);

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        if (result != ""){
            SMS sms = new SMS();
            sms.setCellphone(cellphone);
            sms.setSmsValidationCode(validationCode);
            sms.setSmsContent(result);
            sms.setSendTime(timestamp);
            sms.setSmsStatus(0);
            smsService.addNewSms(sms);
        }
        return result;
    }



}
