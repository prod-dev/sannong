package com.sannong.presentation.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.mysql.jdbc.StringUtils;
import com.sannong.domain.entities.Answer;
import com.sannong.domain.entities.Application;
import com.sannong.domain.entities.User;
import com.sannong.presentation.utils.JsonConvertor;
import com.sannong.service.IProjectService;
import com.sannong.service.IUserService;
import com.sannong.service.IValidationService;


/**
 * Created by Bright Huang on 10/14/14.
 */
@Controller
public class ProjectApplicationController {
	private static final Logger logger = Logger.getLogger(ProjectApplicationController.class);
	
    private static final String PROJECT_APPLICATION_COMPLETION_PAGE = "project-application-completion";
    private static final String PROJECT_APPLICATION_PAGE = "project-application";

    @Resource
    private IProjectService projectService;
    @Resource
    private IUserService userService;
    @Autowired
    private IValidationService validationService;

    @RequestMapping(value = "project-application", method = RequestMethod.GET)
    public ModelAndView showProjectApplicationPage() {
        return new ModelAndView(PROJECT_APPLICATION_PAGE);
    }

    @RequestMapping(value = "project-application-completion", method = RequestMethod.GET)
    public ModelAndView showProjectApplicationCompletion() {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("project-application-completion", new Object());
        return new ModelAndView(PROJECT_APPLICATION_COMPLETION_PAGE, models);
    }

    @RequestMapping(value = "apply", method = RequestMethod.POST)
    public ModelAndView apply(@ModelAttribute("projectAppForm") Application application) throws Exception {

        projectService.projectApplication(application);
        return new ModelAndView(PROJECT_APPLICATION_COMPLETION_PAGE);
    }

    @RequestMapping(value = "questionAndAnswer", method = RequestMethod.GET)
    public @ResponseBody Answer getQuestionnaireAndAnswerByCondition(HttpServletRequest request) throws Exception{

    	Long startTime = System.currentTimeMillis();
    	logger.info("--------------start time:" + startTime);
    	
        String questionnaireNo = request.getParameter("questionnaireNo");
        String cellphone = request.getParameter("cellphone");
        String isOnlyShowQuestions = request.getParameter("flag");
        String userName = null;
        String realName = null;

        if (cellphone != null) {
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("cellphone", cellphone);
            List<User> userList = userService.getUserByCondition(map);

            if (userList != null && userList.get(0) != null) {
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

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("questionnaireNo", questionnaireNo);
        map.put("userName", userName);
        map.put("isOnlyShowQuestions", isOnlyShowQuestions);

        Answer answer = projectService.getQuestionnaireAndAnswerByCondition(map);
        User user = new User();
        user.setUserName(userName);
        user.setRealName(realName);
        answer.setApplicant(user);

        logger.info("----------------------need time:" + (System.currentTimeMillis() - startTime));
        
        return answer;
    }

    @RequestMapping(value = "validateFormOnSubmit", method = RequestMethod.GET)
    public @ResponseBody String validateForm(HttpServletRequest request) throws IOException {
        String cellphone = request.getParameter("cellphone");
        String validationCode = request.getParameter("validationCode");

        boolean uniqueCellphoneValid = validationService.validateUniqueCellphone(cellphone);
        boolean validationCodeValid = validationService.validateValidationCode(cellphone, validationCode);

        boolean valid = validationCodeValid && uniqueCellphoneValid;

        Map<String, Object> resultMap = new HashMap<String,Object>();
        resultMap.put("valid", valid);
        resultMap.put("uniqueCellphoneValid", uniqueCellphoneValid);
        resultMap.put("validationCodeValid", validationCodeValid);

        String result = JsonConvertor.toJSON(resultMap);

        return result;
    }
}
