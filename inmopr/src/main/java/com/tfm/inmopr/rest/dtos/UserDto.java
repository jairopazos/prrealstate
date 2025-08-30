/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.rest.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public class UserDto {
    public interface AllValidations {}

    public interface UpdateValidations {}

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate birthDate;
    private String password;
    private List<String> favorites;

    public UserDto() {}

    public UserDto(Long id, String firstName, String lastName, String email, LocalDate birthDate, String password,
       List<String> favorites) {

        this.id = id;
        this.firstName = firstName.trim();
        this.lastName = lastName.trim();
        this.email = email.trim();
        this.birthDate = birthDate;
        this.password = password;
        this.favorites = favorites;

    }

    @NotNull(groups={AllValidations.class, UpdateValidations.class})
    @Size(min=1, max=60, groups={AllValidations.class, UpdateValidations.class})
    @Email(groups={AllValidations.class, UpdateValidations.class})
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email.trim();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotNull(groups={AllValidations.class})
    @Size(min=1, max=60, groups={AllValidations.class})
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @NotNull(groups={AllValidations.class, UpdateValidations.class})
    @Size(min=1, max=60, groups={AllValidations.class, UpdateValidations.class})
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName.trim();
    }

    @NotNull(groups={AllValidations.class, UpdateValidations.class})
    @Size(min=1, max=60, groups={AllValidations.class, UpdateValidations.class})
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName.trim();
    }

    @NotNull(groups={AllValidations.class, UpdateValidations.class})
    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public List<String> getFavorites() {
        return favorites;
    }

    public void setUrls(List<String> favorites) {
        this.favorites = favorites;
    }



}
