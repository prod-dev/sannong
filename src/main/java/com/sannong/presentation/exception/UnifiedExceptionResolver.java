package com.sannong.presentation.exception;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Bright Huang on 11/7/14.
 */
public class UnifiedExceptionResolver implements HandlerExceptionResolver {

    private static final Logger logger = Logger.getLogger(UnifiedExceptionResolver.class);
    private static final String ERROR_PAGE = "error";

    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response,
                                         Object handler, Exception ex) {

        Map<String, Object> models = new HashMap<String, Object>();

        if (ex instanceof org.springframework.web.HttpRequestMethodNotSupportedException) {
            logger.error("Http Method Error >>> "  + ex.getMessage());
        } else if (ex instanceof Exception){
            logger.error("Error >>> "  + ex.getMessage() );
        }

        models.put("error", ex.getMessage());
        return new ModelAndView(ERROR_PAGE, models);
    }

}
