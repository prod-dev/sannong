
package com.sannong.infrastructure.persistance.repository;

import java.util.List;
import java.util.Map;

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
	
	List<User> getUserByUserNameOrCellphone(Map<String,String> map);
	
	void updateUserInfo(User user);

    void updatePassword(User user);

    User getUserById(Long userId);

    User getUserByName(String userName);
	
}

