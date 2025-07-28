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
            new BigDecimal(postDto.getPrecio().replace("€", "").replace(".", "").trim()), postDto.getEmail());
    }

    public final static PostDto toPostDto(Post post) {
        return new PostDto(post.getName(), post.getTipoAnuncio(), post.getTipoVivienda(), post.getDescription(),
            post.getUrls(), post.getOwnerName(), post.getTelephone(), post.getCreationDate(), post.getModificationDate(),
            post.getAddress(), post.getAscensor(), post.getGaraje(), post.getMetrosConstruidos(), post.getMetrosUtiles(),
            post.getNumHabitaciones(), post.getNumBanos(), post.getExterior(), Orientacion.valueOf(post.getOrientacion().name()),
            post.getAmueblado(), post.getTrastero(), post.getJardin(), post.getTerraza(), post.getCalefaccion(),
            post.getPiscina(), Estado.valueOf(post.getEstado().name()), post.getPrecio().toString(), post.getEmail());
    }

}
