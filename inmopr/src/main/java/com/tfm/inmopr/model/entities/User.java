/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.model.entities;

import com.tfm.inmopr.model.converters.ListToStringConverter;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class User {

    private Long id;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private LocalDate birthDate;
    private List<String> favorites;

    public User() {}

    public User(String firstName, String lastName, String email, String password, LocalDate birthDate, List<String> favorites) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.favorites = favorites;

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    @Convert(converter = ListToStringConverter.class)
    @Column(columnDefinition = "TEXT", nullable = false)
    public List<String> getFavorites() {
        return favorites;
    }

    public void setFavorites(List<String> favorites) {
        this.favorites = favorites;
    }

}
