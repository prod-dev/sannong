package com.sannong.presentation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.Map;

@Controller
public class HomeController {

	private static final String HOME_PAGE = "home";
    private static final String FAQ_PAGE = "faq";
    private static final String PAGE_HOME = "/pages/home";
    private static final String PAGE_PROJECT_LANDING = "/pages/project-landing";
    private static final String PAGE_FAQ = "/pages/faq";

	@RequestMapping(value = "home", method = RequestMethod.GET)
	public ModelAndView show(HttpServletRequest request, HttpServletResponse response) {

		Map<String, Object> models = new HashMap<String, Object>();
		models.put("home", new Object());
		return new ModelAndView(HOME_PAGE, models);
	}

    /*
    @RequestMapping(value = "faq", method = RequestMethod.GET)
    public ModelAndView faq(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("faq", new Object());
        return new ModelAndView(FAQ_PAGE, models);
    }
    */

    @RequestMapping(value = "homepage", method = RequestMethod.GET)
    public ModelAndView showHomePage(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("hoe", new Object());
        return new ModelAndView(PAGE_HOME, models);
    }

    @RequestMapping(value = "project-landing", method = RequestMethod.GET)
    public ModelAndView showLandingPage(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("project-landing", new Object());
        return new ModelAndView(PAGE_PROJECT_LANDING, models);
    }

    @RequestMapping(value = "faq", method = RequestMethod.GET)
    public ModelAndView showFaqPage(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("faq", new Object());
        return new ModelAndView(PAGE_FAQ, models);
    }
}
