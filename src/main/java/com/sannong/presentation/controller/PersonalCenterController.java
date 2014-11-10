package com.sannong.presentation.controller;

import java.io.IOException;
import java.sql.Timestamp;
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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.sannong.infrastructure.dataexport.CsvExporter;
import com.sannong.infrastructure.persistance.entity.Answer;
import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.infrastructure.util.AppConfig;
import com.sannong.presentation.model.DTO;
import com.sannong.service.IAnswerService;
import com.sannong.service.IProjectService;
import com.sannong.service.ISmsService;
import com.sannong.service.IUserService;

@Controller
@SessionAttributes("myinfo")
public class PersonalCenterController {
    private static final String MY_APPLICATION_PAGE = "myapplication";
    private static final String MY_INFO_PAGE = "myinfo";
    private static final String USER_INFO_PAGE = "userinfo";
    private static final String MY_PASSWORD_PAGE = "mypassword";
    private static final String APPLICANTS_PAGE = "applicants";
    private static final String LOGIN_PAGE = "login";
    private static final long questionNumbers = 55;

    @Resource
    private IUserService userService;
    @Resource
    private ISmsService smsService;
    @Resource
    private IProjectService projectService;
    @Resource
    private IAnswerService answerService;
    @Resource
    private AppConfig appConfig;

    /**
     * Determine which page will be shown when user login. If user is admin, show applicants page,
     * if user is ordinary user, show myapplication page.
     * @param
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "myaccount", method = RequestMethod.GET)
    public ModelAndView loginMyAccount() throws Exception {
        Collection<SimpleGrantedAuthority> authorities =
                (Collection<SimpleGrantedAuthority>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        String role;
        for (GrantedAuthority authority : authorities){
            role = authority.getAuthority();
            if (role.equals("ROLE_USER")){
                return new ModelAndView("redirect:" + MY_APPLICATION_PAGE);
            } else if(role.equals("ROLE_ADMIN")){
                return new ModelAndView("redirect:" + APPLICANTS_PAGE);
            }
        }
        return new ModelAndView("redirect:" + LOGIN_PAGE);
    }

    /**
     * Show applicants page.
     * @return
     */
    @RequestMapping(value = "applicants", method = RequestMethod.GET)
    public ModelAndView showList() {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("applicants", new Object());
        return new ModelAndView(APPLICANTS_PAGE, models);
    }

    /**
     * Show applicants page.  //TODO: Why there are two functions to show applicants here?
     * @param request
     * @return
     */
    @RequestMapping(value = "showApplicants", method = RequestMethod.GET)
    public @ResponseBody List<User> showList(HttpServletRequest request) {

        Map<String, Object> map = new HashMap<String,Object>();
        String pageIndex = request.getParameter("pageIndex");
        String cellphone = request.getParameter("cellphone");
        String realName = request.getParameter("realName");
        String company = request.getParameter("company");
    	String jobTitle = request.getParameter("jobTitle");
    	String companyAddress = request.getParameter("companyAddress");
    	String mailbox = request.getParameter("mailbox");
    	String provinceIndex = request.getParameter("provinceIndex");
    	String cityIndex = request.getParameter("cityIndex");
    	String districtIndex = request.getParameter("districtIndex");

        int pageStart = 0;

        if (null != pageIndex){
            pageStart =  (Integer.parseInt(pageIndex)- 1)  * 10;
        }
        map.put("pageStart", pageStart);
        map.put("cellphone", cellphone);
        map.put("realName", realName);
        map.put("company", company);
    	map.put("jobTitle", jobTitle);
    	map.put("companyAddress", companyAddress);
    	map.put("mailbox", mailbox);
    	map.put("companyProvince", provinceIndex);
    	map.put("companyCity", cityIndex);
    	map.put("companyDistrict", districtIndex);

        List<User> applicants = userService.getUserByFuzzyMatch(map);

        return applicants;
    }

    /**
     * Show my application page.
     * @return
     */
    @RequestMapping(value = "myapplication", method = RequestMethod.GET)
    public ModelAndView myApplication() {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("myapplication", new Object());

        return new ModelAndView(MY_APPLICATION_PAGE, models);
    }

