package com.sannong.presentation.model;


import java.util.Map;

/**

 * Created by Bright Huang on 11/29/14.
 */
public class Response {
    private boolean result;
    private int statusCode;
    private String statusDescription;
    private Map<String, Object> resultMap;

    public Response() {
    }

    public Response(int statusCode, String statusDescription) {
        this.statusCode = statusCode;
        this.statusDescription = statusDescription;
    }

    public Response(boolean result, int statusCode, String statusDescription, Map<String, Object> resultMap) {
        this.result = result;
        this.statusCode = statusCode;
        this.statusDescription = statusDescription;
        this.resultMap = resultMap;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusDescription() {
        return statusDescription;
    }

    public void setStatusDescription(String statusDescription) {
        this.statusDescription = statusDescription;
    }

    public Map<String, Object> getResultMap() {
        return resultMap;
    }

    public void setResultMap(Map<String, Object> resultMap) {
        this.resultMap = resultMap;
    }
}
