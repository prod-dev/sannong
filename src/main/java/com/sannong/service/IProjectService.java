package com.sannong.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.sannong.infrastructure.persistance.entity.Answer;
import com.sannong.infrastructure.persistance.entity.Application;

public interface IProjectService {
	
	boolean projectApplication(HttpServletRequest request, Application application) throws Exception;
	
	boolean checkUserNameAvailable(HttpServletRequest request);
    
	Answer getQuestionnaireAndAnswerByCondition(Map<String,Object> map);
	
	boolean updateAnswers(Answer answer) throws Exception;

    boolean validateUniqueCellphone(String phoneNumber);
    
    int getTotalQuestions();
}
