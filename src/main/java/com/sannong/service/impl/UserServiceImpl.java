package com.sannong.service.impl;

import java.util.List;

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
	public List<User> getUserByAuditorId() {
		
		return userMapper.getUserByAuditorId();
	}

}
