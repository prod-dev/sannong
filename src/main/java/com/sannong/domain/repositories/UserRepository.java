
package com.sannong.domain.repositories;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sannong.domain.entities.User;

@Repository
@Transactional
public interface UserRepository {
	
	void addUserInfo(User user);
	
	Long getIdByCellphone(String cellphone);
	
	List<User> getUserByCondition(Map<String,Object> map);
	
	void updateUserInfo(User user);

    void updatePassword(User user);

    List<User> getUserByFuzzyMatch(Map<String,Object> map);
    
    int getUserTotalCount(Map<String,Object> map);

    String getUserNameByCellphone(String cellphone);
}

