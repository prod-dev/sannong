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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.sannong.infrastructure.dataexport.CsvExporter;
import com.sannong.infrastructure.persistance.entity.Answer;
import com.sannong.infrastructure.persistance.entity.SMS;
import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.infrastructure.util.MyConfig;
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
    private static final String COMPLETION_PAGE = "completion";
    private static final long questionNumbers = 55;

    @Resource
    private IUserService userService;
    @Resource
    private ISmsService smsService;
    @Resource
    private IProjectService projectService;
    @Resource
    private IAnswerService answerService;


    @RequestMapping(value = "myapplication", method = RequestMethod.GET)
    public ModelAndView myApplication(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("myapplication", new Object());

        return new ModelAndView(MY_APPLICATION_PAGE, models);
    }

    @RequestMapping(value = "updatesms", method = RequestMethod.GET)
    public @ResponseBody boolean updateSMS(HttpServletRequest request) {
        return smsService.updateSMS(request);
    }

    @RequestMapping(value = "getnewsms", method = RequestMethod.GET)
    public @ResponseBody List<SMS> getNewSMS() {
        return smsService.getNewSMS();
    }

    @RequestMapping(value = "regcode", method = RequestMethod.GET)
    public @ResponseBody boolean generateCode(HttpServletRequest request) {
        return smsService.generateCode(request);
    }
    
    @RequestMapping(value = "validateSMSCode")
    public @ResponseBody int  validateRegcode(HttpServletRequest request) {
        return smsService.validateSMSCode(request);
    }


    @RequestMapping(value = "modifyMyinfo", method = RequestMethod.POST)
	public ModelAndView updateUser(HttpServletRequest request,@ModelAttribute("myinfo")	User user, BindingResult result) {
        Map<String, Object> models = new HashMap<String, Object>();
        String userName = user.getUserName();

    	 String username;
         Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
         if (principal instanceof UserDetails) {
             username = ((UserDetails) principal).getUsername();
         } else {
             username = principal.toString();
         }
         user.setUserName(username); //add by william
         
         User dbuser = userService.getUserByName(username);
         if(StringUtils.isEmpty(user.getCellphone().toString())) {
             user.setCellphone(dbuser.getCellphone());
         }

         if(!dbuser.getCellphone().toString().equals(user.getCellphone().toString()))
         {
	    	 if(smsService.validateSMSCode(request) < 2)
	    	 {
	    		 models.put("myinfomessage", MyConfig.getConfig("error-myinfo-invalidRegcode"));
	    	 }
            return new ModelAndView(MY_INFO_PAGE, models);
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

    @RequestMapping(value = "myinfo")
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

    @RequestMapping(value = "updateUserInfo", method = RequestMethod.POST)
    public ModelAndView updateUserInfo(HttpServletRequest request, @ModelAttribute("userinfo") User user, BindingResult result) {
        Map<String, Object> models = new HashMap<String, Object>();
        String userName = user.getUserName();

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


    @RequestMapping(value = "mypassword", method = RequestMethod.GET)
    public ModelAndView myPassword() {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("mypassword", new Object());

        return new ModelAndView(MY_PASSWORD_PAGE, models);
    }

    @RequestMapping(value = "applicants", method = RequestMethod.GET)
    public ModelAndView showList(HttpServletRequest request, HttpServletResponse response) {
    	
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("applicants", new Object());
        return new ModelAndView(APPLICANTS_PAGE, models);
    }
    
    @RequestMapping(value = "showApplicants", method = RequestMethod.GET)
    public @ResponseBody List<User> showList(HttpServletRequest request) {
    	
    	Map<String, Object> map = new HashMap<String,Object>();
    	String pageIndex = request.getParameter("pageIndex");
    	String cellphone = request.getParameter("cellphone");
    	String realName = request.getParameter("realName");
    	
        int pageStart = 0;
    	
    	if (null != pageIndex){
    		pageStart =  (Integer.parseInt(pageIndex)- 1)  * 10;
    	}
    	map.put("pageStart", pageStart);
    	map.put("cellphone", cellphone);
    	map.put("realName", realName);
    	
    	List<User> applicants = userService.getUserByNameOrCellphone(map);

       return applicants;
    }
    @RequestMapping(value = "userTotalCount", method = RequestMethod.GET)
    public @ResponseBody String getUserTotalCount(HttpServletRequest request) throws Exception {

    	Map<String, Object> map = new HashMap<String,Object>();
    	String cellphone = request.getParameter("cellphone");
    	String realName = request.getParameter("realName");
    	
    	map.put("cellphone", cellphone);
    	map.put("realName", realName);
    	
    	return userService.getUserTotalCount(map);
    }

    @RequestMapping(value = "updatepassword", method = RequestMethod.POST)
    public ModelAndView updatePassword(HttpServletRequest request) throws Exception {

        Map<String, Object> models = new HashMap<String, Object>();
        Md5PasswordEncoder md5 = new Md5PasswordEncoder();

        String username;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        String oldPassword = request.getParameter("oldPassword");
        String newPassword = request.getParameter("newPassword");
        String confirmedPassword = request.getParameter("confirmedPassword");

        User user = userService.getUserByName(username);

        if ( !user.getPassword().equals(md5.encodePassword(oldPassword, username)) ){
            models.put("myPasswordAuth", "oldPasswordAuthFailure");
            return new ModelAndView(MY_PASSWORD_PAGE, models);
        }else if ( ! newPassword.equals(confirmedPassword) ){
            models.put("myPasswordAuth", "newPasswordAuthFailure");
            return new ModelAndView(MY_PASSWORD_PAGE, models);
        }

        String encryptedNewPassword = md5.encodePassword(newPassword, username);
        user.setPassword(encryptedNewPassword);
        userService.updatePassword(user);

        models.put("myPasswordAuth", "passwordChanged");
        return new ModelAndView(MY_PASSWORD_PAGE, models);
    }

    @RequestMapping(value = "myaccount", method = RequestMethod.GET)
    public ModelAndView loginMyAccount(HttpServletRequest request) throws Exception {
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
        return new ModelAndView("redirect:" + "login");
    }

    /*@RequestMapping("/exportCSV")
    public void exportAll(HttpServletRequest request,HttpServletResponse response) throws IOException {

        Map<String, Object> map = new HashMap<String,Object>();
        String cellphone = request.getParameter("cellphone");
        String realName = request.getParameter("realName");

        map.put("cellphone", cellphone);
        map.put("realName", realName);

        response.setContentType("application/csv");
        response.setCharacterEncoding("GB2312");
        response.setHeader("Content-disposition", "attachment;filename=answer.csv");

        PrintWriter w = response.getWriter();

        w.write("序号,姓名,电话,地址,答案"+"\n");
        List<Application> applicants = userService.getAnswer(map);
        Iterator it = applicants.iterator();
        int i = 1;
        while(it.hasNext()){
            Application app = (Application) it.next();
            String answer;
            if(app.getQuestionnaireAnswer() != null){
                answer = app.getQuestionnaireAnswer();
            }
            else{
                answer="";
            }
            w.write( i + "," + app.getApplicant().getRealName() + ","+ app.getApplicant().getCellphone()  + ","+ app.getApplicant().getCompanyAddress() + "," + CsvExporter.toAnalyseString(answer) + "\n");
            i++;
            w.flush();
        }
        w.close();
    }*/
    @RequestMapping(value = "updateAnswers", method = RequestMethod.POST)
    public ModelAndView updateAnswers(@ModelAttribute("answerForm") Answer answer) throws Exception{
    	
    	String userName = null;
        Object principal = null;
        
    	Map<String, Object> models = new HashMap<String, Object>();
        models.put(COMPLETION_PAGE, new Object());
        
    	ModelAndView modelAndView = new ModelAndView(COMPLETION_PAGE, models);
    	if (answer.getAnswers() == null){
    		return modelAndView;
    	}
        
        if (answer.getApplicant() != null){
        	userName = answer.getApplicant().getUserName();
        }else if (principal instanceof UserDetails) {
        	SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        	userName = ((UserDetails) principal).getUsername();
        } else {
        	SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        	userName = principal.toString();
        }
        User applicant = new User();
        applicant.setUserName(userName);
        answer.setApplicant(applicant);
        Boolean result = projectService.updateAnswers(answer);
    	
        return modelAndView;
    }
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
