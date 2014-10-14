package com.sannong.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Bright Huang on 10/14/14.
 */
@Controller
public class AssessmentController {
    private static final String ASSESSMENT_PAGE = "assessment";
    private static final String ASSESSMENT_LIST_PAGE = "assessment-list";


    @RequestMapping(value = "assessment", method = RequestMethod.GET)
    public ModelAndView show(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("assessment", new Object());
        return new ModelAndView(ASSESSMENT_PAGE, models);
    }

    @RequestMapping(value = "assessment-list", method = RequestMethod.GET)
    public ModelAndView showList(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("assessment-list", new Object());
        return new ModelAndView(ASSESSMENT_LIST_PAGE, models);
    }
}
