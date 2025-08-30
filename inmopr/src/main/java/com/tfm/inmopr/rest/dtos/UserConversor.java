/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.rest.dtos;

import com.tfm.inmopr.model.entities.User;

public class UserConversor {

    public final static UserDto toUserDto(User user) {
        return new UserDto(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getBirthDate(), user.getPassword(),
                user.getFavorites());
    }

    public final static AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {

        return new AuthenticatedUserDto(serviceToken, toUserDto(user));

    }

    public final static User toUser(UserDto userDto) {

        return new User(userDto.getFirstName(), userDto.getLastName(), userDto.getEmail(), userDto.getPassword(), userDto.getBirthDate(),
                userDto.getFavorites());
    }

}
