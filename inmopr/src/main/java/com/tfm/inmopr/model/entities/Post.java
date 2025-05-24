package com.tfm.inmopr.model.entities;

import com.tfm.inmopr.model.converters.ListToStringConverter;
import jakarta.persistence.*;

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

    public Post() {}

    public Post(String name, TipoAnuncio tipoAnuncio, TipoVivienda tipoVivienda, String description, List<String> urls, String ownerName, String telephone, LocalDateTime creationDate, LocalDateTime modificationDate, Address address) {
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

    public Post(TipoAnuncio tipoAnuncio, TipoVivienda tipoVivienda, String description, List<String> urls, String ownerName, String telephone, Address address) {
        this.tipoAnuncio = tipoAnuncio;
        this.tipoVivienda = tipoVivienda;
        this.description = description;
        this.urls = urls;
        this.ownerName = ownerName;
        this.telephone = telephone;
        this.address = address;
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
}
