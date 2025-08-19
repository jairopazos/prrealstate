/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.model.services;

import com.tfm.inmopr.model.entities.Address;
import com.tfm.inmopr.model.entities.AddressDao;
import com.tfm.inmopr.model.entities.Post;
import com.tfm.inmopr.model.entities.PostDao;
import com.tfm.inmopr.rest.controller.PropertyOptionsDto;
import com.tfm.inmopr.rest.dtos.PostDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.time.LocalDateTime;
import java.util.Optional;

import static com.tfm.inmopr.rest.dtos.PostConversor.toPost;

@Service
@Transactional
public class PostsServiceImpl implements PostsService{

    @Autowired
    private PostDao postDao;

    @Autowired
    private AddressDao addressDao;

    @Autowired
    private JavaMailSender mailSender;


    @Override
    @Transactional
    public void publishPost(Long userId, PostDto postDto) {

        String postName;
        Address address = new Address(postDto.getAddress().getProvince(), postDto.getAddress().getCity(),
                postDto.getAddress().getStreet(), postDto.getAddress().getPostalCode(), postDto.getAddress().getNumber(),
                postDto.getAddress().getHeight(), postDto.getAddress().getLetter());
        addressDao.save(address);
        postDto.setUserId(userId);
        postDto.setAddress(address);
        Post post = toPost(postDto);
        post.setCreationDate(LocalDateTime.now());
        post.setModificationDate(LocalDateTime.now());
        postName = post.getTipoVivienda() + " en " + post.getTipoAnuncio() + " en " + post.getAddress().getCity();
        post.setName(postName);
        postDao.save(post);
    }

    @Override
    @Transactional
    public Post updatePost(Long id, PostDto postDto) {
        Optional<Post> postOptional = postDao.findById(id);

        if (postOptional.isEmpty()) {
            throw new RuntimeException("Post not found with id " + id);
        }

        Post existingPost = postOptional.get();
        Post updatedPost = toPost(postDto);

        // Actualizar todos los campos editables
        existingPost.setPrecio(updatedPost.getPrecio());
        existingPost.setDescription(updatedPost.getDescription());
        existingPost.setMetrosConstruidos(updatedPost.getMetrosConstruidos());
        existingPost.setMetrosUtiles(updatedPost.getMetrosUtiles());
        existingPost.setNumHabitaciones(updatedPost.getNumHabitaciones());
        existingPost.setNumBanos(updatedPost.getNumBanos());
        existingPost.setEstado(updatedPost.getEstado());
        existingPost.setOrientacion(updatedPost.getOrientacion());
        existingPost.setAscensor(updatedPost.getAscensor());
        existingPost.setGaraje(updatedPost.getGaraje());
        existingPost.setTrastero(updatedPost.getTrastero());
        existingPost.setCalefaccion(updatedPost.getCalefaccion());
        existingPost.setJardin(updatedPost.getJardin());
        existingPost.setTerraza(updatedPost.getTerraza());
        existingPost.setExterior(updatedPost.getExterior());
        existingPost.setAmueblado(updatedPost.getAmueblado());
        existingPost.setOwnerName(updatedPost.getOwnerName());
        existingPost.setTelephone(updatedPost.getTelephone());
        existingPost.setEmail(updatedPost.getEmail());
        existingPost.setModificationDate(LocalDateTime.now());
        // Actualizar las fechas y los URLs si se modifican
        existingPost.setModificationDate(LocalDateTime.now());
        existingPost.setUrls(updatedPost.getUrls());
        existingPost.setUrlsPanoramic(updatedPost.getUrlsPanoramic());

        // Guardar los cambios en la base de datos
        return postDao.save(existingPost);
    }




    @Override
    public Page<Post> findByCityAndFiltersContainingIgnoreCase(String city, PropertyOptionsDto propertyOptionsDto, Pageable pageable) {
        return postDao.findByAddress_CityAndFiltersContainingIgnoreCase(city, propertyOptionsDto.getTipoAnuncio(), propertyOptionsDto.getTipoVivienda(),
            propertyOptionsDto.getPrecioMaximo(), propertyOptionsDto.getNumHabitaciones(), propertyOptionsDto.getNumBanos(),
            propertyOptionsDto.getMetrosConstruidos(), propertyOptionsDto.getMetrosUtiles(), propertyOptionsDto.getEstado(),
            propertyOptionsDto.getAscensor(), propertyOptionsDto.getGaraje(), propertyOptionsDto.getExterior(), propertyOptionsDto.getAmueblado(),
            propertyOptionsDto.getTrastero(), propertyOptionsDto.getJardin(), propertyOptionsDto.getTerraza(), propertyOptionsDto.getCalefaccion(), propertyOptionsDto.getPiscina(),
            pageable);
    }

    @Override
    public Page<Post> findByCityContainingIgnoreCase(String city, Pageable pageable) {
        return postDao.findByAddress_CityContainingIgnoreCase(city, pageable);
    }

    @Override
    public Page<Post> findByUserId(String userId, Pageable pageable) {
        return postDao.findByUserId(Long.valueOf(userId), pageable);
    }

    @Override
    public void sendEmail(String to, String from, String subject, String htmlBody) {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            // El "true" activa multipart (necesario si hay adjuntos o HTML)
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setFrom(from);
            helper.setSubject(subject);

            // Este true indica que el contenido es HTML, no texto plano
            helper.setText(htmlBody, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Error al enviar correo HTML", e);
        }
     }
}
