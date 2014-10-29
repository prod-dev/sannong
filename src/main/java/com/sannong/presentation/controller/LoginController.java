package com.sannong.presentation.controller;


import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.service.IUserService;
import org.apache.log4j.Logger;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Bright Huang on 10/14/14.
 */
@Controller
public class LoginController {

    private static final Logger logger = Logger.getLogger(LoginController.class);

    @Resource
    private IUserService userService;

    private static final String SIGNIN_PAGE = "signin";
    private static final String FORGOT_PASSWORD_PAGE = "forgotpassword";
    private static final String MY_APPLICATION_PAGE = "myapplication";
    private static final String APPLICANTS_PAGE = "applicants";

    @RequestMapping(value = "signin", method = RequestMethod.GET)
    public ModelAndView showSigninPage() {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("signin", new Object());
        return new ModelAndView(SIGNIN_PAGE, models);
    }

    @RequestMapping(value = "signin", method = RequestMethod.POST)
    public ModelAndView signin() {
        return showSigninPage();
    }

    @RequestMapping(value = "forgotpassword", method = RequestMethod.GET)
    public ModelAndView forgotPassword() {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("forgotpassword", new Object());
        return new ModelAndView(FORGOT_PASSWORD_PAGE, models);
    }

    @RequestMapping(value = "confirmpassword", method = RequestMethod.POST)
    public ModelAndView confirmPassword(HttpServletRequest request) throws Exception {
        Map<String, Object> models = new HashMap<String, Object>();
        Map<String, Object> map = new HashMap<String, Object>();

        String mobile = request.getParameter("cellphone").toString();
        String password = request.getParameter("password").toString();

        map.put("username", mobile);
        map.put("cellphone", mobile);

        List<User> users = userService.getUserByCondition(map);
        if (users.isEmpty()) {
            models.put("forgetPassword", "no such user found!");
            return new ModelAndView(FORGOT_PASSWORD_PAGE, models);
        } else {
            if (!request.getSession().getAttribute("regcode").toString().equals(password)) {
                models.put("forgetPassword", "confirm code  not pass! please input code you got on your mobile ");
            }
            User user = users.get(0);
            Md5PasswordEncoder md5 = new Md5PasswordEncoder();
            String encryptedNewPassword =
                    md5.encodePassword(request.getSession().getAttribute("regcode").toString(), user.getUserName());
            user.setPassword(encryptedNewPassword);
            userService.updatePassword(user);
            models.put("forgetPassword", "password changed!");
            return new ModelAndView(FORGOT_PASSWORD_PAGE, models);
        }
    }

    @RequestMapping(value = "authentication-success", method = RequestMethod.GET)
    public ModelAndView securityCheck() {

        Collection<SimpleGrantedAuthority> authorities =
                (Collection<SimpleGrantedAuthority>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        for (GrantedAuthority authority : authorities) {
            String role = authority.getAuthority();
            if (role.equals("ROLE_USER")) {
                return new ModelAndView("redirect:" + MY_APPLICATION_PAGE);
            } else if (role.equals("ROLE_ADMIN")) {
                return new ModelAndView("redirect:" + APPLICANTS_PAGE);
            }
        }
        return showSigninPage();
    }

    @RequestMapping(value = "authentication-failure", method = RequestMethod.GET)
    public ModelAndView authenticate() {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("authentication", "authentication-failure");
        return new ModelAndView(SIGNIN_PAGE, models);
    }

    @RequestMapping(value = "access-denied", method = RequestMethod.GET)
    public ModelAndView accessDeny() {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("access-denied", "access-denied");
        return new ModelAndView(SIGNIN_PAGE, models);
    }
}


