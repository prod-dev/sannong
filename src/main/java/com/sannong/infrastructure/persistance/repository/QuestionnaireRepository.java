package com.sannong.infrastructure.persistance.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface QuestionnaireRepository {
	
	String getAnswerByCellphone(String cellphone);
	
}
