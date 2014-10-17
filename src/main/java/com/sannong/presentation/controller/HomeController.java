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

	@RequestMapping(value = "home", method = RequestMethod.GET)
	public ModelAndView show(HttpServletRequest request, HttpServletResponse response) {

		Map<String, Object> models = new HashMap<String, Object>();
		models.put("home", new Object());
		return new ModelAndView(HOME_PAGE, models);
	}

    @RequestMapping(value = "faq", method = RequestMethod.GET)
    public ModelAndView faq(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("faq", new Object());
        return new ModelAndView(FAQ_PAGE, models);
    }
}
