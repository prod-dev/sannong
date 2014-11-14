package com.sannong.infrastructure.persistance.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sannong.infrastructure.persistance.entity.Application;

/**
 * answer reporitory
 * @author william zhang
 */
@Repository
@Transactional
public interface ApplicationRepository {
	
	void addProjectApplicationInfo(Application application);
	
}
