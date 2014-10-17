package com.sannong.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sannong.dao.UserMapper;
import com.sannong.model.User;
import com.sannong.service.IUserService;

@Service
public class UserServiceImpl implements IUserService{

	@Autowired
	private UserMapper userMapper;
	
	@Override
	public boolean loginValidation(String phoneNumber, String password) {
		boolean result = false;
		
		Map<String,Object> mapObject = new HashMap<String,Object>();
		mapObject.put("phoneNumber", phoneNumber);
		mapObject.put("password", password);
		
		User user = userMapper.loginValidation(mapObject);
		
		if (user != null) {
			result = true;
		}
		
		return result;
	}

	@Override
	public boolean addUserInfo(User user) {
		boolean result = false;
		
		try {
			userMapper.addUserInfo(user);
			result = true;
		}
		catch(Exception e) {
			
		}
		
		return result;
	}

	@Override
	public List<User> getUserByAuditorId() {
		
		return userMapper.getUserByAuditorId();
	}

}
