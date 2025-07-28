/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

package com.tfm.inmopr.model.entities;

import com.tfm.inmopr.model.converters.ListToStringConverter;
import com.tfm.inmopr.rest.dtos.UserDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.List;
import java.time.LocalDateTime;

@Entity
public class Post {

    private Long id;
    private String name;
    private TipoAnuncio tipoAnuncio;
    private TipoVivienda tipoVivienda;
    private String description;
    private List<String> urls;
    private String ownerName;
    private String telephone;
    private LocalDateTime creationDate;
    private LocalDateTime modificationDate;
    private Address address;
    private Boolean ascensor;
    private Boolean garaje;
    private String metrosConstruidos;
    private String metrosUtiles;
    private String numHabitaciones;
    private String numBanos;
    private Boolean exterior;
    private Orientacion orientacion;
    private Boolean amueblado;
    private Boolean trastero;
    private Boolean jardin;
    private Boolean terraza;
    private Boolean calefaccion;
    private Boolean piscina;
    private Estado estado;
    private BigDecimal precio;
    private String email;

    public Post() {}

    public Post(String name, TipoAnuncio tipoAnuncio, TipoVivienda tipoVivienda, String description, List<String> urls,
                String ownerName, String telephone, LocalDateTime creationDate, LocalDateTime modificationDate, Address address,
                Boolean ascensor, Boolean garaje, String metrosConstruidos, String metrosUtiles, String numHabitaciones, String numBanos,
                Boolean exterior, Orientacion orientacion, Boolean amueblado, Boolean trastero, Boolean jardin, Boolean terraza,
                Boolean calefaccion, Boolean piscina, Estado estado, BigDecimal precio, String email) {
        this.name = name;
        this.tipoAnuncio = tipoAnuncio;
        this.tipoVivienda = tipoVivienda;
        this.description = description;
        this.urls = urls;
        this.ownerName = ownerName;
        this.telephone = telephone;
        this.creationDate = creationDate;
        this.modificationDate = modificationDate;
        this.address = address;
        this.ascensor = ascensor;
        this.garaje = garaje;
        this.metrosConstruidos = metrosConstruidos;
        this.metrosUtiles = metrosUtiles;
        this.numHabitaciones = numHabitaciones;
        this.numBanos = numBanos;
        this.exterior = exterior;
        this.orientacion = orientacion;
        this.amueblado = amueblado;
        this.trastero = trastero;
        this.jardin = jardin;
        this.terraza = terraza;
        this.calefaccion = calefaccion;
        this.piscina = piscina;
        this.estado = estado;
        this.precio = precio;
        this.email = email;
    }

    public Post(TipoAnuncio tipoAnuncio, TipoVivienda tipoVivienda, String description, List<String> urls, String ownerName,
                String telephone, Address address, Boolean ascensor, Boolean garaje, String metrosConstruidos, String metrosUtiles, String numHabitaciones, String numBanos,
                Boolean exterior, Orientacion orientacion, Boolean amueblado, Boolean trastero, Boolean jardin, Boolean terraza,
                Boolean calefaccion, Boolean piscina, Estado estado, BigDecimal precio, String email) {
        this.tipoAnuncio = tipoAnuncio;
        this.tipoVivienda = tipoVivienda;
        this.description = description;
        this.urls = urls;
        this.ownerName = ownerName;
        this.telephone = telephone;
        this.address = address;
        this.ascensor = ascensor;
        this.garaje = garaje;
        this.metrosConstruidos = metrosConstruidos;
        this.metrosUtiles = metrosUtiles;
        this.numHabitaciones = numHabitaciones;
        this.numBanos = numBanos;
        this.exterior = exterior;
        this.orientacion = orientacion;
        this.amueblado = amueblado;
        this.trastero = trastero;
        this.jardin = jardin;
        this.terraza = terraza;
        this.calefaccion = calefaccion;
        this.piscina = piscina;
        this.estado = estado;
        this.precio = precio;
        this.email = email;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Enumerated(EnumType.STRING)
    public TipoAnuncio getTipoAnuncio() {
        return tipoAnuncio;
    }

    public void setTipoAnuncio(TipoAnuncio tipoAnuncio) {
        this.tipoAnuncio = tipoAnuncio;
    }

    @Enumerated(EnumType.STRING)  // ← Asegura que se guarde como texto (no como número)
    @Column(columnDefinition = "ENUM('Casa', 'Piso', 'Chalet')") // ← Obliga a coincidir con la BD
    public TipoVivienda getTipoVivienda() {
        return tipoVivienda;
    }

    public void setTipoVivienda(TipoVivienda tipoVivienda) {
        this.tipoVivienda = tipoVivienda;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Convert(converter = ListToStringConverter.class)
    @Column(columnDefinition = "TEXT", nullable = false)
    public List<String> getUrls() {
        return urls;
    }

    public void setUrls(List<String> urls) {
        this.urls = urls;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(LocalDateTime modificationDate) {
        this.modificationDate = modificationDate;
    }

    @ManyToOne(optional = false, fetch=FetchType.LAZY)
    @JoinColumn(name="addressId")
    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Boolean getAscensor() {
        return ascensor;
    }

    public void setAscensor(Boolean ascensor) {
        this.ascensor = ascensor;
    }

    public Boolean getGaraje() {
        return garaje;
    }

    public void setGaraje(Boolean garaje) {
        this.garaje = garaje;
    }

    public String getMetrosConstruidos() {
        return metrosConstruidos;
    }

    public void setMetrosConstruidos(String metrosConstruidos) {
        this.metrosConstruidos = metrosConstruidos;
    }

    public String getMetrosUtiles() {
        return metrosUtiles;
    }

    public void setMetrosUtiles(String metrosUtiles) {
        this.metrosUtiles = metrosUtiles;
    }

    public String getNumHabitaciones() {
        return numHabitaciones;
    }

    public void setNumHabitaciones(String numHabitaciones) {
        this.numHabitaciones = numHabitaciones;
    }

    public String getNumBanos() {
        return numBanos;
    }

    public void setNumBanos(String numBanos) {
        this.numBanos = numBanos;
    }

    public Boolean getExterior() {
        return exterior;
    }

    public void setExterior(Boolean exterior) {
        this.exterior = exterior;
    }

    @Enumerated(EnumType.STRING)  // ← Asegura que se guarde como texto (no como número)
    @Column(columnDefinition = "ENUM('norte', 'sur', 'este', 'oeste')")
    public Orientacion getOrientacion() {
        return orientacion;
    }

    public void setOrientacion(Orientacion orientacion) {
        this.orientacion = orientacion;
    }

    public Boolean getAmueblado() {
        return amueblado;
    }

    public void setAmueblado(Boolean amueblado) {
        this.amueblado = amueblado;
    }

    public Boolean getTrastero() {
        return trastero;
    }

    public void setTrastero(Boolean trastero) {
        this.trastero = trastero;
    }

    public Boolean getJardin() {
        return jardin;
    }

    public void setJardin(Boolean jardin) {
        this.jardin = jardin;
    }

    public Boolean getTerraza() {
        return terraza;
    }

    public void setTerraza(Boolean terraza) {
        this.terraza = terraza;
    }

    public Boolean getCalefaccion() {
        return calefaccion;
    }

    public void setCalefaccion(Boolean calefaccion) {
        this.calefaccion = calefaccion;
    }

    public Boolean getPiscina() {
        return piscina;
    }

    public void setPiscina(Boolean piscina) {
        this.piscina = piscina;
    }

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('obra_nueva', 'buen_estado', 'a_reformar')")
    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    @Size(min=1, max=60, groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    @Email(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email.trim();
    }
}
