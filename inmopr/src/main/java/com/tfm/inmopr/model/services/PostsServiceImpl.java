package com.tfm.inmopr.model.services;

import com.tfm.inmopr.model.entities.Address;
import com.tfm.inmopr.model.entities.AddressDao;
import com.tfm.inmopr.model.entities.Post;
import com.tfm.inmopr.model.entities.PostDao;
import com.tfm.inmopr.rest.dtos.PostDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import static com.tfm.inmopr.rest.dtos.PostConversor.toPost;

@Service
@Transactional
public class PostsServiceImpl implements PostsService{

    @Autowired
    private PostDao postDao;

    @Autowired
    private AddressDao addressDao;


    @Override
    @Transactional
    public void publishPost(Long userId, PostDto postDto) {

        String postName;
        Address address = new Address(postDto.getAddress().getProvince(), postDto.getAddress().getCity(),
                postDto.getAddress().getStreet(), postDto.getAddress().getPostalCode(), postDto.getAddress().getNumber(),
                postDto.getAddress().getHeight(), postDto.getAddress().getLetter());
        addressDao.save(address);
        postDto.setAddress(address);
        Post post = toPost(postDto);
        post.setCreationDate(LocalDateTime.now());
        post.setModificationDate(LocalDateTime.now());
        postName = post.getTipoVivienda() + " en " + post.getTipoAnuncio() + " en " + post.getAddress().getCity();
        post.setName(postName);
        postDao.save(post);
    }

    @Override
    public Page<Post> findByCityContainingIgnoreCase(String city, Pageable pageable) {
        return postDao.findByAddress_CityContainingIgnoreCase(city, pageable);
    }
}
