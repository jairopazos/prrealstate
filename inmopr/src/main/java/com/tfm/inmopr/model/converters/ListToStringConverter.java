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
        // Elimina los corchetes y comillas, luego divide
        String content = json.substring(1, json.length() - 1);
        return Arrays.stream(content.split("\",\""))
                .map(s -> s.replace("\"", ""))
                .collect(Collectors.toList());
    }
}