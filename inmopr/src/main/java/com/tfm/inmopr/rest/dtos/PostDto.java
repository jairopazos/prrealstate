package com.tfm.inmopr.rest.dtos;

import com.tfm.inmopr.model.entities.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;

public class PostDto {

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
    private String precio;

    public PostDto() {}

    public PostDto(Long id, String name, TipoAnuncio tipoAnuncio, TipoVivienda tipoVivienda, String description,
                   List<String> urls, String ownerName, String telephone, LocalDateTime creationDate, LocalDateTime modificationDate,
                   Address address, Boolean ascensor, Boolean garaje, String metrosConstruidos, String metrosUtiles, String numBanos,
                   Boolean exterior, Orientacion orientacion, Boolean amueblado, Boolean trastero, Boolean jardin, Boolean terraza,
                   Boolean calefaccion, Boolean piscina, Estado estado, String precio) {
        this.id = id;
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
    }

    public PostDto(Long id, TipoAnuncio tipoAnuncio, TipoVivienda tipoVivienda, String description, List<String> urls,
                   String ownerName, String telephone, Address address, String precio) {
        this.id = id;
        this.tipoAnuncio = tipoAnuncio;
        this.tipoVivienda = tipoVivienda;
        this.description = description;
        this.urls = urls;
        this.ownerName = ownerName;
        this.telephone = telephone;
        this.address = address;
        this.precio = precio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    @Size(min=1, max=600, groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public TipoAnuncio getTipoAnuncio() {
        return tipoAnuncio;
    }

    public void setTipoAnuncio(TipoAnuncio tipoAnuncio) {
        this.tipoAnuncio = tipoAnuncio;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public TipoVivienda getTipoVivienda() {
        return tipoVivienda;
    }

    public void setTipoVivienda(TipoVivienda tipoVivienda) {
        this.tipoVivienda = tipoVivienda;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    @Size(min=1, max=5000, groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public List<String> getUrls() {
        return urls;
    }

    public void setUrls(List<String> urls) {
        this.urls = urls;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    @Size(min=1, max=600, groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    @Size(min=1, max=20, groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public LocalDateTime getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(LocalDateTime modificationDate) {
        this.modificationDate = modificationDate;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    @Size(min=1, max=500, groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
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
    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    @Size(min=1, max=100, groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public String getMetrosConstruidos() {
        return metrosConstruidos;
    }

    public void setMetrosConstruidos(String metrosConstruidos) {
        this.metrosConstruidos = metrosConstruidos;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    @Size(min=1, max=100, groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public String getMetrosUtiles() {
        return metrosUtiles;
    }

    public void setMetrosUtiles(String metrosUtiles) {
        this.metrosUtiles = metrosUtiles;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    @Size(min=1, max=100, groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
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

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    @NotNull(groups={UserDto.AllValidations.class, UserDto.UpdateValidations.class})
    public String getPrecio() {
        return precio;
    }

    public void setPrecio(String precio) {
        this.precio = precio;
    }

}
