/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.rest.common;

public interface JwtGenerator {

    String generate(JwtInfo info);

    JwtInfo getInfo(String token);

}
