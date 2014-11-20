package com.sannong.presentation.controller;

import com.mysql.jdbc.StringUtils;
import com.sannong.infrastructure.persistance.entity.Answer;
import com.sannong.infrastructure.persistance.entity.Application;
import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.infrastructure.util.AppConfig;
import com.sannong.presentation.utils.JsonConvertor;
import com.sannong.service.IProjectService;
import com.sannong.service.IUserService;
import com.sannong.service.IValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by Bright Huang on 10/14/14.
 */
@Controller
public class ProjectApplicationController {
    private static final String APPLICATION_PAGE = "projectapplication";
    private static final String COMPLETION_PAGE = "completion";
    private static final String PROJECT_APPLICATION_PAGE = "/pages/project-application";

    @Autowired
    private AppConfig appConfig;
    @Resource
    private IProjectService projectService;
    @Resource
    private IUserService userService;
    @Autowired
    private IValidationService validationService;



    @RequestMapping(value = "project-application", method = RequestMethod.GET)
    public ModelAndView showProjectApplicationPage(HttpServletRequest request) {
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("project-application", new Object());
        return new ModelAndView(PROJECT_APPLICATION_PAGE, models);
    }



    @RequestMapping(value = "applicationpage", method = RequestMethod.GET)
    public ModelAndView showPage(HttpServletRequest request) {
        request.getSession().setAttribute(appConfig.getSessionSmsCodes(), null);
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("projectapplication", new Object());
        return new ModelAndView(APPLICATION_PAGE, models);
    }

    @RequestMapping(value = "apply", method = RequestMethod.POST)
    public ModelAndView apply(HttpServletRequest request,
                              @ModelAttribute("applicationForm") @Valid Application application,
                              BindingResult result) throws Exception {

        Map<String, Object> models = new HashMap<String, Object>();

        projectService.projectApplication(request, application);
        models.put("completion", new Object());
        return new ModelAndView(COMPLETION_PAGE, models);
    }

    @RequestMapping(value = "questionAndAnswer", method = RequestMethod.GET)
    public
    @ResponseBody
    Answer getQuestionnaireAndAnswerByCondition(HttpServletRequest request) throws Exception {

        String questionnaireNo = request.getParameter("questionnaireNo");
        String cellphone = request.getParameter("cellphone");
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

        Answer answer = projectService.getQuestionnaireAndAnswerByCondition(map);
        User user = new User();
        user.setUserName(userName);
        user.setRealName(realName);
        answer.setApplicant(user);

        return answer;
    }

    @RequestMapping(value = "validateFormOnSubmit", method = RequestMethod.GET)
    public @ResponseBody String validateForm(HttpServletRequest request) throws IOException {
        String cellphone = request.getParameter("cellphone");
        String validationCode = request.getParameter("validationCode");

        boolean uniqueCellphoneValid = validationService.validateUniqueCellphone(cellphone);
        boolean validationCodeValid = validationService.validateValidationCode(cellphone, validationCode);

        boolean valid = validationCodeValid && uniqueCellphoneValid;

        Map<String, Object> resultMap = new HashMap();
        resultMap.put("valid", valid);
        resultMap.put("uniqueCellphoneValid", uniqueCellphoneValid);
        resultMap.put("validationCodeValid", validationCodeValid);

        String result = JsonConvertor.toJSON(resultMap);

        return result;
    }


}
