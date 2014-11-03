package com.sannong.service.impl;

import com.sannong.infrastructure.persistance.entity.Answer;
import com.sannong.infrastructure.persistance.repository.AnswerRepository;
import com.sannong.service.IAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnswerServiceImpl implements IAnswerService {

	@Autowired
	private AnswerRepository answerRepository;

    @Override
    public List<Answer> getAnswer(Map<String, Object> map) {
        return answerRepository.getAnswer(map);
    }

    @Override
    public String getQuestionContent(long questionId) {
        return answerRepository.getQuestionContent(questionId);
    }

}
