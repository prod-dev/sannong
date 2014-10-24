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


    public boolean updateSMS(HttpServletRequest request) {
        SMS sms = new SMS();
        String id = request.getParameter("smsid");      
        if (id.length() < 0) return false;
        long smsId = new Integer(id);
        Date now = new Date();
     	String time = "";     	
        try {
        	time=request.getParameter("sendtime").toString();
            now = (new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")).parse(time);
        } catch (Exception e) {
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
    	String mobile=request.getParameter("mobile").toString();
    	String smstype=request.getParameter("smstype").toString();
    	String regcode=SmsSender.generateCode(6);
    	if(mobile.length()<11)
    		return false;
    	else    	
    	{
    		SMS sms=new SMS();    		
    		 sms.setCellphone(mobile);
    		 sms.setSmsValidationCode(regcode);
    		 request.getSession().setAttribute("regcode", regcode);   
    		 String content="验证码为:"+regcode;
    		 if(smstype.equals("1"))
    			 content="if you want to change your mobile, confirm code is:"+regcode;   	
    			 //content="改变你在三农网上的注册手机号码，验证码为:"+regcode;   	
    		 if(smstype.equals("2"))
    			 content="your new sannong password is :"+regcode+",confirm to change it.";
    			//content="你在三农网上新密码为:"+regcode; 
    		 sms.setSmsContent(content);
    		 smsRepository.addNewSMS(sms);
    		return true;
    	}
    }
}
