package com.sannong.presentation.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

	private static final String HOME_PAGE = "home";
    private static final String FAQ_PAGE = "faq";
    private static final String LANDING_PAGE = "/pages/home";

	@RequestMapping(value = "home", method = RequestMethod.GET)
	public ModelAndView show(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView(HOME_PAGE);
	}

    @RequestMapping(value = "faq", method = RequestMethod.GET)
    public ModelAndView faq(HttpServletRequest request, HttpServletResponse response) {
        return new ModelAndView(FAQ_PAGE);
    }

    @RequestMapping(value = "landing", method = RequestMethod.GET)
    public ModelAndView showLandingPage(HttpServletRequest request, HttpServletResponse response) {
        return new ModelAndView(LANDING_PAGE);
    }
}
