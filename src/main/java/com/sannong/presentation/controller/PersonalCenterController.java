package com.sannong.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sannong.infrastructure.persistance.entity.SMS;
import com.sannong.infrastructure.persistance.repository.SmsRepository;
import com.sannong.infrastructure.sms.SmsSender;
import com.sannong.presentation.model.DTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PersonalCenterController {
    private static final String MY_APPLICATION_PAGE = "myapplication";
    private static final String MY_INFO_PAGE = "myinfo";
    private static final String MY_PASSWORD_PAGE = "mypassword";
    private static final String APPLICANTS_PAGE = "applicants";


    @RequestMapping(value = "myapplication", method = RequestMethod.GET)
    public ModelAndView myApplication(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("myapplication", new Object());

        return new ModelAndView(MY_APPLICATION_PAGE, models);
    }
    
    @Autowired
    private SmsRepository smsMapper;
    
    @RequestMapping(value = "regcode", method = RequestMethod.GET)
    public    @ResponseBody boolean  GenerateCode(HttpServletRequest request, HttpServletResponse response) {
    	String mobile=request.getParameter("mobile");
    	String regcode=SmsSender.generateCode(6);
    	if(mobile.length()<11)
    		return false;
    	else    	
    	{
    		SMS sms=new SMS();
    		
    		 sms.setCellphone(mobile);
    		 sms.setSmsValidationCode(regcode);
    		 sms.setSmsContent("welcome you register our website, your register code is"+regcode);
    		smsMapper.addNewSMS(sms);
    		return true;
    	}
    }
    

    @RequestMapping(value = "myinfo", method = RequestMethod.GET)
    public ModelAndView myInfo(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("myinfo", new Object());

        return new ModelAndView(MY_INFO_PAGE, models);
    }

    @RequestMapping(value = "mypassword", method = RequestMethod.GET)
    public ModelAndView myPassword(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("mypassword", new Object());

        return new ModelAndView(MY_PASSWORD_PAGE, models);
    }

    @RequestMapping(value = "applicants", method = RequestMethod.GET)
    public ModelAndView showList(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("applicants", new Object());
        return new ModelAndView(APPLICANTS_PAGE, models);
    }
}