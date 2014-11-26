package com.sannong.presentation.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
public class HomeController {

    private static final String FAQ_PAGE = "faq";
    private static final String PROJECT_LANDING_PAGE = "project-landing";


	@RequestMapping(value = "home", method = RequestMethod.GET)
	public ModelAndView show(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView(PROJECT_LANDING_PAGE);
	}

    @RequestMapping(value = "faq", method = RequestMethod.GET)
    public ModelAndView faq(HttpServletRequest request, HttpServletResponse response) {
        return new ModelAndView(FAQ_PAGE);
    }

    @RequestMapping(value = "project-landing", method = RequestMethod.GET)
    public ModelAndView showLandingPage(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("project-landing", new Object());
        return new ModelAndView(PROJECT_LANDING_PAGE, models);
    }

}
