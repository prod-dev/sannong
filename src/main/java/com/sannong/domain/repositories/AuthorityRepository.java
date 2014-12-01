package com.sannong.domain.repositories;

import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * answer reporitory
 * @author william zhang
 */
@Repository
@Transactional
public interface AuthorityRepository {
	
	void addUserAuthority(Map<String,Object> authorityMap);
	
}
