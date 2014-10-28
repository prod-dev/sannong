package com.sannong.presentation.controller;


import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.presentation.model.DTO;
import com.sannong.service.IUserService;

/**
 * Created by Bright Huang on 10/14/14.
 */
@Controller
public class LoginController {
	
	@Resource
    private IUserService userService;
	
    private static final String SIGNIN_PAGE = "signin";
    private static final String HOME_PAGE = "home";
    private static final String FORGOT_PASSWORD_PAGE = "forgotpassword";
    private static final String AUTHENTICATION_FAILURE_PAGE = "authentication-failure";
    private static final String ACCESS_DENIED_PAGE = "access-denied";
    private static final String MY_APPLICATION_PAGE = "myapplication";
    private static final String APPLICANTS_PAGE = "applicants";


    @RequestMapping(value = "signin", method = RequestMethod.GET)
    public ModelAndView show(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("signin", new Object());
        return new ModelAndView(SIGNIN_PAGE, models);
    }

    @RequestMapping(value = "signin", method = RequestMethod.POST)
    public ModelAndView signin(HttpServletRequest request, HttpServletResponse response) {

        String username;

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("home", new Object());
        return new ModelAndView(HOME_PAGE, models);
    }

    @RequestMapping(value = "forgotpassword", method = RequestMethod.GET)
    public ModelAndView forgotPassword(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("forgotpassword", new Object());
        return new ModelAndView(FORGOT_PASSWORD_PAGE, models);
    }
    
    @RequestMapping(value = "confirmpassword",method = RequestMethod.POST)
    public ModelAndView confirmPassword(HttpServletRequest request, HttpServletResponse response) throws Exception
    {
        Map<String, Object> models = new HashMap<String, Object>();
    	Map<String,Object> map=new HashMap<String,Object>();
    	String mobile=request.getParameter("cellphone").toString();
    	String password=request.getParameter("password").toString();
    	map.put("username",mobile );
    	map.put("cellphone", mobile);
    	List<User> users = userService.getUserByCondition(map);
    	if(users.isEmpty())
    	{
    			models.put("forgetPassword", "no such user found!");
    		   return new ModelAndView(FORGOT_PASSWORD_PAGE, models);
    	}
    	else
    	{
    		if(!request.getSession().getAttribute("regcode").toString().equals(password))
    		{
    			   models.put("forgetPassword", "confirm code  not pass! please input code you got on your mobile ");
    		}
    		User user=users.get(0);
    		 Md5PasswordEncoder md5 = new Md5PasswordEncoder();
    		String encryptedNewPassword = md5.encodePassword(request.getSession().getAttribute("regcode").toString(), user.getUserName());
            user.setPassword(encryptedNewPassword);
            userService.updatePassword(user);
            models.put("forgetPassword", "password changed!");
            return new ModelAndView(FORGOT_PASSWORD_PAGE, models);	
    	}
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

    @RequestMapping(value = "authentication-success", method = RequestMethod.GET)
    public ModelAndView securityCheck(HttpServletRequest request, HttpServletResponse response) {

        Collection<SimpleGrantedAuthority> authorities =
                (Collection<SimpleGrantedAuthority>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        String role;
        for (GrantedAuthority authority : authorities){
            role = authority.getAuthority();
            if (role.equals("ROLE_USER")){
                return new ModelAndView("redirect:" + "myapplication");
            } else if(role.equals("ROLE_ADMIN")){
                return new ModelAndView("redirect:" + "applicants");
            }
        }
        return signin(request, response);
    }

    @RequestMapping(value = "authentication-failure", method = RequestMethod.GET)
    public ModelAndView authenticate(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("authentication", "authentication-failure");
        return new ModelAndView(SIGNIN_PAGE, models);
    }


    @RequestMapping(value = "access-denied", method = RequestMethod.GET)
    public ModelAndView accessDeny(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("access-denied", "access-denied");
        return new ModelAndView(SIGNIN_PAGE, models);
    }
}


