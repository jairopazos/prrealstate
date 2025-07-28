/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.model.exceptions;

@SuppressWarnings("serial")
public class InstanceNotFoundException extends InstanceException {
    
    public InstanceNotFoundException(String name, Object key) {
    	super(name, key); 	
    }

}
