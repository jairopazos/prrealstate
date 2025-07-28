/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.rest.common;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtGeneratorImpl implements JwtGenerator {

    @Value("${project.jwt.signKey}")
    private String signKey;

    @Value("${project.jwt.expirationMinutes}")
    private long expirationMinutes;

    @Override
    public String generate(JwtInfo info) {

        return Jwts.builder()
                .claim("userId", info.getUserId())
                .claim("email", info.getEmail())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMinutes*60*1000))
                .signWith(SignatureAlgorithm.HS512, signKey.getBytes())
                .compact();

    }

    @Override
    public JwtInfo getInfo(String token) {

        Claims claims = Jwts.parser()
                .setSigningKey(signKey.getBytes())
                .parseClaimsJws(token)
                .getBody();

        return new JwtInfo(
                ((Integer) claims.get("userId")).longValue(),
                (String) claims.get("email"));

    }

}
