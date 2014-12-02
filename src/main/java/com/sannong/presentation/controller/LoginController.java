package com.sannong.presentation.controller;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.sannong.domain.valuetypes.ResponseStatus;
import com.sannong.presentation.model.Response;
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
    private static final String FAQ_PAGE = "faq";
    private static final String USER_PERSONAL_CENTER_PAGE = "user-personal-center";
    private static final String PROJECT_LANDING_PAGE = "project-landing";


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
                ResponseStatus.LOGIN_FAILURE.getStatusCode(),
                ResponseStatus.LOGIN_FAILURE.getStatusDescription());
    }

}


