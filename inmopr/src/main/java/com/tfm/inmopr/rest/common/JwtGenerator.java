package com.tfm.inmopr.rest.common;

public interface JwtGenerator {

    String generate(JwtInfo info);

    JwtInfo getInfo(String token);

}
