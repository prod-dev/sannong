package com.sannong.service.impl;

import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.infrastructure.persistance.repository.UserRepository;
import com.sannong.infrastructure.util.PasswordGenerator;
import com.sannong.service.ISmsService;
import com.sannong.service.IUserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getUserByCondition(Map<String, Object> map) {
        return userRepository.getUserByCondition(map);
    }

    public boolean updatePassword(User user) throws Exception {
        try {
            userRepository.updatePassword(user);
            return true;
        } catch (Exception e) {
            throw e;
        }
    }

    public boolean updateUser(User user) throws Exception {
        try {
            userRepository.updateUserInfo(user);
            return true;
        } catch (Exception e) {
            throw e;
        }
    }

    public List<User> getUserByFuzzyMatch(Map<String, Object> map) {
        return userRepository.getUserByFuzzyMatch(map);
    }

    public String getUserTotalCount(Map<String, Object> map) throws Exception {
        return userRepository.getUserTotalCount(map);
    }

    public String getUserNameByCellphone(String cellphone) throws Exception{
        return userRepository.getUserNameByCellphone(cellphone);
    }
}
