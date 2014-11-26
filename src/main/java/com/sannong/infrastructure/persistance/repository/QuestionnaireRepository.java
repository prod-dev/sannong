package com.sannong.infrastructure.persistance.repository;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sannong.infrastructure.persistance.entity.Question;

/**
 * answer reporitory
 * @author william zhang
 */
@Repository
@Transactional
public interface QuestionnaireRepository {
	
	List<Question> getQuestionnaireByNo(int questionnaireNo);
	
}
