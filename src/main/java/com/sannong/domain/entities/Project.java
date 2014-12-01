package com.sannong.domain.entities;

import java.io.Serializable;

/**
 * @author william zhang
 * create project class
 */
public class Project implements Serializable {

	private static final long serialVersionUID = 915394831604517833L;

	private Long projectId;
	private Long projectName;
	private String projectDesc;
	
	public Long getProjectId() {
		return projectId;
	}
	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}
	public Long getProjectName() {
		return projectName;
	}
	public void setProjectName(Long projectName) {
		this.projectName = projectName;
	}
	public String getProjectDesc() {
		return projectDesc;
	}
	public void setProjectDesc(String projectDesc) {
		this.projectDesc = projectDesc;
	}
}
