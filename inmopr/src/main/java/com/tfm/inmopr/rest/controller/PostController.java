package com.tfm.inmopr.rest.controller;

import com.tfm.inmopr.model.entities.Post;
import com.tfm.inmopr.model.services.PostsService;
import com.tfm.inmopr.rest.dtos.PostDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/listings")
public class PostController {

    @Autowired
    private PostsService postsService;

    @PostMapping("/new")
    public void newPost(@RequestAttribute Long userId, @Validated @RequestBody PostDto postDto) {

        postsService.publishPost(userId, postDto);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getListings(
            @RequestParam(required = false, defaultValue = "") String city,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "0") int size
    ) {
        Pageable paging = PageRequest.of(page, size);
        Page<Post> pageListings = postsService.findByCityContainingIgnoreCase(city, paging);

        Map<String, Object> map = new HashMap<>();
        map.put("listings", pageListings.getContent());
        map.put("total", pageListings.getTotalElements());
        map.put("totalPages", pageListings.getTotalPages());
        map.put("currentPage", pageListings.getNumber());

        return ResponseEntity.ok(map);
    }
}