    /**
     * Show myinfo page.
     * @param request
     * @return
     */
    @RequestMapping(value = "myinfo", method = RequestMethod.GET)
    public ModelAndView myInfo(HttpServletRequest request) {

        Map<String, Object> models = new HashMap<String, Object>();
        String userName = request.getParameter("userName");
        if (userName == null){
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof UserDetails) {
                userName = ((UserDetails) principal).getUsername();
            } else {
                userName = principal.toString();
            }
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("userName", userName);
        List<User> users = userService.getUserByCondition(map);
        models.put("myinfo", users.get(0));
        return new ModelAndView(MY_INFO_PAGE, models);
    }

    /**
     * Update user's information.
     * @param request
     * @param user
     * @return
     */
    @RequestMapping(value = "modifyMyinfo", method = RequestMethod.POST)
	public ModelAndView updateUser(HttpServletRequest request, @ModelAttribute("myinfo") User user) {
        Map<String, Object> models = new HashMap<String, Object>();
    	String userName = null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        if (principal instanceof UserDetails) {
        	userName = ((UserDetails) principal).getUsername();
        } else {
        	userName = principal.toString();
        }
        user.setUserName(userName); //add by william
         
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("userName", userName);
        
        List<User> userList = userService.getUserByCondition(map);
        
        if (userList != null && userList.get(0) != null){
        	if(StringUtils.isEmpty(user.getCellphone().toString())) {
        		user.setCellphone(userList.get(0).getCellphone());
        	}
        	
        	if(!userList.get(0).getCellphone().toString().equals(user.getCellphone().toString()))
        	{
        		if(smsService.validateSMSCode(request) < 2)
        		{
        			models.put("myinfomessage", appConfig.getProperty("error-myinfo-invalidRegcode"));
        		}
        		return new ModelAndView(MY_INFO_PAGE, models);
        	}
        }
    	Timestamp ts = new Timestamp(System.currentTimeMillis());
		user.setUpdateTime(ts);
		try {
			userService.updateUser(user);
		} catch (Exception e) {

			e.printStackTrace();
		}
		
		models.put("myinfomessage", "Save!");
		
		return new ModelAndView(MY_INFO_PAGE, models);
	}

