package com.sannong.infrastructure.persistance.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sannong.infrastructure.persistance.entity.Answer;

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
}
