package com.sannong.presentation.controller;

import com.sannong.domain.sms.SmsUrlGenerator;
import com.sannong.infrastructure.persistance.entity.SMS;
import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.infrastructure.util.PasswordGenerator;
import com.sannong.service.ISmsService;
import com.sannong.service.IUserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Bright Huang on 11/9/14.
 */
@Controller
public class SmsController {
    @Resource
    private ISmsService smsService;
    @Resource
    private IUserService userService;

    @RequestMapping(value = "updatesms", method = RequestMethod.GET)
    public @ResponseBody boolean updateSMS(HttpServletRequest request) {
        return smsService.updateSMS(request);
    }

    @RequestMapping(value = "getnewsms", method = RequestMethod.GET)
    public @ResponseBody List<SMS> getNewSMS() {
        return smsService.getNewSMS();
    }

    @RequestMapping(value = "regcode", method = RequestMethod.GET)
    public @ResponseBody boolean generateCode(HttpServletRequest request) {
        return smsService.generateCode(request);
    }

    @RequestMapping(value = "validateSMSCode")
    public @ResponseBody int validateRegcode(HttpServletRequest request) {
        return smsService.validateSMSCode(request);
    }

    @RequestMapping(value = "sendValidationCode")
    public @ResponseBody String sendValidationCode(HttpServletRequest request) throws Exception {
        return smsService.sendValidationCode(request);
    }

    @RequestMapping(value = "sendLoginMessage")
    public @ResponseBody String sendLoginMessage(HttpServletRequest request) throws Exception {
        return smsService.sendLoginMessage(request);
    }

    @RequestMapping(value = "sendNewPasswordMessage", method = RequestMethod.POST)
    public @ResponseBody boolean sendNewPasswordMessage(HttpServletRequest request) throws Exception{
        String cellphone = request.getParameter("cellphone");
        String realName = request.getParameter("realName");

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("cellphone", cellphone);
        paramMap.put("realName", realName);

        List<User> users = userService.getUserByCondition(paramMap);
        if (users.isEmpty()){
            return false;
        } else {
            String password = PasswordGenerator.generatePassword(6);
            String encryptedPassword = PasswordGenerator.encryptPassword(password, cellphone);

            String url = new SmsUrlGenerator().generateNewPasswordSmsUrl(cellphone, password);
            String smsResponse = smsService.sendNewPasswordMessage(url);
            if (smsResponse != ""){
                User user = users.get(0);
                user.setPassword(encryptedPassword);
                return userService.updateUser(user);
            } else {
                return false;
            }
        }
    }

}
