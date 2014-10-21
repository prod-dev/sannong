package com.sannong.infrastructure.persistance.repository;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sannong.infrastructure.persistance.entity.SMS;;

@Repository
@Transactional
public interface SmsRepository {
	
	List<SMS> getNewSMS();
	void addNewSMS(SMS sms);
}
