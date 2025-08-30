/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.rest.controller;

import com.tfm.inmopr.model.entities.EmailRequest;
import com.tfm.inmopr.model.entities.Post;
import com.tfm.inmopr.model.entities.PostDao;
import com.tfm.inmopr.model.entities.User;
import com.tfm.inmopr.model.services.PostsService;
import com.tfm.inmopr.model.services.UserService;
import com.tfm.inmopr.rest.dtos.PostDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

import static com.tfm.inmopr.rest.dtos.PostConversor.toPostDto;

@RestController
@RequestMapping("/listings")
public class PostController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostsService postsService;

    @Autowired
    private PostDao postDao;

    private Boolean isFiltersEnabled(PropertyOptionsDto propertyOptionsDto) {
        if (propertyOptionsDto.getTipoAnuncio() == null && propertyOptionsDto.getTipoVivienda() == null &&
            propertyOptionsDto.getPrecioMaximo().isEmpty() && propertyOptionsDto.getNumHabitaciones().isEmpty() &&
            propertyOptionsDto.getNumBanos().isEmpty() && propertyOptionsDto.getMetrosConstruidos().isEmpty() && propertyOptionsDto.
            getMetrosUtiles().isEmpty() && propertyOptionsDto.getEstado() == null && !propertyOptionsDto.getAscensor() &&
            !propertyOptionsDto.getGaraje() && !propertyOptionsDto.getExterior() && !propertyOptionsDto.getAmueblado() &&
            !propertyOptionsDto.getTrastero() && !propertyOptionsDto.getJardin() && !propertyOptionsDto.getTerraza() &&
            !propertyOptionsDto.getCalefaccion() && !propertyOptionsDto.getPiscina()) {
            return false;
        } else {
            return true;
        }
    }

    private ResponseEntity<Map<String, Object>> getListingsByCity(String city, PropertyOptionsDto propertyOptionsDto,
        int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Post> pageListings = null;
        if (isFiltersEnabled(propertyOptionsDto)) {
            if (propertyOptionsDto.getPrecioMaximo().isEmpty()) {
                propertyOptionsDto.setPrecioMaximo(null);
            }
            pageListings = postsService.findByCityAndFiltersContainingIgnoreCase(city, propertyOptionsDto, paging);
        } else {
            pageListings = postsService.findByCityContainingIgnoreCase(city, paging);
        }

        Map<String, Object> map = new HashMap<>();
        map.put("listings", pageListings.getContent());
        map.put("total", pageListings.getTotalElements());
        map.put("totalPages", pageListings.getTotalPages());
        map.put("currentPage", pageListings.getNumber());

        return ResponseEntity.ok(map);
    }

    private ResponseEntity<Map<String, Object>> getListingsByUserId(String userId, int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<Post> pageListings = null;

        pageListings = postsService.findByUserId(userId, paging);

        Map<String, Object> map = new HashMap<>();
        map.put("listings", pageListings.getContent());
        map.put("total", pageListings.getTotalElements());
        map.put("totalPages", pageListings.getTotalPages());
        map.put("currentPage", pageListings.getNumber());

        return ResponseEntity.ok(map);
    }

    private ResponseEntity<Map<String, Object>> getListingsByFavorites(String userId, int page, int size) {
        Pageable paging = PageRequest.of(page, size);

        // 1. Recuperamos el usuario
        User user = userService.findById(Long.parseLong(userId))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        // 2. Obtenemos su lista de URLs favoritas
        List<String> favUrls = user.getFavorites();
        if (favUrls == null || favUrls.isEmpty()) {
            Map<String, Object> emptyMap = new HashMap<>();
            emptyMap.put("listings", List.of());
            emptyMap.put("total", 0);
            emptyMap.put("totalPages", 0);
            emptyMap.put("currentPage", page);
            return ResponseEntity.ok(emptyMap);
        }

        // 3. Extraemos los IDs de esas URLs (ej: "/listing/details/5" -> 5)
        List<Long> favIds = favUrls.stream()
                .map(url -> {
                    try {
                        return Long.parseLong(url.replace("/listing/details/", ""));
                    } catch (NumberFormatException e) {
                        return null; // ignora URLs que no sigan el formato
                    }
                })
                .filter(Objects::nonNull)
                .toList();

        // 4. Consultamos al repo
        Page<Post> pageListings = postsService.findByIdIn(favIds, paging);

        // 5. Devolvemos en el mismo formato que tu ejemplo
        Map<String, Object> map = new HashMap<>();
        map.put("listings", pageListings.getContent());
        map.put("total", pageListings.getTotalElements());
        map.put("totalPages", pageListings.getTotalPages());
        map.put("currentPage", pageListings.getNumber());

        return ResponseEntity.ok(map);
    }



    @PostMapping("/new")
    public void newPost(@RequestAttribute Long userId, @Validated @RequestBody PostDto postDto) {

        postsService.publishPost(userId, postDto);
    }

    @PostMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(@PathVariable Long id, @Validated @RequestBody PostDto postDto) {
        try {
            Post updatedPost = postsService.updatePost(id, postDto);
            return ResponseEntity.ok(toPostDto(updatedPost));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getListings(
            @RequestParam(required = false, defaultValue = "") String city,
            @RequestParam(required = false, defaultValue = "") String userId,
            @RequestParam(required = false, defaultValue = "") String favorites,
            @ModelAttribute PropertyOptionsDto propertyOptionsDto,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        if (!city.isEmpty()) {
            return getListingsByCity(city, propertyOptionsDto, page, size);
        } else if ("true".equalsIgnoreCase(favorites) && !userId.isEmpty()) {
            return getListingsByFavorites(userId, page, size);
        } else if (!userId.isEmpty()) {
            return getListingsByUserId(userId, page, size);
        } else {
            return ResponseEntity.ok(Map.of(
                    "listings", List.of(),
                    "total", 0,
                    "totalPages", 0,
                    "currentPage", page
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getListingById(@PathVariable Long id) {
        Optional<Post> listingOpt = postDao.findById(id);
        if (listingOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        PostDto postDto = toPostDto(listingOpt.get());
        return ResponseEntity.ok(postDto);
    }

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest request) {
        try {
            postsService.sendEmail(
                    request.getTo(),
                    request.getFrom(),
                    request.getSubject(),
                    request.getMessage() // Este ahora es HTML
            );
            return ResponseEntity.ok("Email enviado con éxito.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al enviar el email.");
        }
    }

}
