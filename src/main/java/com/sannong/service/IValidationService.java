package com.sannong.service;

/**
 * Created by Bright Huang on 11/18/14.
 */
public interface IValidationService {
    public boolean validateUniqueCellphone(String cellphone);

    public boolean validateValidationCode(String cellphone, String validationCode);
}
