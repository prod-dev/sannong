package com.sannong.domain.entities;

import java.io.Serializable;

/**
 * @author william zhang
 * create role class
 */
public class Role implements Serializable{

	private static final long serialVersionUID = 2122109350538526358L;

	private Long roleId;
	private Long userId;
	private String roleType;
	private String userName;
	
	public Long getRoleId() {
		return roleId;
	}
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getRoleType() {
		return roleType;
	}
	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
}
