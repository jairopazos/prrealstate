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

    @Query(""" 
        SELECT p FROM Post p 
        JOIN FETCH p.address 
        WHERE (:city IS NULL OR LOWER(p.address.city) LIKE LOWER(CONCAT('%', :city, '%')))
        AND (:tipoAnuncio IS NULL OR p.tipoAnuncio = :tipoAnuncio)
        AND (:tipoVivienda IS NULL OR p.tipoVivienda = :tipoVivienda)
        AND (
            :precioMaximo IS NULL 
            OR :precioMaximo > 500000 
            OR p.precio <= :precioMaximo
        )
        AND (:numHabitaciones IS NULL OR p.numHabitaciones >= :numHabitaciones)
        AND (:numBanos IS NULL OR p.numBanos >= :numBanos)
        AND (:metrosConstruidos IS NULL OR p.metrosConstruidos >= :metrosConstruidos)
        AND (:metrosUtiles IS NULL OR p.metrosUtiles >= :metrosUtiles)
        AND (:estado IS NULL OR p.estado = :estado)
        AND (:ascensor IS NULL OR :ascensor = false OR p.ascensor = :ascensor)
        AND (:garaje IS NULL OR :ascensor = false OR p.garaje = :garaje)
        AND (:exterior IS NULL OR :exterior = false OR p.exterior = :exterior)
        AND (:amueblado IS NULL OR :amueblado = false OR p.amueblado = :amueblado)
        AND (:trastero IS NULL OR :trastero = false OR p.trastero = :trastero)
        AND (:jardin IS NULL OR :jardin = false OR p.jardin = :jardin)
        AND (:terraza IS NULL OR :terraza = false OR p.terraza = :terraza)
        AND (:calefaccion IS NULL OR :calefaccion = false OR p.calefaccion = :calefaccion)
        AND (:piscina IS NULL OR :piscina = false OR p.piscina = :piscina)
    """)
    Page<Post> findByAddress_CityAndFiltersContainingIgnoreCase(
            @Param("city") String city,
            @Param("tipoAnuncio") TipoAnuncio tipoAnuncio,
            @Param("tipoVivienda") TipoVivienda tipoVivienda,
            @Param("precioMaximo") String precioMaximo,
            @Param("numHabitaciones") String numHabitaciones,
            @Param("numBanos") String numBanos,
            @Param("metrosConstruidos") String metrosConstruidos,
            @Param("metrosUtiles") String metrosUtiles,
            @Param("estado") Estado estado,
            @Param("ascensor") Boolean ascensor,
            @Param("garaje") Boolean garaje,
            @Param("exterior") Boolean exterior,
            @Param("amueblado") Boolean amueblado,
            @Param("trastero") Boolean trastero,
            @Param("jardin") Boolean jardin,
            @Param("terraza") Boolean terraza,
            @Param("calefaccion") Boolean calefaccion,
            @Param("piscina") Boolean piscina,
            Pageable pageable);
}
