package com.sannong.domain.valuetypes;

/**
 * Created by Bright Huang on 11/29/14.
 */
public enum ResponseStatus {
    PASSWORD_UPDATED(1000, "密码已更新"),
    USER_NOT_FOUND(2000, "用户不存在"),
    PASSWORD_MISMATCH(2001, "密码不正确"),
    OLD_PASSWORD_MISMATCH(2002, "当前密码不匹配"),
    CONFIRMED_PASSWORD_MISMATCH(2003, "新密码与确认密码不匹配");

    private int statusCode;
    private String statusDescription;

    private ResponseStatus(int statusCode, String statusDescription) {
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
