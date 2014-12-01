package com.sannong.domain.repositories;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sannong.domain.entities.SMS;;

@Repository
@Transactional
public interface SmsRepository {
	
	List<SMS> getNewSMS();
	
	void addNewSMS(SMS sms);
	
	void updateSMS(SMS sms);
	
    void updateSmsByCellphone(SMS sms);
    
    List<SMS> getSmsByCellphoneAndValidationCode(SMS sms);
}
