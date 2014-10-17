package com.sannong.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sannong.infrastructure.persistance.repository.UserRepository;
import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.service.IUserService;

@Service
public class UserServiceImpl implements IUserService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public boolean loginValidation(String phoneNumber, String password) {
		boolean result = false;
		
		Map<String,Object> mapObject = new HashMap<String,Object>();
		mapObject.put("phoneNumber", phoneNumber);
		mapObject.put("password", password);
		
		User user = userRepository.loginValidation(mapObject);
		
		if (user != null) {
			result = true;
		}
		
		return result;
	}

	@Override
	public boolean addUserInfo(User user) {
		boolean result = false;
		
		try {
            userRepository.addUserInfo(user);
			result = true;
		}
		catch(Exception e) {
			
		}
		
		return result;
	}

	@Override
	public List<User> getUserByAuditorId() {
		
		return userRepository.getUserByAuditorId();
	}

}
