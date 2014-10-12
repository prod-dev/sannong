package com.sannong.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Controller
public class MySannongController {
    private static final String MY_ORDERS_PAGE = "myorders";
    private static final String MY_INFO_PAGE = "myinfo";


    @RequestMapping(value = "/myorders", method = RequestMethod.GET)
    public ModelAndView myOrders(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("myorders", new Object());

        return new ModelAndView(MY_ORDERS_PAGE, models);
    }

    @RequestMapping(value = "/myinfo", method = RequestMethod.GET)
    public ModelAndView myInfo(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("myinfo", new Object());

        return new ModelAndView(MY_INFO_PAGE, models);
    }
}