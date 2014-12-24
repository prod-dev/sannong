package com.sannong.presentation.controller;


import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.sannong.domain.entities.User;
import com.sannong.domain.valuetypes.ResponseStatus;
import com.sannong.infrastructure.util.PasswordGenerator;
import com.sannong.presentation.model.Response;
import com.sannong.service.ISmsService;
import com.sannong.service.IUserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by Bright Huang on 10/14/14.
 */
@Controller
public class LoginController {
	private static final Logger logger = Logger.getLogger(LoginController.class);
    private static final String LOGIN_PAGE = "login";
    private static final String FAQ_PAGE = "faq";
    private static final String USER_PERSONAL_CENTER_PAGE = "user-personal-center";
    private static final String PROJECT_LANDING_PAGE = "project-landing";

    @Resource
    private IUserService userService;
    @Resource
    private ISmsService smsService;


    @RequestMapping(value = "home", method = RequestMethod.GET)
    public ModelAndView show() {
        return new ModelAndView(PROJECT_LANDING_PAGE);
    }

    @RequestMapping(value = "faq", method = RequestMethod.GET)
    public ModelAndView faq() {
        return new ModelAndView(FAQ_PAGE);
    }

    @RequestMapping(value = "project-landing", method = RequestMethod.GET)
    public ModelAndView showLandingPage() {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("project-landing", new Object());
        return new ModelAndView(PROJECT_LANDING_PAGE, models);
    }

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ModelAndView showLoginPage() {
        return new ModelAndView(LOGIN_PAGE);
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ModelAndView login() {
        return showLoginPage();
    }

    @RequestMapping(value = "access-denied", method = RequestMethod.GET)
    public ModelAndView handleAccessDenied() {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("access-denied", "access-denied");
        return new ModelAndView(LOGIN_PAGE, models);
    }

    @RequestMapping(value = "login-success", method = RequestMethod.POST)
    public @ResponseBody
    Response handleLoginSuccessOnPost(HttpServletRequest request) {
        return handleLoginSuccess(request);
    }

    @RequestMapping(value = "login-success", method = RequestMethod.GET)
    public @ResponseBody
    Response handleLoginSuccess(HttpServletRequest request) {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("redirect", USER_PERSONAL_CENTER_PAGE);
        return new Response(
                ResponseStatus.LOGIN_SUCCESS.getStatusCode(),
                ResponseStatus.LOGIN_SUCCESS.getStatusDescription(),
                models);
    }

    @RequestMapping(value = "login-failure", method = RequestMethod.POST)
    public @ResponseBody
    Response handleLoginFailureOnPost(HttpServletRequest request) {
        return handleLoginFailure(request);
    }

    @RequestMapping(value = "login-failure", method = RequestMethod.GET)
    public @ResponseBody
    Response handleLoginFailure(HttpServletRequest request) {
        return new Response(
                ResponseStatus.USERNAME_OR_PASSWORD_ERROR.getStatusCode(),
                ResponseStatus.USERNAME_OR_PASSWORD_ERROR.getStatusDescription());
    }

    /**
     * From forgot-password page, user try to get a new password to login.
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "forgot-password/sendNewPasswordMessage", method = RequestMethod.POST)
    public @ResponseBody
    Response sendNewPasswordMessage(HttpServletRequest request) throws Exception{
        String cellphone = request.getParameter("cellphone");
        String realName = request.getParameter("realName");

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("cellphone", cellphone);
        paramMap.put("realName", realName);

        List<User> users = userService.getUserByCondition(paramMap);
        if (users.isEmpty()) {
            return new Response(
                    ResponseStatus.NAME_OR_CELLPHONE_NOT_FOUND.getStatusCode(),
                    ResponseStatus.NAME_OR_CELLPHONE_NOT_FOUND.getStatusDescription());
        } else {
            User user = users.get(0);
            if (!(user.getCellphone().equals(cellphone) && user.getRealName().equals(realName))) {
                return new Response(
                        ResponseStatus.NAME_OR_CELLPHONE_MISMATCH.getStatusCode(),
                        ResponseStatus.NAME_OR_CELLPHONE_MISMATCH.getStatusDescription());
            }
            String password = PasswordGenerator.generatePassword(6);
            String smsResponse = smsService.sendNewPasswordMessage(cellphone, password);
            if (StringUtils.isNotBlank(smsResponse)){
                user.setPassword(PasswordGenerator.encryptPassword(password, user.getUserName()));
                user.setUpdateTime(new Timestamp(System.currentTimeMillis()));
                userService.updatePassword(user);
                return new Response(
                        ResponseStatus.NEW_PASSWORD_WAS_SENT.getStatusCode(),
                        ResponseStatus.NEW_PASSWORD_WAS_SENT.getStatusDescription());
            } else {
                return new Response(
                        ResponseStatus.SMS_SEND_NEW_PASSWORD_FAILURE.getStatusCode(),
                        ResponseStatus.SMS_SEND_NEW_PASSWORD_FAILURE.getStatusDescription());
            }
        }
    }

    @RequestMapping(value = "login/realName", method = RequestMethod.POST)
    public @ResponseBody Response getRealName(){
        Map<String, Object> models = new HashMap<String, Object>();
        Map<String, Object> queryParamMap = new HashMap<String, Object>();

        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                    .getAuthentication().getPrincipal();

            String userName = userDetails.getUsername();
            String realName = "";
            queryParamMap.put("userName", userName);
            List<User> users = userService.getUserByCondition(queryParamMap);
            if (!users.isEmpty()){
                User user = users.get(0);
                realName = user.getRealName();
            }

            models.put("realName", realName);
        }catch(Exception ex){
            logger.error(ex.getMessage());
            return new Response(ResponseStatus.FAILURE.getStatusCode(),
                    ResponseStatus.FAILURE.getStatusDescription());
        }

        return new Response(ResponseStatus.SUCCESS.getStatusCode(),
                            ResponseStatus.SUCCESS.getStatusDescription(),
                            models);
    }

}


