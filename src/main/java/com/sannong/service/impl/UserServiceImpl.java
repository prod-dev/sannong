package com.sannong.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.infrastructure.persistance.repository.QuestionnaireRepository;
import com.sannong.infrastructure.persistance.repository.UserRepository;
import com.sannong.service.IUserService;

@Service
public class UserServiceImpl implements IUserService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private QuestionnaireRepository questionnaireRepository;
	

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

	public List<User> getUserByCondition(Map<String, Object> map) {
    	return userRepository.getUserByCondition(map);
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

	public String getAnswerByCellphone(String cellphone) throws Exception {
		return questionnaireRepository.getAnswerByCellphone(cellphone);
	}
	
	public List<User> getUserByNameOrCellphone(Map<String, Object> map) {
		return userRepository.getUserByNameOrCellphone(map);
	}


	public String getUserTotalCount(Map<String, Object> map) throws Exception {
		return userRepository.getUserTotalCount(map);
	}
	
}
