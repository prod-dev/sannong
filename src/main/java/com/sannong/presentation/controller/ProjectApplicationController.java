package com.sannong.presentation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Bright Huang on 10/14/14.
 */
@Controller
public class ProjectApplicationController {

    private static final String QUESTIONNAIRE_PAGE = "questionnaire";
    private static final String COMPLETION_PAGE = "completion";


    @RequestMapping(value = "questionnaire", method = RequestMethod.GET)
    public ModelAndView show(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("questionnaire", new Object());
        return new ModelAndView(QUESTIONNAIRE_PAGE, models);
    }

    @RequestMapping(value = "apply", method = RequestMethod.POST)
    public ModelAndView apply(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("completion", new Object());
        return new ModelAndView(COMPLETION_PAGE, models);
    }



}
