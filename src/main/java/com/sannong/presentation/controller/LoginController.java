package com.sannong.presentation.controller;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Bright Huang on 10/14/14.
 */
@Controller
public class LoginController {
    private static final String LOGIN_PAGE = "login";
    private static final String FORGOT_PASSWORD_PAGE = "forgotpassword";
    private static final String MY_APPLICATION_PAGE = "myapplication";
    private static final String APPLICANTS_PAGE = "applicants";

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ModelAndView showLoginPage() {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("login", new Object());
        return new ModelAndView(LOGIN_PAGE, models);
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ModelAndView login() {
        return showLoginPage();
    }

    @RequestMapping(value = "forgotpassword", method = RequestMethod.GET)
    public ModelAndView forgotPassword() {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("forgotpassword", new Object());
        return new ModelAndView(FORGOT_PASSWORD_PAGE, models);
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

    @RequestMapping(value = "authentication-failure", method = RequestMethod.GET)
    public ModelAndView handleAuthenticationFailure(HttpServletRequest request) {
        String realName = request.getParameter("realName");

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("authentication", "authentication-failure");

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

}


