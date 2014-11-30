package com.sannong.presentation.model;


/**
 * Created by Bright Huang on 11/29/14.
 */
public class Response {
    private int statusCode;                 // refer to ResponseStatus.java
    private String statusDescription;       // refer to ResponseStatus.java

    public Response() {
    }

    public Response(int statusCode, String statusDescription) {
        this.statusCode = statusCode;
        this.statusDescription = statusDescription;
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
}
