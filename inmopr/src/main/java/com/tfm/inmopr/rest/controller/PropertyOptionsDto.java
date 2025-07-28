package com.tfm.inmopr.rest.controller;

import com.tfm.inmopr.model.entities.Estado;
import com.tfm.inmopr.model.entities.TipoAnuncio;
import com.tfm.inmopr.model.entities.TipoVivienda;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.Map;

public class PropertyOptionsDto {
    private TipoAnuncio tipoAnuncio;
    private TipoVivienda tipoVivienda;
    private String precioMaximo;
    private String numHabitaciones;
    private String numBanos;
    private String metrosConstruidos;
    private String metrosUtiles;
    private Estado estado;
    private boolean ascensor;
    private boolean garaje;
    private boolean exterior;
    private boolean amueblado;
    private boolean trastero;
    private boolean jardin;
    private boolean terraza;
    private boolean calefaccion;
    private boolean piscina;

    public PropertyOptionsDto() {}

    public PropertyOptionsDto(TipoAnuncio tipoAnuncio, TipoVivienda tipoVivienda, String precioMaximo, String numHabitaciones,
      String numBanos, String metrosConstruidos, String metrosUtiles, Estado estado, Boolean ascensor, Boolean garaje, Boolean exterior,
      Boolean amueblado, Boolean trastero, Boolean jardin, Boolean terraza, Boolean calefaccion, Boolean piscina) {
        this.tipoAnuncio = tipoAnuncio;
        this.tipoVivienda = tipoVivienda;
        this.precioMaximo = precioMaximo;
        this.numHabitaciones = numHabitaciones;
        this.numBanos = numBanos;
        this.metrosConstruidos = metrosConstruidos;
        this.metrosUtiles = metrosUtiles;
        this.estado = estado;
        this.ascensor = ascensor;
        this.garaje = garaje;
        this.amueblado = amueblado;
        this.trastero = trastero;
        this.jardin = jardin;
        this.terraza = terraza;
        this.calefaccion = calefaccion;
        this.piscina = piscina;
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

    public String getPrecioMaximo() {
        return precioMaximo;
    }

    public void setPrecioMaximo(String precioMaximo) {
        this.precioMaximo = precioMaximo;
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

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('obra_nueva', 'buen_estado', 'a_reformar')")
    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public boolean getPiscina() {
        return piscina;
    }

    public void setPiscina(boolean piscina) {
        this.piscina = piscina;
    }

    public boolean getJardin() {
        return jardin;
    }

    public void setJardin(boolean jardin) {
        this.jardin = jardin;
    }

    public boolean getGaraje() {
        return garaje;
    }

    public void setGaraje(boolean garaje) {
        this.garaje = garaje;
    }

    public boolean getAscensor() {
        return ascensor;
    }

    public void setAscensor(boolean ascensor) {
        this.ascensor = ascensor;
    }

    public boolean getExterior() {
        return exterior;
    }

    public void setExterior(boolean exterior) {
        this.exterior = exterior;
    }

    public boolean getAmueblado() {
        return amueblado;
    }

    public void setAmueblado(boolean amueblado) {
        this.amueblado = amueblado;
    }

    public boolean getTrastero() {
        return trastero;
    }

    public void setTrastero(boolean trastero) {
        this.trastero = trastero;
    }

    public boolean getTerraza() {
        return terraza;
    }

    public void setTerraza(boolean terraza) {
        this.terraza = terraza;
    }

    public boolean getCalefaccion() {
        return calefaccion;
    }

    public void setCalefaccion(boolean calefaccion) {
        this.calefaccion = calefaccion;
    }
}