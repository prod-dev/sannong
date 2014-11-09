package com.sannong.presentation.controller;


import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.infrastructure.util.PasswordGenerator;
import com.sannong.service.IUserService;
import org.apache.log4j.Logger;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
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

    private static final String LOGIN_PAGE = "login";
    private static final String FORGOT_PASSWORD_PAGE = "forgotpassword";
    private static final String MY_APPLICATION_PAGE = "myapplication";
    private static final String APPLICANTS_PAGE = "applicants";
    private static final String PROJECT_APPLICATION_PAGE = "projectapplication";

    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ModelAndView showLoginPage() {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("login", new Object());
        return new ModelAndView(LOGIN_PAGE, models);
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ModelAndView login() {
        return showLoginPage();
    }

    @RequestMapping(value = "forgotpassword", method = RequestMethod.GET)
    public ModelAndView forgotPassword() {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("forgotpassword", new Object());
        return new ModelAndView(FORGOT_PASSWORD_PAGE, models);
    }

    //TODO: This function is not implemented yet.
    @RequestMapping(value = "getNewPassword", method = RequestMethod.GET)
    public @ResponseBody boolean getNewPassword(HttpServletRequest request) {
        String cellphone = request.getParameter("cellphone");
        String realName = request.getParameter("realName");

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("cellphone", cellphone);
        paramMap.put("realName", realName);

        return false;
    }

    @RequestMapping(value = "loginWithNewPassword", method = RequestMethod.POST)
    public ModelAndView loginWithNewPassword(HttpServletRequest request) throws Exception {
        Map<String, Object> models = new HashMap<String, Object>();
        Map<String, Object> map = new HashMap<String, Object>();

        String realName = request.getParameter("realName");
        String cellphone = request.getParameter("cellphone");
        String password = request.getParameter("password");

        map.put("realName", realName);
        map.put("cellphone", cellphone);

        List<User> users = userService.getUserByCondition(map);
        if (users.isEmpty()) {
            models.put("forgetPassword", "not_found!");
            return new ModelAndView(FORGOT_PASSWORD_PAGE, models);
        } else {
            User user = users.get(0);
            String updatedPassword = user.getPassword();
            String encryptedNewPassword = PasswordGenerator.encryptPassword(password, user.getUserName());

            if (updatedPassword.equals(encryptedNewPassword)) {
                return new ModelAndView(PROJECT_APPLICATION_PAGE, models);
            } else {
                models.put("forgetPassword", "confirm code  not pass! please input code you got on your mobile ");
                return new ModelAndView(FORGOT_PASSWORD_PAGE, models);
            }
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
        return showLoginPage();
    }

    @RequestMapping(value = "authentication-failure", method = RequestMethod.GET)
    public ModelAndView authenticate() {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("authentication", "authentication-failure");
        return new ModelAndView(LOGIN_PAGE, models);
    }

    @RequestMapping(value = "access-denied", method = RequestMethod.GET)
    public ModelAndView accessDeny() {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("access-denied", "access-denied");
        return new ModelAndView(LOGIN_PAGE, models);
    }

}


