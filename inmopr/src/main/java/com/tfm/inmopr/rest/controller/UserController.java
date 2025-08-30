/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.rest.controller;

import com.tfm.inmopr.model.entities.User;
import com.tfm.inmopr.model.exceptions.DuplicateInstanceException;
import com.tfm.inmopr.model.exceptions.IncorrectLoginException;
import com.tfm.inmopr.model.exceptions.InstanceNotFoundException;
import com.tfm.inmopr.model.exceptions.PermissionException;
import com.tfm.inmopr.model.services.UserService;
import com.tfm.inmopr.rest.common.ErrorsDto;
import com.tfm.inmopr.rest.common.JwtGenerator;
import com.tfm.inmopr.rest.common.JwtInfo;
import com.tfm.inmopr.rest.dtos.AuthenticatedUserDto;
import com.tfm.inmopr.rest.dtos.LoginParamsDto;
import com.tfm.inmopr.rest.dtos.PostDto;
import com.tfm.inmopr.rest.dtos.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Locale;
import java.util.Map;

import static com.tfm.inmopr.rest.dtos.UserConversor.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final static String INCORRECT_LOGIN_EXCEPTION_CODE = "project.exceptions.IncorrectLoginException";
    private final static String INCORRECT_PASSWORD_EXCEPTION_CODE = "project.exceptions.IncorrectPasswordException";
    private final static String DUPLICATE_INSTANCE_EXCEPTION_CODE = "project.exceptions.DuplicateInstanceException";

    @Autowired
    private UserService userService;

    @Autowired
    private JwtGenerator jwtGenerator;

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(IncorrectLoginException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorsDto handleIncorrectLoginException(IncorrectLoginException exception, Locale locale) {

        String errorMessage = messageSource.getMessage(INCORRECT_LOGIN_EXCEPTION_CODE, null,
                INCORRECT_LOGIN_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @ExceptionHandler(DuplicateInstanceException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorsDto handleDuplicateInstanceException(DuplicateInstanceException exception, Locale locale) {

        String nameMessage = messageSource.getMessage(exception.getName(), null, exception.getName(), locale);
        String errorMessage = messageSource.getMessage(DUPLICATE_INSTANCE_EXCEPTION_CODE,
                new Object[] {nameMessage, exception.getKey().toString()}, DUPLICATE_INSTANCE_EXCEPTION_CODE, locale);

        return new ErrorsDto(errorMessage);

    }

    @PostMapping("/login")
    public AuthenticatedUserDto login(@Validated @RequestBody LoginParamsDto params)
            throws IncorrectLoginException {

        User user = userService.login(params.getEmail(), params.getPassword());

        return toAuthenticatedUserDto(generateServiceToken(user), user);

    }

    @PostMapping("/signUp")
    public ResponseEntity<AuthenticatedUserDto> signUp(
            @RequestBody UserDto userDto) throws DuplicateInstanceException {

        User user = toUser(userDto);

        userService.signUp(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(user.getId()).toUri();

        return ResponseEntity.created(location).body(toAuthenticatedUserDto(generateServiceToken(user), user));

    }

    @PutMapping("/{id}")
    public UserDto updateProfile(@RequestAttribute Long userId, @PathVariable Long id,
                                 @Validated({UserDto.UpdateValidations.class}) @RequestBody UserDto userDto)
            throws InstanceNotFoundException, PermissionException, DuplicateInstanceException {

        if (!id.equals(userId)) {
            throw new PermissionException();
        }

        return toUserDto(userService.updateProfile(id, userDto.getFirstName(), userDto.getLastName(),
                userDto.getEmail(), userDto.getBirthDate(), userDto.getPassword(), userDto.getFavorites()));

    }


    private String generateServiceToken(User user) {

        JwtInfo jwtInfo = new JwtInfo(user.getId(), user.getEmail());

        return jwtGenerator.generate(jwtInfo);

    }
}
