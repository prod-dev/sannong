
package com.sannong.infrastructure.persistance.repository;

import java.util.List;
import java.util.Map;

import com.sannong.infrastructure.persistance.entity.Application;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sannong.infrastructure.persistance.entity.User;

@Repository
@Transactional
public interface UserRepository {
	
	List<User> getUserByUserId();
	
	User loginValidation(Map<String,Object> mapObject);
	
	void addUserInfo(User user);
	
	Long getIdByCellphone(String cellphone);
	
	List<User> getUserByCondition(Map<String,Object> map);
	
	void updateUserInfo(User user);

    void updatePassword(User user);

    User getUserById(Long userId);

    User getUserByName(String userName);
    
    List<User> getUserByNameOrCellphone(Map<String,Object> map);
    
    String getUserTotalCount(Map<String,Object> map);

    List<Application> getAnswer(Map<String, Object> map);
}

