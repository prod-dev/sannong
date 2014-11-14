package com.sannong.presentation.model;


/**
 * create DTO class
 * @author william zhang
 */
public class DTO {

	public DTO(boolean responseResult, String returnValue) {
		
		this.responseResult = responseResult;
		this.returnValue = returnValue;
	}

	private boolean responseResult;
	private String returnValue;

	public String getReturnValue() {
		return returnValue;
	}

	public void setReturnValue(String returnValue) {
		this.returnValue = returnValue;
	}

	public boolean getResult() {
		return responseResult;
	}

	public void setResult(boolean result) {
		this.responseResult = result;
	}
}
