package com.sannong.domain.entities;

import java.io.Serializable;

/**
 * create question class
 * @author william zhang
 */
public class Question implements Serializable{

	private static final long serialVersionUID = 2034044773239432861L;

	private Long questionId;
	private String option1;
	private String option2;
	private String option3;
	private String option4;
	private String option5;
	private String questionContent;
	private String questionNumber;
	private int isSingle;
	
	public int getIsSingle() {
		return isSingle;
	}
	public void setIsSingle(int isSingle) {
		this.isSingle = isSingle;
	}
	public Long getQuestionId() {
		return questionId;
	}
	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}
	public String getOption1() {
		return option1;
	}
	public void setOption1(String option1) {
		this.option1 = option1;
	}
	public String getOption2() {
		return option2;
	}
	public void setOption2(String option2) {
		this.option2 = option2;
	}
	public String getOption3() {
		return option3;
	}
	public void setOption3(String option3) {
		this.option3 = option3;
	}
	public String getOption4() {
		return option4;
	}
	public void setOption4(String option4) {
		this.option4 = option4;
	}
	public String getQuestionContent() {
		return questionContent;
	}
	public void setQuestionContent(String questionContent) {
		this.questionContent = questionContent;
	}
	public String getOption5() {
		return option5;
	}
	public void setOption5(String option5) {
		this.option5 = option5;
	}
	public String getQuestionNumber() {
		return questionNumber;
	}
	public void setQuestionNumber(String questionNumber) {
		this.questionNumber = questionNumber;
	}

}
