package com.sannong.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sannong.model.User;

@Repository
@Transactional
public interface UserMapper {
	
	List<User> getUserByAuditorId();
}
