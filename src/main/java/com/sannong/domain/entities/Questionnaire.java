package com.sannong.domain.entities;

import java.io.Serializable;
import java.util.List;

/**
 * @author william zhang
 * create questionnaire class
 */
public class Questionnaire implements Serializable {

	private static final long serialVersionUID = 4596287948226478700L;
	
	private Long questionnaireId;
	private int questionnaireCategory;
	private List<Question> questions;
	private List<Project> projects;
	
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
	public List<Question> getQuestions() {
		return questions;
	}
	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
	public List<Project> getProjects() {
		return projects;
	}
	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}
	
}
