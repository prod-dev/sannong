package com.sannong.presentation.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Bright Huang on 11/19/14.
 */
public class RequestWrapper extends HttpServletRequestWrapper {
    private Map<String, String> paramMap = new HashMap<String, String>();
    /**
     * Constructs a request object wrapping the given request.
     *
     * @param request
     * @throws IllegalArgumentException if the request is null
     */
    public RequestWrapper(HttpServletRequest request) {
        super(request);
    }

    public String getParameter(String name) {
        if ( paramMap.get(name) != null ) {
            return paramMap.get(name);
        }else{
            return super.getParameter(name);
        }
    }

    public void addParameter( String name, String value ) {
        paramMap.put(name, value);
    }

    public Map getParamMap(){
        return paramMap;
    }

}
