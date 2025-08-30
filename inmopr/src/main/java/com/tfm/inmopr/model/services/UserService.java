/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.model.services;

import com.tfm.inmopr.model.entities.User;
import com.tfm.inmopr.model.exceptions.DuplicateInstanceException;
import com.tfm.inmopr.model.exceptions.IncorrectLoginException;
import com.tfm.inmopr.model.exceptions.InstanceNotFoundException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserService {

    User login(String email, String password) throws IncorrectLoginException;

    void signUp(User user) throws DuplicateInstanceException;

    User updateProfile(Long id, String firstName, String lastName, String email, LocalDate birthDate, String password,
           List<String> favorites) throws DuplicateInstanceException, InstanceNotFoundException;

    Optional<User> findById(Long id);

}
