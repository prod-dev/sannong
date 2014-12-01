package com.sannong.domain.entities;

import java.io.Serializable;
import java.util.List;

/**
 * @author william zhang
 * create answer class
 */
public class Answer implements Serializable{

	private static final long serialVersionUID = 4282850771969955235L;
	
	private Long answerId;
	private String questionnaire1Answers;
	private String questionnaire2Answers;
	private String questionnaire3Answers;
	private String questionnaire4Answers;
	private String questionnaire5Answers;
	private int answerStatus;
	private User applicant;
	private Application application;
	private List<String> answers;
	private int questionnaireNo;
	private List<Question> questions;
	private Comment comment;
	
	public Comment getComment() {
		return comment;
	}
	public void setComment(Comment comment) {
		this.comment = comment;
	}
	public List<Question> getQuestions() {
		return questions;
	}
	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
	public List<String> getAnswers() {
		return answers;
	}
	public void setAnswers(List<String> answers) {
		this.answers = answers;
	}
	public int getQuestionnaireNo() {
		return questionnaireNo;
	}
	public void setQuestionnaireNo(int questionnaireNo) {
		this.questionnaireNo = questionnaireNo;
	}
	public String getQuestionnaire1Answers() {
		return questionnaire1Answers;
	}
	public void setQuestionnaire1Answers(String questionnaire1Answers) {
		this.questionnaire1Answers = questionnaire1Answers;
	}
	public String getQuestionnaire2Answers() {
		return questionnaire2Answers;
	}
	public void setQuestionnaire2Answers(String questionnaire2Answers) {
		this.questionnaire2Answers = questionnaire2Answers;
	}
	public String getQuestionnaire3Answers() {
		return questionnaire3Answers;
	}
	public void setQuestionnaire3Answers(String questionnaire3Answers) {
		this.questionnaire3Answers = questionnaire3Answers;
	}
	public String getQuestionnaire4Answers() {
		return questionnaire4Answers;
	}
	public void setQuestionnaire4Answers(String questionnaire4Answers) {
		this.questionnaire4Answers = questionnaire4Answers;
	}
	public String getQuestionnaire5Answers() {
		return questionnaire5Answers;
	}
	public void setQuestionnaire5Answers(String questionnaire5Answers) {
		this.questionnaire5Answers = questionnaire5Answers;
	}
	public int getAnswerStatus() {
		return answerStatus;
	}
	public void setAnswerStatus(int answerStatus) {
		this.answerStatus = answerStatus;
	}
	public Long getAnswerId() {
		return answerId;
	}
	public void setAnswerId(Long answerId) {
		this.answerId = answerId;
	}
	public Application getApplication() {
		return application;
	}
	public void setApplication(Application application) {
		this.application = application;
	}
	public User getApplicant() {
		return applicant;
	}
	public void setApplicant(User applicant) {
		this.applicant = applicant;
	}
}
