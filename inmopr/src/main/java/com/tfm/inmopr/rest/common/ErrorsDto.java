/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.rest.common;

import java.util.List;

public class ErrorsDto {
	
	private String globalError;
	private List<FieldErrorDto> fieldErrors;
	
	public ErrorsDto(String globalError) {
		this.globalError = globalError;
	}
	
	public ErrorsDto(List<FieldErrorDto> fieldErrors) {

		this.fieldErrors = fieldErrors;
		
	}

	public String getGlobalError() {
		return globalError;
	}

	public void setGlobalError(String globalError) {
		this.globalError = globalError;
	}

	public List<FieldErrorDto> getFieldErrors() {
		return fieldErrors;
	}

	public void setFieldErrors(List<FieldErrorDto> fieldErrors) {
		this.fieldErrors = fieldErrors;
	}

}
