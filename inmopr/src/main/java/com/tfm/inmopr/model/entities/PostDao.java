package com.tfm.inmopr.model.entities;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface PostDao extends PagingAndSortingRepository<Post, Long>, CrudRepository<Post, Long> {

    @Query("SELECT p FROM Post p JOIN FETCH p.address WHERE p.address.city LIKE %:city%")
    Page<Post> findByAddress_CityContainingIgnoreCase(@Param("city") String city, Pageable page);
}
