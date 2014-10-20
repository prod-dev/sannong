package com.sannong.infrastructure.persistance.entity;

import java.io.Serializable;

/**
 * @author william zhang
 * create answer class
 */
public class Answer implements Serializable {

	private static final long serialVersionUID = -8850506722269650200L;

	private Long answerId;
	private Long applicationId;
	private Long userId;
	private Long questionnaireId;
	private String answerContent;
	public Long getAnswerId() {
		return answerId;
	}
	public void setAnswerId(Long answerId) {
		this.answerId = answerId;
	}
	public Long getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(Long applicationId) {
		this.applicationId = applicationId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getQuestionnaireId() {
		return questionnaireId;
	}
	public void setQuestionnaireId(Long questionnaireId) {
		this.questionnaireId = questionnaireId;
	}
	public String getAnswerContent() {
		return answerContent;
	}
	public void setAnswerContent(String answerContent) {
		this.answerContent = answerContent;
	}
}
