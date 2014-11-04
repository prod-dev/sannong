package com.sannong.service.impl;


import com.sannong.infrastructure.persistance.entity.SMS;
import com.sannong.infrastructure.persistance.repository.SmsRepository;
import com.sannong.infrastructure.sms.SmsSender;
import com.sannong.infrastructure.util.MyConfig;
import com.sannong.service.ISmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;


import javax.servlet.http.HttpServletRequest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by Bright Huang on 10/22/14.
 */
@Service
public class SmsServiceImpl implements ISmsService{
    @Autowired
    private SmsRepository smsRepository;

    private static String SESSIOIN_SMS_CODES="session_sms_codes";


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
  
    @SuppressWarnings("unchecked")
    public int validateSMSCode(HttpServletRequest request)
    {
    	String smsCode = request.getParameter("validationcode");

        if (StringUtils.isEmpty(smsCode)){
            return 0;
        }

    	if( request.getSession().getAttribute(SESSIOIN_SMS_CODES)==null) return 1;
		Map<Date,String>	 map=(HashMap<Date,String>)request.getSession().getAttribute(SESSIOIN_SMS_CODES);

		Iterator iterator = map.entrySet().iterator();  
		while (iterator.hasNext()) {  
			Map.Entry mapEntry = (Map.Entry) iterator.next();  
			Date dt=(Date)mapEntry.getKey();
			String savecode=mapEntry.getValue().toString();
			if(savecode.equals(smsCode))
			{
				Date dtNow=new Date(System.currentTimeMillis()); 
				Date dtSms=new Date(dt.getTime());
				@SuppressWarnings("deprecation")
				int diffInHours=dtNow.getHours()-dt.getHours();
				@SuppressWarnings("deprecation")
				int diffInMinuts=dtNow.getMinutes()-dt.getMinutes();
				if(diffInHours==0&&diffInMinuts<5)
					return 2;
				else 
					return 1;				
			}			
		}     	
    	 return 0;
    }

    @SuppressWarnings("unchecked")
	public boolean generateCode(HttpServletRequest request) {
    	String mobile=request.getParameter("mobile").toString();
    	String smstype=request.getParameter("smstype").toString();
    	String regcode=SmsSender.generateCode(4);
    	Map<Date,String>  map= new HashMap<Date,String>();
    	if(mobile.length()<11)
    		return false;
    	else    	
    	{
    		SMS sms=new SMS();    		
    		 sms.setCellphone(mobile);
    		 sms.setSmsValidationCode(regcode); 
    		 Date ts=new Date(System.currentTimeMillis()); 
    		 if( request.getSession().getAttribute(MyConfig.SESSIOIN_SMS_CODES)!=null)
    		 {
    			 map=(HashMap<Date,String>)request.getSession().getAttribute(MyConfig.SESSIOIN_SMS_CODES);
    		 }
    		 map.put(ts,regcode);    			 
    		 request.getSession().setAttribute(MyConfig.SESSIOIN_SMS_CODES, map);   
    		 String content="验证码为:"+regcode;
    		 if(smstype.equals("0"))
    			 content=MyConfig.getConfig("sms-welcome").replace("{0}", regcode); 
    		 if(smstype.equals("1"))
    			 content=MyConfig.getConfig("sms-changeMobile").replace("{0}", regcode); 
    			 //content="改变你在三农网上的注册手机号码，验证码为:"+regcode;   	
    		 if(smstype.equals("2"))
    			 content=MyConfig.getConfig("sms-newPassword").replace("{0}", regcode);
    			//content="你在三农网上新密码为:"+regcode; 
    		 sms.setSmsContent(content);
    		 smsRepository.addNewSMS(sms);
    		return true;
    	}
    }
}
