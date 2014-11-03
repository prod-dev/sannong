package com.sannong.infrastructure.persistance.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sannong.infrastructure.persistance.entity.Answer;

import java.util.List;
import java.util.Map;

/**
 * answer reporitory
 * @author william zhang
 */
@Repository
@Transactional
public interface AnswerRepository {
	
	Answer getAnswerByUserName(String userName);
	
	void addAnswers(Answer answer);
	
	void updateAnswers(Answer answer);

    public List<Answer> getAnswer(Map<String, Object> map);

    public String getQuestionContent(long questionId );
	
}
