package com.sannong.service;

import com.sannong.infrastructure.persistance.entity.Answer;

import java.util.List;
import java.util.Map;

/**
 * Created by P0049380 on 14-11-3.
 */
public interface IAnswerService {
    public List<Answer> getAnswer(Map<String, Object> map);
    public String getQuestionContent(long questionId);
}

