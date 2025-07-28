/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.model.exceptions;

@SuppressWarnings("serial")
public class IncorrectLoginException extends Exception {

    private String email;
    private String password;

    public IncorrectLoginException(String email, String password) {

        this.email = email;
        this.password = password;

    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
