package com.sannong.presentation.model;

import java.util.List;

public class DTO {

	private boolean responseResult;

	List<Object> dto;

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
