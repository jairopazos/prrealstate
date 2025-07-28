package com.tfm.inmopr.model.converters;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Converter
public class ListToStringConverter implements AttributeConverter<List<String>, String> {

    @Override
    public String convertToDatabaseColumn(List<String> list) {
        if (list == null || list.isEmpty()) {
            return "[]"; // JSON array vacío
        }
        return "[\"" + String.join("\",\"", list) + "\"]";
    }

    @Override
    public List<String> convertToEntityAttribute(String json) {
        if (json == null || json.trim().isEmpty() || json.equals("[]")) {
            return List.of();
        }

        // Elimina los corchetes iniciales y finales
        String content = json.substring(1, json.length() - 1).trim();

        // Si la cadena está vacía después de eliminar los corchetes, devuelve una lista vacía
        if (content.isEmpty()) {
            return List.of();
        }

        // Reemplaza las comas dentro de las comillas por un carácter de separación seguro
        String[] parts = content.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

        // Elimina las comillas alrededor de cada elemento
        return Arrays.stream(parts)
                .map(s -> s.replace("\"", "").trim())
                .collect(Collectors.toList());
    }

}