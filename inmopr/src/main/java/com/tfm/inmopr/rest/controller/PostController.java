package com.tfm.inmopr.rest.controller;

import com.tfm.inmopr.model.entities.Post;
import com.tfm.inmopr.model.services.PostsService;
import com.tfm.inmopr.rest.dtos.PostDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/listings")
public class PostController {

    @Autowired
    private PostsService postsService;

    @PostMapping("/new")
    public void newPost(@RequestAttribute Long userId, @Validated @RequestBody PostDto postDto) {

        postsService.publishPost(userId, postDto);
    }
}
