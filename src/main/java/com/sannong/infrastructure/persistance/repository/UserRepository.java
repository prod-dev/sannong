package com.sannong.infrastructure.persistance.repository;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sannong.infrastructure.persistance.entity.User;

@Repository
@Transactional
public interface UserRepository {
	
	List<User> getUserByAuditorId();
	
	User loginValidation(Map<String,Object> mapObject);
	
	void addUserInfo(User user);
}
