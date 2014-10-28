package com.sannong.service;

import javax.servlet.http.HttpServletRequest;

import com.sannong.infrastructure.persistance.entity.Application;

public interface IProjectService {
	
	public boolean projectApplication(Application application);
	public boolean checkUserNameAvailable(HttpServletRequest request);
	
}
