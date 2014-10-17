package com.sannong.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sannong.model.User;

@Repository
@Transactional
public interface UserMapper {
	
	List<User> getUserByAuditorId();
	
	User loginValidation(Map<String,Object> mapObject);
	
	void addUserInfo(User user);
}
