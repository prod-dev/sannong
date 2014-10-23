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

    public List<User> getUserByUserId() {

		return userRepository.getUserByUserId();
	}

    @Override
    public List<User> getUserByUserNameOrCellphone(Map<String, String> map) {
        return userRepository.getUserByUserNameOrCellphone(map);
    }

    public User getUserByName(String userName) {
        return userRepository.getUserByName(userName);
    }

    public User getUserById(Long userId) {
        return userRepository.getUserById(userId);
    }

    public boolean updatePassword(User user) throws Exception {
        try{
            userRepository.updatePassword(user);
            return true;
        }catch(Exception e){
            throw e;
        }
    }

	public boolean  updateUser(User user) throws Exception {
			try
			{
				userRepository.updateUserInfo(user);
				return true;
			}catch(Exception e){
				throw e;
			}		 
	}
}
