package com.sannong.presentation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sannong.infrastructure.persistance.entity.City;
import com.sannong.infrastructure.persistance.entity.District;
import com.sannong.infrastructure.persistance.entity.Province;
import com.sannong.service.IRegionService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sannong.infrastructure.persistance.entity.Application;
import com.sannong.presentation.model.DTO;
import com.sannong.service.IProjectService;

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

    @RequestMapping(value = "applicationpage", method = RequestMethod.GET)
    public ModelAndView show(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> models = new HashMap<String, Object>();
        models.put("projectapplication", new Object());
        return new ModelAndView(APPLICATION_PAGE, models);
    }

    @RequestMapping(value = "apply", method = RequestMethod.POST)
    public ModelAndView apply(@ModelAttribute("applicationForm") Application application) {

        Boolean result = projectService.projectApplication(application);
         
        DTO dto = new DTO();
        dto.setResult(result);
    	
        Map<String, Object> models = new HashMap<String, Object>();
        models.put("completion", new Object());
        return new ModelAndView(COMPLETION_PAGE, models);
    }

    @RequestMapping(value = "getProvinces", method = RequestMethod.POST)
    public @ResponseBody
    List<Province> getProvinces() {
        return regionService.getProvinces();
    }

    @RequestMapping(value = "getCities", method = RequestMethod.POST)
    public @ResponseBody
    List<City> getCities(Long provinceIndex) {
        return regionService.getCities(provinceIndex);
    }

    @RequestMapping(value = "getDistricts", method = RequestMethod.POST)
    public @ResponseBody
    List<District> getDistricts(Long cityIndex) {
        return regionService.getDistricts(cityIndex);
    }
}
