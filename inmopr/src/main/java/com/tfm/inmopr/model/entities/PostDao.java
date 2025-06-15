package com.tfm.inmopr.model.entities;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PostDao extends PagingAndSortingRepository<Post, Long>, CrudRepository<Post, Long> {
}
