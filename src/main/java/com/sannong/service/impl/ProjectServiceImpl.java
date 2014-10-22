package com.sannong.service.impl;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sannong.infrastructure.persistance.entity.Application;
import com.sannong.infrastructure.persistance.repository.ApplicationRepository;
import com.sannong.infrastructure.persistance.repository.UserRepository;
import com.sannong.service.IProjectService;

/**
 * project service
 * @author William Zhang
 */
@Service
public class ProjectServiceImpl implements IProjectService {

	@Autowired
	private UserRepository userRepository; 
	
	@Autowired
	private ApplicationRepository applicationRepository;

	public boolean projectApplication(Application application) {
		
		boolean result = true;
		
		try{
			//insert user information begin
			Timestamp createTime = new Timestamp(System.currentTimeMillis()); 
			application.getApplicant().setUpdateTime(createTime);
			userRepository.addUserInfo(application.getApplicant());
			//insert user information end
			
			//insert application information begin
			//step1: set answers
			StringBuffer sb = new StringBuffer();
			for (String answer : application.getAnswers()) {
				sb.append(answer + ";");
			}
			String answers = sb.toString().substring(0, sb.toString().length() - 1);
			application.setQuestionnaireAnswer(answers);
			
			//step2: retrieve applicant id and add to application
			Long applicantId = userRepository.getIdByCellphone(application.getApplicant().getCellphone());
			application.getApplicant().setUserId(applicantId);
			
			//setp3: set application date time
			application.setApplicationDate(createTime);
			
			applicationRepository.addProjectApplicationInfo(application);
			//insert application information end
		}
		catch(Exception e){
			result = false;
		}
		
		return result;
	}

}
