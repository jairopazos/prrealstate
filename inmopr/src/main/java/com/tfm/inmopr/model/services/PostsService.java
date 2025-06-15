package com.tfm.inmopr.model.services;

import com.tfm.inmopr.model.entities.Post;
import com.tfm.inmopr.rest.dtos.PostDto;

public interface PostsService {
    void publishPost(Long userId, PostDto post);
}
