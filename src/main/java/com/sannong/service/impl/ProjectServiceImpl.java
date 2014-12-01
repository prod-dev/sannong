package com.sannong.service.impl;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sannong.domain.factories.MailContentFactory;
import com.sannong.domain.factories.RegionFactory;
import com.sannong.domain.valuetypes.Region;
import com.sannong.domain.valuetypes.RoleType;
import com.sannong.infrastructure.mail.MailAsyncSender;
import com.sannong.domain.entities.Answer;
import com.sannong.domain.entities.Application;
import com.sannong.domain.entities.Comment;
import com.sannong.domain.entities.Question;
import com.sannong.domain.repositories.AnswerRepository;
import com.sannong.domain.repositories.ApplicationRepository;
import com.sannong.domain.repositories.AuthorityRepository;
import com.sannong.domain.repositories.CommentRepository;
import com.sannong.domain.repositories.QuestionRepository;
import com.sannong.domain.repositories.QuestionnaireRepository;
import com.sannong.domain.repositories.UserRepository;
import com.sannong.infrastructure.util.PasswordGenerator;
import com.sannong.service.IProjectService;
import com.sannong.service.ISmsService;


/**
 * project service
 *
 * @author William Zhang
 */
@Service
@Transactional(rollbackFor = Exception.class)
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
    private ISmsService smsService;
    @Autowired
    private RegionFactory regionFactory;
    @Autowired
    private MailContentFactory mailContentFactory;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private MailAsyncSender mailAsyncSender;
    @Autowired
    private CommentRepository commentRepository;

    /**
     * Update answers to answer fields relatively
     *
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

    public boolean updateAnswersAndComment(Answer answer) throws Exception {

        boolean result = true;
        setAnswers(answer);
        try {
            answerRepository.updateAnswers(answer);
            
            if (answer.getComment() != null && answer.getComment().getContent() != null){
            	Timestamp createTime = new Timestamp(System.currentTimeMillis());
            	answer.getComment().setCreateTime(createTime);
            	commentRepository.addComment(answer);
            }
        } catch (Exception e) {
            result = false;
        }
        return result;
    }

    public void sendMailToAdmin(Region region, String applicantName, String timeOfSubmission, String cellphone) {

        String mailContent = mailContentFactory.build(region, applicantName, timeOfSubmission, cellphone);
        mailAsyncSender.sendMail(mailContent);
    }

    public void projectApplication(Application application) {

        //set user information
        Timestamp createTime = new Timestamp(System.currentTimeMillis());
        application.getApplicant().setUpdateTime(createTime);
        application.getApplicant().setCreateTime(createTime);

        String password = PasswordGenerator.generatePassword(6);
        String cellphone = application.getApplicant().getCellphone();
        String encryptedPassword = PasswordGenerator.encryptPassword(password, cellphone);

        application.getApplicant().setPassword(encryptedPassword);
        application.getApplicant().setUserName(cellphone);

        userRepository.addUserInfo(application.getApplicant());

        // set authorities
        Map<String, Object> authorityMap = new HashMap<String, Object>();
        authorityMap.put("userName", cellphone);
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

        // Send email to admin
        Long provinceIndex = application.getApplicant().getCompanyProvince();
        Long cityIndex = application.getApplicant().getCompanyCity();
        Long districtIndex = application.getApplicant().getCompanyDistrict();
        Region region = regionFactory.build(provinceIndex, cityIndex, districtIndex);

        String realName = application.getApplicant().getRealName();
        String timeOfSubmission = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒").format(createTime);

        sendMailToAdmin(region, realName, timeOfSubmission, cellphone);

        // send sms message
        smsService.sendLoginMessage(cellphone, password);
    }

    public Answer getQuestionnaireAndAnswerByCondition(Map<String, Object> map) {

        int questionnaireNo = 1;
        String userName = "";
        Answer answer = null;

        if (map.get("questionnaireNo") != null) {
            questionnaireNo = Integer.parseInt(map.get("questionnaireNo").toString());
        }
        List<Question> questions = questionnaireRepository.getQuestionnaireByNo(questionnaireNo);

        if (map.get("userName") != null) {
            userName = map.get("userName").toString();
        }

        if (map.get("isOnlyShowQuestions") == null || map.get("isOnlyShowQuestions") == "") {
        	answer = answerRepository.getAnswerByUserName(userName);
        	if (answer == null) {
        		answer = new Answer();
        	}
        	
        	String comment = commentRepository.getCommentByCondition(map);
        	answer.setComment(new Comment(comment));
        } else {
        	answer = new Answer();
        }
        
        answer.setQuestions(questions);

        return answer;
    }

    public int getTotalQuestions() {
        return questionRepository.getTotalQuestions();
    }
}
