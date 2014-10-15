package com.sannong.service;

import java.util.List;

import com.sannong.model.User;

public interface IUserService {
	
	List<User> getUserByAuditorId();
}
