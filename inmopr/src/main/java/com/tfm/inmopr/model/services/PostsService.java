package com.tfm.inmopr.model.services;

import com.tfm.inmopr.model.entities.Post;
import com.tfm.inmopr.rest.controller.PropertyOptionsDto;
import com.tfm.inmopr.rest.dtos.PostDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostsService {
    void publishPost(Long userId, PostDto post);

    Page<Post> findByCityAndFiltersContainingIgnoreCase(String city, PropertyOptionsDto propertyOptionsDto, Pageable pageable);

    Page<Post> findByCityContainingIgnoreCase(String city, Pageable pageable);
}
