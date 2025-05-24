package com.tfm.inmopr.rest.dtos;

import com.tfm.inmopr.model.entities.Address;
import com.tfm.inmopr.model.entities.Post;
import com.tfm.inmopr.model.entities.User;

public class PostConversor {

    public final static Post toPost(PostDto postDto) {

        return new Post(postDto.getTipoAnuncio(), postDto.getTipoVivienda(), postDto.getDescription(),
                postDto.getUrls(), postDto.getOwnerName(), postDto.getTelephone(), postDto.getAddress());
    }
}
