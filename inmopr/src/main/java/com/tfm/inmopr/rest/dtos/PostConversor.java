package com.tfm.inmopr.rest.dtos;

import com.tfm.inmopr.model.entities.*;

import java.math.BigDecimal;

public class PostConversor {

    public final static Post toPost(PostDto postDto) {

        return new Post(postDto.getTipoAnuncio(), postDto.getTipoVivienda(), postDto.getDescription(),
            postDto.getUrls(), postDto.getOwnerName(), postDto.getTelephone(), postDto.getAddress(),
            postDto.getAscensor(), postDto.getGaraje(), postDto.getMetrosConstruidos(), postDto.getMetrosUtiles(),
            postDto.getNumHabitaciones(), postDto.getNumBanos(), postDto.getExterior(), Orientacion.valueOf(postDto.getOrientacion().name()), postDto.getAmueblado(), postDto.getTrastero(),
            postDto.getJardin(), postDto.getTerraza(), postDto.getCalefaccion(), postDto.getPiscina(), Estado.valueOf(postDto.getEstado().name()),
            new BigDecimal(postDto.getPrecio().replace("€", "").replace(".", "").trim()));
    }
}
