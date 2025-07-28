package com.tfm.inmopr.rest.controller;

import com.tfm.inmopr.model.entities.EmailRequest;
import com.tfm.inmopr.model.entities.Post;
import com.tfm.inmopr.model.entities.PostDao;
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
import java.util.Optional;

import static com.tfm.inmopr.rest.dtos.PostConversor.toPostDto;

@RestController
@RequestMapping("/listings")
public class PostController {

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

    @PostMapping("/new")
    public void newPost(@RequestAttribute Long userId, @Validated @RequestBody PostDto postDto) {

        postsService.publishPost(userId, postDto);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getListings(
            @RequestParam(required = false, defaultValue = "") String city,
            @ModelAttribute PropertyOptionsDto propertyOptionsDto,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "0") int size
    ) {
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
