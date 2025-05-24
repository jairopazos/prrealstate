package com.tfm.inmopr.rest.dtos;

import com.tfm.inmopr.model.entities.Address;
import com.tfm.inmopr.model.entities.TipoAnuncio;
import com.tfm.inmopr.model.entities.TipoVivienda;
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

    public PostDto() {}

    public PostDto(Long id, String name, TipoAnuncio tipoAnuncio, TipoVivienda tipoVivienda, String description, List<String> urls, String ownerName, String telephone, LocalDateTime creationDate, LocalDateTime modificationDate, Address address) {
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
    }

    public PostDto(Long id, TipoAnuncio tipoAnuncio, TipoVivienda tipoVivienda, String description, List<String> urls, String ownerName, String telephone, Address address) {
        this.id = id;
        this.tipoAnuncio = tipoAnuncio;
        this.tipoVivienda = tipoVivienda;
        this.description = description;
        this.urls = urls;
        this.ownerName = ownerName;
        this.telephone = telephone;
        this.address = address;
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
}
