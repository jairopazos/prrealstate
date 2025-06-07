package com.tfm.inmopr.model.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Estado {
    obra_nueva("Obra nueva"),
    buen_estado("Buen estado"),
    a_reformar("A reformar");

    private final String displayName;

    Estado(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static Estado fromString(String value) {
        for (Estado estado : Estado.values()) {
            if (estado.displayName.equalsIgnoreCase(value) || estado.name().equalsIgnoreCase(value)) {
                return estado;
            }
        }
        throw new IllegalArgumentException("Invalid value for Estado: " + value);
    }
}
