package com.sannong.service;

import java.util.List;
import java.util.Map;

import com.sannong.infrastructure.persistance.entity.User;

public interface IUserService {
	
	public List<User> getUserByUserId();

	public boolean loginValidation(String phoneNumber, String password);
	
	public boolean addUserInfo(User user);

    public List<User> getUserByCondition(Map<String, Object> map);
    
    public List<User> getUserByNameOrCellphone(Map<String, Object> map);

    public User getUserByName(String userName);

    public User getUserById(Long userId);
    
    public boolean updateUser(User user) throws Exception;

    public boolean updatePassword(User user) throws Exception;
    
    public String getAnswerByCellphone(String cellphone) throws Exception;
    
    public String getUserTotalCount(Map<String,Object> map) throws Exception;
}
