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
    private static final String FORGOT_PASSWORD_PAGE = "forgotpassword";
    private static final String MY_APPLICATION_PAGE = "myapplication";
    private static final String APPLICANTS_PAGE = "applicants";

    private static final String USER_MANAGEMENT_PAGE = "user-management";
    private static final String USER_APPLICATION_FORM_PAGE = "user-application-form";


    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ModelAndView showLoginPage() {
        return new ModelAndView(LOGIN_PAGE);
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ModelAndView login() {
        return showLoginPage();
    }

    @RequestMapping(value = "forgotpassword", method = RequestMethod.GET)
    public ModelAndView forgotPassword() {
        return new ModelAndView(FORGOT_PASSWORD_PAGE);
    }

    @RequestMapping(value = "authentication-success", method = RequestMethod.GET)
    public ModelAndView handleAuthenticationSuccess() {

        Collection<SimpleGrantedAuthority> authorities =
                (Collection<SimpleGrantedAuthority>)
                        SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        for (GrantedAuthority authority : authorities) {
            String role = authority.getAuthority();
            if (role.equals("ROLE_USER")) {
                return new ModelAndView("redirect:" + MY_APPLICATION_PAGE);
            } else if (role.equals("ROLE_ADMIN")) {
                return new ModelAndView("redirect:" + APPLICANTS_PAGE);
            }
        }
        return showLoginPage();
    }

    @RequestMapping(value = "authentication-failure", method = RequestMethod.POST)
    public ModelAndView handleAuthenticationFailureOnPost(HttpServletRequest request) {
        return handleAuthenticationFailure(request);
    }

    @RequestMapping(value = "authentication-failure", method = RequestMethod.GET)
    public ModelAndView handleAuthenticationFailure(HttpServletRequest request) {
        String realName = request.getParameter("realName");

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("authentication", "false");

        if (realName != null) {
            return new ModelAndView(FORGOT_PASSWORD_PAGE, models);

        } else {
            return new ModelAndView(LOGIN_PAGE, models);
        }
    }

    @RequestMapping(value = "access-denied", method = RequestMethod.GET)
    public ModelAndView handleAccessDenied() {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("access-denied", "access-denied");
        return new ModelAndView(LOGIN_PAGE, models);
    }

    @RequestMapping(value = "login-success", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, Object> handleLoginSuccess(HttpServletRequest request) {
        Map<String, Object> models = new HashMap<String, Object>();

        Collection<SimpleGrantedAuthority> authorities =
                (Collection<SimpleGrantedAuthority>)
                        SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        for (GrantedAuthority authority : authorities) {
            String role = authority.getAuthority();
            if (role.equals("ROLE_USER")) {
                models.put("redirect", USER_APPLICATION_FORM_PAGE);
            } else if (role.equals("ROLE_ADMIN")) {
                models.put("redirect", USER_MANAGEMENT_PAGE);
            }
        }
        models.put("authentication", true);
        return models;
    }

    @RequestMapping(value = "login-failure", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, Object> handleLoginFailure(HttpServletRequest request) {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("authentication", false);
        return models;
    }

}


