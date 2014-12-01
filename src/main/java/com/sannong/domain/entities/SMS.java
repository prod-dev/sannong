package com.sannong.domain.entities;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * @author william zhang
 * create sms class
 */
public class SMS implements Serializable {

	private static final long serialVersionUID = -5119299893247639411L;
	
	private Long smsId;
	private Long userId;
	private String smsValidationCode;
	private Timestamp sendTime;
	private String cellphone;
	private String smsContent;
	private int smsStatus;
	
	public Long getSmsId() {
		return smsId;
	}
	public void setSmsId(Long smsId) {
		this.smsId = smsId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getSmsValidationCode() {
		return smsValidationCode;
	}
	public void setSmsValidationCode(String smsValidationCode) {
		this.smsValidationCode = smsValidationCode;
	}
	public Timestamp getSendTime() {
		return sendTime;
	}
	public void setSendTime(Timestamp sendTime) {
		this.sendTime = sendTime;
	}
	public String getCellphone() {
		return cellphone;
	}
	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}
	public String getSmsContent() {
		return smsContent;
	}
	public void setSmsContent(String smsContent) {
		this.smsContent = smsContent;
	}
	public int getSmsStatus() {
		return smsStatus;
	}
	public void setSmsStatus(int smsStatus) {
		this.smsStatus = smsStatus;
	}
}
