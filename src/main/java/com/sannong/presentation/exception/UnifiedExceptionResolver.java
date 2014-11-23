package com.sannong.presentation.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by Bright Huang on 11/7/14.
 */
@Component
public class UnifiedExceptionResolver implements HandlerExceptionResolver {

    private static final String ERROR_PAGE = "error";

    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response,
                                         Object handler, Exception ex) {

        return new ModelAndView(ERROR_PAGE);
    }

}
