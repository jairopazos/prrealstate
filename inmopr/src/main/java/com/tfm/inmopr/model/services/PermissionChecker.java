/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.model.services;


import com.tfm.inmopr.model.entities.User;
import com.tfm.inmopr.model.exceptions.InstanceNotFoundException;
import com.tfm.inmopr.model.exceptions.PermissionException;

public interface PermissionChecker {
	
	public void checkUserExists(Long userId) throws InstanceNotFoundException;
	
	public User checkUser(Long userId) throws InstanceNotFoundException;

}
