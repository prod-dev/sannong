package com.sannong.presentation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.mysql.jdbc.StringUtils;
import com.sannong.infrastructure.persistance.entity.Answer;
import com.sannong.infrastructure.persistance.entity.Application;
import com.sannong.infrastructure.persistance.entity.City;
import com.sannong.infrastructure.persistance.entity.District;
import com.sannong.infrastructure.persistance.entity.Province;
import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.presentation.model.DTO;
import com.sannong.service.IProjectService;
import com.sannong.service.IRegionService;
import com.sannong.service.IUserService;


/**
 * Created by Bright Huang on 10/14/14.
 */
@Controller
public class ProjectApplicationController {
    private static final String APPLICATION_PAGE = "projectapplication";
    private static final String COMPLETION_PAGE = "completion";
    
    @Resource
    private IProjectService projectService;
    @Resource
    private IRegionService regionService;
    @Resource
    private IUserService userService;

    @RequestMapping(value = "applicationpage", method = RequestMethod.GET)
    public ModelAndView show(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("projectapplication", new Object());
        return new ModelAndView(APPLICATION_PAGE, models);
    }

    @RequestMapping(value = "apply", method = RequestMethod.POST)
    public ModelAndView apply(@ModelAttribute("applicationForm") Application application) throws Exception {

    	application.getApplicant().setUserName(application.getApplicant().getCellphone());
    	
        Boolean result = projectService.projectApplication(application);
         
        DTO dto = new DTO();
        dto.setResult(result);
    	
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("completion", new Object());
        return new ModelAndView(COMPLETION_PAGE, models);
    }

    @RequestMapping(value = "getProvinces")
    public @ResponseBody List<Province> getProvinces() {
        return regionService.getProvinces();
    }

    @RequestMapping(value = "getCities")
    public @ResponseBody List<City> getCities(Long provinceIndex) {
        return regionService.getCities(provinceIndex);
    }

    @RequestMapping(value = "getDistricts")
    public @ResponseBody List<District> getDistricts(Long cityIndex) {
        return regionService.getDistricts(cityIndex);
    }

    @RequestMapping(value = "useravail", method = RequestMethod.GET)
    public @ResponseBody boolean checkUsernameAvail(HttpServletRequest request) {
    	return projectService.checkUserNameAvailable(request);
    }

    @RequestMapping(value = "questionAndAnswer",method = RequestMethod.GET)
    public @ResponseBody Answer getQuestionnaireAndAnswerByCondition(HttpServletRequest request) throws Exception {
        
    	String questionnaireNo = request.getParameter("questionnaireNo");
    	String cellphone = request.getParameter("cellphone");
    	String userName = null;
    	String realName = null;
    	
    	if (cellphone != null) {
    		Map<String, Object> map = new HashMap<String, Object>();
    		map.put("cellphone", cellphone);
    		List<User> userList = userService.getUserByCondition(map);
    		
    		if (userList != null &&  userList.get(0) != null) {
    			userName = userList.get(0).getUserName();
    			realName = userList.get(0).getRealName();
    		}
    	} else if (StringUtils.isNullOrEmpty(userName)) {
    	    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	        
	        if (principal instanceof UserDetails) {
	        	userName = ((UserDetails) principal).getUsername();
	        } else {
	        	userName = principal.toString();
	        }
    	}
    	
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("questionnaireNo", questionnaireNo);
        map.put("userName", userName);
        
    	Answer answer = projectService.getQuestionnaireAndAnswerByCondition(map);
    	User user = new User();
    	user.setUserName(userName);
    	user.setRealName(realName);
    	answer.setApplicant(user);
    	
    	return answer;
    }
}
