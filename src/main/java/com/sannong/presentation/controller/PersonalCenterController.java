package com.sannong.presentation.controller;

import com.sannong.infrastructure.persistance.entity.SMS;
import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.infrastructure.persistance.repository.SmsRepository;
import com.sannong.infrastructure.persistance.repository.UserRepository;
import com.sannong.infrastructure.sms.SmsSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PersonalCenterController {
    private static final String MY_APPLICATION_PAGE = "myapplication";
    private static final String MY_INFO_PAGE = "myinfo";
    private static final String MY_PASSWORD_PAGE = "mypassword";
    private static final String APPLICANTS_PAGE = "applicants";

    @Autowired
    private SmsRepository smsMapper;
    @Autowired
    private UserRepository userMapper;

    @RequestMapping(value = "myapplication", method = RequestMethod.GET)
    public ModelAndView myApplication(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("myapplication", new Object());

        return new ModelAndView(MY_APPLICATION_PAGE, models);
    }

    @RequestMapping(value = "updatesms", method = RequestMethod.GET)
    public @ResponseBody boolean updateSMS(HttpServletRequest request, HttpServletResponse response) {
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
        smsMapper.updateSMS(sms);
        return true;
    }

    @RequestMapping(value = "getnewsms", method = RequestMethod.GET)
    public @ResponseBody List<SMS> getNewSMS(HttpServletRequest request, HttpServletResponse response) {
        return smsMapper.getNewSMS();
    }

    @RequestMapping(value = "regcode", method = RequestMethod.GET)
    public @ResponseBody boolean GenerateCode(HttpServletRequest request, HttpServletResponse response) {
        String mobile = request.getParameter("mobile");
        String regcode = SmsSender.generateCode(6);
        if (mobile.length() < 11)
            return false;
        else {
            SMS sms = new SMS();
            sms.setCellphone(mobile);
            sms.setSmsValidationCode(regcode);
            sms.setSmsContent("welcome you register our website, your register code is" + regcode);
            smsMapper.addNewSMS(sms);
            return true;
        }
    }


    @RequestMapping(value = "myinfo", method = RequestMethod.GET)
    public ModelAndView myInfo(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();

        String username;

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        User usr = new User();
        Map<String, String> map = new HashMap<String, String>();
        map.put("username", username);
        map.put("cellphone", username);

        List<User> users = userMapper.getUserByUserNameOrCellphone(map);

        models.put("myinfo", users.get(0));

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