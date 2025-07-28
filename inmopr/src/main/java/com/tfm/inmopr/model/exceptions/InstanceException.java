/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.model.exceptions;

@SuppressWarnings("serial")
public abstract class InstanceException extends Exception {
    
    private String name;
    private Object key;
    
    protected InstanceException(String message) {
    	super(message);
    }
    
    public InstanceException(String name, Object key) {
    	
		this.name = name;
		this.key = key;
		
	}

	public String getName() {
		return name;
	}

	public Object getKey() {
		return key;
	}

}
