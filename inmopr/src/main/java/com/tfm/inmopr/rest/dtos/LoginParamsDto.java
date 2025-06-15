package com.tfm.inmopr.rest.dtos;


public class LoginParamsDto {

private String email;
private String password;

public LoginParamsDto() {}

public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email.trim();
}

public String getPassword() {
    return password;
}

public void setPassword(String password) {
    this.password = password;
}

}