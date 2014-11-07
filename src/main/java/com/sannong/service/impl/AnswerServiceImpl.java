package com.sannong.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sannong.infrastructure.persistance.entity.Answer;
import com.sannong.infrastructure.persistance.repository.AnswerRepository;
import com.sannong.service.IAnswerService;

@Service
public class AnswerServiceImpl implements IAnswerService {

	@Autowired
	private AnswerRepository answerRepository;

    public List<Answer> getAnswer(Map<String, Object> map) {
        return answerRepository.getAnswer(map);
    }

    public String getQuestionContent(long questionId) {
        return answerRepository.getQuestionContent(questionId);
    }

}
