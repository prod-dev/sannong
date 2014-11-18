package com.sannong.service;

import com.sannong.infrastructure.persistance.entity.Answer;
import com.sannong.infrastructure.persistance.entity.Application;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface IProjectService {

    boolean projectApplication(HttpServletRequest request, Application application) throws Exception;

    Answer getQuestionnaireAndAnswerByCondition(Map<String, Object> map);

    boolean updateAnswers(Answer answer) throws Exception;

    int getTotalQuestions();
}
