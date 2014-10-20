package com.sannong.infrastructure.persistance.entity;

import java.io.Serializable;

/**
 * @author william zhang
 * create questionnaire class
 */
public class Questionnaire implements Serializable {

	private static final long serialVersionUID = 4596287948226478700L;
	
	private Long questionnaireId;
	private int questionnaireCategory;
	private Long questionId;
	private Long projectId;
	
	public Long getQuestionnaireId() {
		return questionnaireId;
	}
	public void setQuestionnaireId(Long questionnaireId) {
		this.questionnaireId = questionnaireId;
	}
	public int getQuestionnaireCategory() {
		return questionnaireCategory;
	}
	public void setQuestionnaireCategory(int questionnaireCategory) {
		this.questionnaireCategory = questionnaireCategory;
	}
	public Long getQuestionId() {
		return questionId;
	}
	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}
	public Long getProjectId() {
		return projectId;
	}
	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}
}
