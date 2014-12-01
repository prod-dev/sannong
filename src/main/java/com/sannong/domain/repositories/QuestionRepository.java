package com.sannong.domain.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * question reporitory
 * @author william zhang
 */
@Repository
@Transactional
public interface QuestionRepository {
	
	int getTotalQuestions();
}
