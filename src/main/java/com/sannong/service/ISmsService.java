package com.sannong.service;

import com.sannong.infrastructure.persistance.entity.SMS;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by Bright Huang on 10/22/14.
 */
public interface ISmsService {

    public boolean updateSMS(HttpServletRequest request);
    public List<SMS> getNewSMS();
    public boolean generateCode(HttpServletRequest request);
    public int validateSMSCode(HttpServletRequest request);
    public Long getMaxSmsIdByCellphone(HttpServletRequest request);
    public String sendValidationCode(String cellphone, String validationCode);
    public String sendLoginMessage(String cellphone, String password);
    public String sendNewPasswordMessage(String cellphone, String password);
}
