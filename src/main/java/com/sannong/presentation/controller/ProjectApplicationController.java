package com.sannong.presentation.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.sannong.domain.valuetypes.ResponseStatus;
import com.sannong.infrastructure.util.PasswordGenerator;
import com.sannong.presentation.model.Response;
import com.sannong.service.ISmsService;
import org.apache.commons.lang3.StringUtils;
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

import com.sannong.domain.entities.Answer;
import com.sannong.domain.entities.Application;
import com.sannong.domain.entities.User;
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
    @Autowired
    private ISmsService smsService;

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

    @RequestMapping(value = "makeApplication", method = RequestMethod.POST)
    public ModelAndView makeApplication(@ModelAttribute("projectAppForm") Application application) throws Exception {

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
        } else if (StringUtils.isBlank(userName)) {
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

    @RequestMapping(value = "project-application/validate-application-form", method = RequestMethod.POST)
    public @ResponseBody
    Response validateForm(HttpServletRequest request) throws IOException {
        String cellphone = request.getParameter("cellphone");
        String validationCode = request.getParameter("validationCode");

        if (validationService.validateUniqueCellphone(cellphone) == false){
            return new Response(
                    ResponseStatus.CELLPHONE_NOT_UNIQUE.getStatusCode(),
                    ResponseStatus.CELLPHONE_NOT_UNIQUE.getStatusDescription());
        }else if(validationService.validateValidationCode(cellphone, validationCode) == false){
            return new Response(
                    ResponseStatus.CAPTCHA_INCORRECT.getStatusCode(),
                    ResponseStatus.CAPTCHA_INCORRECT.getStatusDescription());
        }else{
            return new Response(
                    ResponseStatus.SUCCESS.getStatusCode(),
                    ResponseStatus.SUCCESS.getStatusDescription());

        }
    }

    @RequestMapping(value = "project-application/sendValidationCode",method = RequestMethod.POST)
    public @ResponseBody Response sendCaptchaCode(HttpServletRequest request){
        String cellphone = request.getParameter("applicant.cellphone");
        if (StringUtils.isBlank(cellphone)){
            cellphone = request.getParameter("cellphone");
        }

        if (StringUtils.isBlank(cellphone)){
            return new Response(
                    ResponseStatus.CELLPHONE_IS_NULL.getStatusCode(),
                    ResponseStatus.CELLPHONE_IS_NULL.getStatusDescription());
        }

        if (validationService.validateUniqueCellphone(cellphone) == false){
            return new Response(
                    ResponseStatus.CELLPHONE_NOT_UNIQUE.getStatusCode(),
                    ResponseStatus.CELLPHONE_NOT_UNIQUE.getStatusDescription());
        }else{
            String validationCode = PasswordGenerator.generateValidationCode(4);
            String result = smsService.sendValidationCode(cellphone, validationCode);
            if (StringUtils.isNotBlank(result)){
                return new Response(
                        ResponseStatus.CAPTCHA_WAS_SENT.getStatusCode(),
                        ResponseStatus.CAPTCHA_WAS_SENT.getStatusDescription());

            }else{
                return new Response(
                        ResponseStatus.SMS_SEND_CAPTCHA_FAILURE.getStatusCode(),
                        ResponseStatus.SMS_SEND_CAPTCHA_FAILURE.getStatusDescription());
            }

        }
    }

}
