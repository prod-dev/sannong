package com.sannong.service.impl;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.sannong.domain.auth.RoleType;
import com.sannong.infrastructure.util.AppConfig;
import com.sannong.infrastructure.util.PasswordGenerator;
import com.sannong.service.ISmsService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sannong.infrastructure.mail.EmailSender;
import com.sannong.infrastructure.persistance.entity.Answer;
import com.sannong.infrastructure.persistance.entity.Application;
import com.sannong.infrastructure.persistance.entity.Question;
import com.sannong.infrastructure.persistance.entity.User;
import com.sannong.infrastructure.persistance.repository.AnswerRepository;
import com.sannong.infrastructure.persistance.repository.ApplicationRepository;
import com.sannong.infrastructure.persistance.repository.AuthorityRepository;
import com.sannong.infrastructure.persistance.repository.QuestionRepository;
import com.sannong.infrastructure.persistance.repository.QuestionnaireRepository;
import com.sannong.infrastructure.persistance.repository.UserRepository;
import com.sannong.service.IProjectService;


/**
 * project service
 * @author William Zhang
 */
@Service
public class ProjectServiceImpl implements IProjectService {

    private static final Logger logger = Logger.getLogger(ProjectServiceImpl.class);

	@Autowired
	private UserRepository userRepository; 
	@Autowired
	private ApplicationRepository applicationRepository;
	@Autowired
	private AuthorityRepository authorityRepository;
	@Autowired
	private QuestionnaireRepository questionnaireRepository;
	@Autowired
	private AnswerRepository answerRepository;
    @Autowired
    private AppConfig appConfig;
    @Autowired
    private ISmsService smsService;
    @Autowired
    private QuestionRepository questionRepository;
	
	public boolean checkUserNameAvailable(HttpServletRequest request)
	{
		String username=request.getParameter("username");
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("userName", username);
		List<User> li=userRepository.getUserByCondition(map);
		if(li.isEmpty()) {
            return true;
        }
		else {
            return false;
        }
	}
	
	/**
	 * Update answers to answer fields relatively
	 * @param answer
	 * @author William Zhang
	 */
	private void setAnswers(Answer answer) {
		
		int questionnaireNo = answer.getQuestionnaireNo();
		StringBuffer sb = new StringBuffer();

		for (String answerString : answer.getAnswers()) {
			sb.append(answerString + ";");
		}
		String answers = sb.toString().substring(0,
				sb.toString().length() - 1);
		
		switch (questionnaireNo) {
			case 1:
				answer.setQuestionnaire1Answers(answers);
				break;
			case 2:
				answer.setQuestionnaire2Answers(answers);
				break;
			case 3:
				answer.setQuestionnaire3Answers(answers);
				break;
			case 4:
				answer.setQuestionnaire4Answers(answers);
				break;
			case 5:
				answer.setQuestionnaire5Answers(answers);
				break;
			default:
				answer.setQuestionnaire1Answers(answers);
				break;
		}
	}
	
    public boolean updateAnswers(Answer answer) throws Exception {
		
		boolean result = true;
		setAnswers(answer);
		try {
			answerRepository.updateAnswers(answer);
		} catch (Exception e) {
			result = false;
		}
		return result;
	}
	
	public void emailAdmin(){
		String email = appConfig.getProperty("newApp-admin-email");
		String content = appConfig.getProperty("newApp-email-content");
		EmailSender.sendMail(email, "new application",content, false);
	
	}

	public boolean projectApplication(HttpServletRequest request, Application application)  {

		boolean result = true;

		try {
			//set user information
			Timestamp createTime = new Timestamp(System.currentTimeMillis());
			application.getApplicant().setUpdateTime(createTime);
			application.getApplicant().setCreateTime(createTime);

            String password = PasswordGenerator.generatePassword(6);
            String username = application.getApplicant().getCellphone();
            String encryptedPassword = PasswordGenerator.encryptPassword(password, username);

            application.getApplicant().setPassword(encryptedPassword);
            application.getApplicant().setUserName(username);

			userRepository.addUserInfo(application.getApplicant());

            // set authorities
            Map<String, Object> authorityMap = new HashMap<String, Object>();
            authorityMap.put("userName", username);
            authorityMap.put("authority", RoleType.ROLE_USER.toString());
            authorityRepository.addUserAuthority(authorityMap);
            
            //retrieve applicant id and add to application
			Long applicantId = userRepository.getIdByCellphone(application
					.getApplicant().getCellphone());
			application.getApplicant().setUserId(applicantId);
			
			// set application info
			application.setApplicationDate(createTime);
			applicationRepository.addProjectApplicationInfo(application);

			//set answers to answer object
			Answer answer = new Answer();
			answer.setAnswers(application.getAnswers());
			answer.setQuestionnaireNo(1);  //project application just have questionnaire number one
			answer.setApplicant(application.getApplicant());
			answer.setAnswerStatus(11);  //the first applicantion submit
			answer.setApplication(application);  //set application_id in answers
			setAnswers(answer);
			
			// set answers info
			answerRepository.addAnswers(answer);

            //smsService.

			// email admin
			emailAdmin();

            smsService.sendLoginMessage(request);

		} catch (Exception e) {

            logger.error(e.getMessage());

			result = false;
		}
		
		return result;
	}

    public Answer getQuestionnaireAndAnswerByCondition(Map<String,Object> map) {
		
		int questionnaireNo = 1;
		String userName = "";
		
		if (map.get("questionnaireNo") != null){
			questionnaireNo = Integer.parseInt(map.get("questionnaireNo").toString());
		}
		List<Question> questions = questionnaireRepository.getQuestionnaireByNo(questionnaireNo);
		
		if (map.get("userName") != null){
			userName = map.get("userName").toString();
		}
		
		Answer answer = answerRepository.getAnswerByUserName(userName);
		if (answer == null){
			answer = new Answer();
		}
		answer.setQuestions(questions);
		
		return answer; 
	}

	public boolean validateUniqueCellphone(String cellphone) {
        Map<String, Object> map = new HashMap<String,Object>();
        map.put("cellphone", cellphone);
        List<User> users = userRepository.getUserByCondition(map);
        if (users.size() > 0){
            return false;
        }
        return true;
    }
	
	public int getTotalQuestions() {
		return questionRepository.getTotalQuestions();
	}
}
