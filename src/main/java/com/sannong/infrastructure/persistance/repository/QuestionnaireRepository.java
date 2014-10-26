package com.sannong.infrastructure.persistance.repository;

import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface QuestionnaireRepository {
	
	String getAnswerByNameOrCellphone(Map<String,Object> map);
	
}
