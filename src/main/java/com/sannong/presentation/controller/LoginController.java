package com.sannong.presentation.controller;


import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
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
	
    private static final String LOGIN_PAGE = "login";
    private static final String USER_PERSONAL_CENTER_PAGE = "user-personal-center";

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
    Map<String, Object> handleLoginSuccessOnPost(HttpServletRequest request) {
        return handleLoginSuccess(request);
    }

    @RequestMapping(value = "login-success", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, Object> handleLoginSuccess(HttpServletRequest request) {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("redirect", USER_PERSONAL_CENTER_PAGE);
        models.put("authentication", true);
        return models;
    }

    @RequestMapping(value = "login-failure", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, Object> handleLoginFailureOnPost(HttpServletRequest request) {
        return handleLoginFailure(request);
    }

    @RequestMapping(value = "login-failure", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, Object> handleLoginFailure(HttpServletRequest request) {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("authentication", false);
        return models;
    }

}


