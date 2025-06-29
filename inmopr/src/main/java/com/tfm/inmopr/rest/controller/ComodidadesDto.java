package com.tfm.inmopr.rest.controller;

public class ComodidadesDto {

    private Boolean piscina;
    private Boolean jardin;
    private Boolean garaje;
    private Boolean ascensor;

    public ComodidadesDto() {}

    public ComodidadesDto(Boolean piscina, Boolean jardin, Boolean garaje, Boolean ascensor) {
        this.piscina = piscina;
        this.jardin = jardin;
        this.garaje = garaje;
        this.ascensor = ascensor;
    }

    public Boolean getPiscina() {
        return piscina;
    }

    public void setPiscina(Boolean piscina) {
        this.piscina = piscina;
    }

    public Boolean getJardin() {
        return jardin;
    }

    public void setJardin(Boolean jardin) {
        this.jardin = jardin;
    }

    public Boolean getGaraje() {
        return garaje;
    }

    public void setGaraje(Boolean garaje) {
        this.garaje = garaje;
    }

    public Boolean getAscensor() {
        return ascensor;
    }

    public void setAscensor(Boolean ascensor) {
        this.ascensor = ascensor;
    }

}
