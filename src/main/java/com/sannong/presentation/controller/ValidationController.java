package com.sannong.presentation.controller;

import com.sannong.service.IValidationService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by Bright Huang on 11/18/14.
 */
@Controller
public class ValidationController {
    @Resource
    private IValidationService validationService;

    @RequestMapping(value = "useravail", method = RequestMethod.GET)
    public @ResponseBody boolean validateUserNameAvailable(HttpServletRequest request) {
        String username = request.getParameter("username");
        return validationService.validateUserNameAvailable(username);
    }

    @RequestMapping(value = "validateUniqueCellphone",method = RequestMethod.GET)
    public @ResponseBody boolean validateUniqueCellphone(HttpServletRequest request){
        String cellphone = request.getParameter("applicant.cellphone");
        if (org.apache.commons.lang3.StringUtils.isBlank(cellphone)){
            cellphone = request.getParameter("cellphone");
        }
        return validationService.validateUniqueCellphone(cellphone);
    }

    @RequestMapping(value = "validateValidationCode",method = RequestMethod.GET)
    public @ResponseBody boolean validateValidationCode(HttpServletRequest request){
        String cellphone = request.getParameter("cellphone");
        String validationCode = request.getParameter("validationCode");
        return validationService.validateValidationCode(cellphone, validationCode);
    }
}
