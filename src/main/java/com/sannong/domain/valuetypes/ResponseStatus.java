package com.sannong.domain.valuetypes;

/**
 * Created by Bright Huang on 11/29/14.
 */
public enum ResponseStatus {
    /**
     * 1000 - 1999, success status
     */
    SUCCESS(1000, "成功"),
    PASSWORD_UPDATED(1001, "密码已更新"),
    /**
     * 2000 - 2999, failure status
     */
    FAILURE(2000, "失败"),
    USER_NOT_FOUND(2001, "用户不存在"),
    PASSWORD_MISMATCH(2002, "密码不正确"),
    OLD_PASSWORD_MISMATCH(2003, "旧密码不匹配"),
    CONFIRMED_PASSWORD_MISMATCH(2004, "新密码与确认密码不匹配");

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
