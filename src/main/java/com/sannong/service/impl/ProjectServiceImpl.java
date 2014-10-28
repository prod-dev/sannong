package com.sannong.service.impl;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sannong.infrastructure.mail.EmailSender;
import com.sannong.infrastructure.persistance.entity.Application;
import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.infrastructure.persistance.repository.ApplicationRepository;
import com.sannong.infrastructure.persistance.repository.AuthorityRepository;
import com.sannong.infrastructure.persistance.repository.UserRepository;
import com.sannong.infrastructure.util.Config;
import com.sannong.service.IProjectService;
import com.sannong.service.constents.ServiceConstents;

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
	
	@Autowired
	private AuthorityRepository authorityRepository;
	
	public boolean checkUserNameAvailable(HttpServletRequest request)
	{
			String username=request.getParameter("username");
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("userName", username);
			List<User> li=userRepository.getUserByCondition(map);
			if(li.isEmpty())
				return true;
			else 
				return false;
	}
	
	public void emailAdmin()
	{
		Config cfg=new Config();
		String email=cfg.getProperty("newApp-admin-email");
		String content=cfg.getProperty("newApp-email-content");
		EmailSender.sendMail(email, "new application",content, false);
	
	}
	


	public boolean projectApplication(Application application) {
		
		boolean result = true;
		
		try{
			//insert user information begin
			Timestamp createTime = new Timestamp(System.currentTimeMillis()); 
			application.getApplicant().setUpdateTime(createTime);
			application.getApplicant().setCreateTime(createTime);
			userRepository.addUserInfo(application.getApplicant());
			
			
			// email admin
			emailAdmin();
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
			
			//step4: set authrities
			Map<String,Object> authorityMap = new HashMap<String, Object>();
			authorityMap.put("userName", application.getApplicant().getUserName());
			authorityMap.put("authority", ServiceConstents.ROLE_USER);
			authorityRepository.addUserAuthority(authorityMap);
			
			authorityMap.put("userName", application.getApplicant().getCellphone());
			authorityRepository.addUserAuthority(authorityMap);
			//insert application information end
			
			
		}
		catch(Exception e){
			result = false;
		}
		
		return result;
	}

}
