package com.sannong.presentation.model;

import java.util.List;

/**
 * create DTO class
 * @author william zhang
 */
public class DTO {

	public DTO(boolean responseResult, List<Object> dto) {
		
		this.responseResult = responseResult;
		this.dto = dto;
	}

	private boolean responseResult;
	private List<Object> dto;

	public boolean getResult() {
		return responseResult;
	}

	public void setResult(boolean result) {
		this.responseResult = result;
	}

	public List<Object> getResponseObject() {
		return dto;
	}

	public void setResponseObject(List<Object> dto) {
		this.dto = dto;
	}
}
