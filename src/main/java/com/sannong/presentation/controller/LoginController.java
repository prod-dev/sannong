package com.sannong.presentation.controller;


import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sannong.presentation.model.DTO;
import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.service.IUserService;

/**
 * Created by Bright Huang on 10/14/14.
 */
@Controller
public class LoginController {
	
	@Resource
    private IUserService userService;
	
    private static final String SIGNIN_PAGE = "signin";
    private static final String FORGOT_PASSWORD_PAGE = "forgotpassword";
    
    @RequestMapping(value = "signin", method = RequestMethod.GET)
    public ModelAndView show(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("signin", new Object());
        return new ModelAndView(SIGNIN_PAGE, models);
    }

    @RequestMapping(value = "forgotpassword", method = RequestMethod.GET)
    public ModelAndView forgotPassword(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("forgotpassword", new Object());
        return new ModelAndView(FORGOT_PASSWORD_PAGE, models);
    }
    
    @RequestMapping(value = "login", method = RequestMethod.POST,
    		headers = {"content-type=application/json","content-type=application/xml"})
    public @ResponseBody DTO loginValidation(@RequestBody User user) 
    {
        Boolean result = userService.addUserInfo(user);
        
        DTO dto = new DTO();
        dto.setResult(result);
        
        return dto;
    }
}