    /**
     * Show user info page when clicked edit button from applicants page.
     * @param request
     * @return
     */
    @RequestMapping(value = "userinfo")
    public ModelAndView userInfo(HttpServletRequest request) {

        Map<String, Object> models = new HashMap<String, Object>();
        String userName = request.getParameter("userName");
        if (userName == null){
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (principal instanceof UserDetails) {
                userName = ((UserDetails) principal).getUsername();
            } else {
                userName = principal.toString();
            }
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("userName", userName);
        List<User> users = userService.getUserByCondition(map);
        models.put("myinfo", users.get(0));
        return new ModelAndView(USER_INFO_PAGE, models);
    }

    /**
     * Update user info.
     * @param user
     * @return
     */
    @RequestMapping(value = "updateUserInfo", method = RequestMethod.POST)
    public ModelAndView updateUserInfo(@ModelAttribute("userinfo") User user) {
        Map<String, Object> models = new HashMap<String, Object>();

        Timestamp ts = new Timestamp(System.currentTimeMillis());
        user.setUpdateTime(ts);
        try {
            userService.updateUser(user);
        } catch (Exception e) {

            e.printStackTrace();
        }

        models.put("myinfomessage", "Save!");

        return new ModelAndView(USER_INFO_PAGE, models);
    }

    /**
     * Get user total count.
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "userTotalCount", method = RequestMethod.GET)
    public @ResponseBody String getUserTotalCount(HttpServletRequest request) throws Exception {

    	Map<String, Object> map = new HashMap<String,Object>();
    	String cellphone = request.getParameter("cellphone");
    	String realName = request.getParameter("realName");
    	String company = request.getParameter("company");
    	String jobTitle = request.getParameter("jobTitle");
    	String companyAddress = request.getParameter("companyAddress");
    	String mailbox = request.getParameter("mailbox");
    	String provinceIndex = request.getParameter("provinceIndex");
    	String cityIndex = request.getParameter("cityIndex");
    	String districtIndex = request.getParameter("districtIndex");
    	
    	map.put("cellphone", cellphone);
    	map.put("realName", realName);
    	map.put("company", company);
    	map.put("jobTitle", jobTitle);
    	map.put("companyAddress", companyAddress);
    	map.put("mailbox", mailbox);
    	map.put("companyProvince", provinceIndex);
    	map.put("companyCity", cityIndex);
    	map.put("companyDistrict", districtIndex);
    	
    	return userService.getUserTotalCount(map);
    }

    /**
     * Show mypassword page.
     * @return
     */
    @RequestMapping(value = "mypassword", method = RequestMethod.GET)
    public ModelAndView myPassword() {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("mypassword", new Object());

        return new ModelAndView(MY_PASSWORD_PAGE, models);
    }

    /**
     * Update password from mypassword page.
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "updatepassword", method = RequestMethod.POST)
    public ModelAndView updatePassword(HttpServletRequest request) throws Exception {

        Map<String, Object> models = new HashMap<String, Object>();
        Md5PasswordEncoder md5 = new Md5PasswordEncoder();
        String userName = null;;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        if (principal instanceof UserDetails) {
        	userName = ((UserDetails) principal).getUsername();
        } else {
        	userName = principal.toString();
        }

        String oldPassword = request.getParameter("oldPassword");
        String newPassword = request.getParameter("newPassword");
        String confirmedPassword = request.getParameter("confirmedPassword");

        Map<String,Object> map = new HashMap<String,Object>();
        map.put("userName", userName);
        List<User> userList = userService.getUserByCondition(map);
        User user = null;
        
        if (userList != null && userList.get(0) != null){
        	user = userList.get(0);
        	
			if (!user.getPassword().equals(md5.encodePassword(oldPassword, userName))){
			    models.put("myPasswordAuth", "oldPasswordAuthFailure");
			    return new ModelAndView(MY_PASSWORD_PAGE, models);
			}else if (!newPassword.equals(confirmedPassword) ){
			    models.put("myPasswordAuth", "newPasswordAuthFailure");
			    return new ModelAndView(MY_PASSWORD_PAGE, models);
			}
        }

        String encryptedNewPassword = md5.encodePassword(newPassword, userName);
        user.setPassword(encryptedNewPassword);
        userService.updatePassword(user);

        models.put("myPasswordAuth", "passwordChanged");
        return new ModelAndView(MY_PASSWORD_PAGE, models);
    }

    /**
     * Update answers from questionnaire page.
     * @param answer
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "updateAnswers", method = RequestMethod.POST)
    public @ResponseBody DTO updateAnswers(@ModelAttribute("answerForm") Answer answer) throws Exception{
    	
    	String userName = null;
        Boolean result = true;
        
    	if (answer.getAnswers() == null){
    		result = false;
    		return new DTO(result,null);
    	}
        
        if (answer.getApplicant() != null){
        	userName = answer.getApplicant().getUserName();
        }else {
        	Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        	
        	if (principal instanceof UserDetails) {
        		SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            	userName = ((UserDetails) principal).getUsername();
        	}else{
        		SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            	userName = principal.toString();
        	}
        }
        	
        User applicant = new User();
        applicant.setUserName(userName);
        answer.setApplicant(applicant);
        result = projectService.updateAnswers(answer);
    	
        return new DTO(result,null);
    }

    /**
     * Export answers to CSV file.
     * @param request
     * @param response
     * @throws IOException
     */
    @RequestMapping("/exportCSV")
    public void exportAll(HttpServletRequest request,HttpServletResponse response) throws IOException {

        Map<String, Object> map = new HashMap<String, Object>();
        String cellphone = request.getParameter("cellphone");
        String realName = request.getParameter("realName");

        map.put("cellphone", cellphone);
        map.put("realName", realName);

        List<Answer> answer = answerService.getAnswer(map);
        StringBuffer head = new StringBuffer();
        for(long i =1;i<=questionNumbers;i++){
            head.append(answerService.getQuestionContent(i)+",");
        }
        CsvExporter.doExport(response, answer, head.toString());
    }
}
