import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';
import './ListingsPage.css';
import {FormattedMessage} from "react-intl";
import { useNavigate } from 'react-router-dom';
import ListingCard from './ListingCard'; // NUEVO

const useQuery = () => new URLSearchParams(useLocation().search);

const ListingsPage = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const city = query.get('city') || '';
    const [page, setPage] = useState(0);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const closeDropdown = () => setDropdownOpen(false);

    const [filters, setFilters] = useState({
        tipoAnuncio: '',
        tipoVivienda: '',
        precioMax: '',
        habitaciones: '',
        banos: '',
        metrosConstruidos: '',
        metrosUtiles: '',
        estado: '',
        comodidades: {
            ascensor: false,
            garaje: false,
            exterior: false,
            amueblado: false,
            trastero: false,
            jardin: false,
            terraza: false,
            calefaccion: false,
            piscina: false
        }
    });

     const backendFilters = {
        tipoAnuncio: filters.tipoAnuncio,
        tipoVivienda: filters.tipoVivienda,
        precioMaximo: filters.precioMax,
        numHabitaciones: filters.habitaciones,
        numBanos: filters.banos,
        metrosConstruidos: filters.metrosConstruidos || null,
        metrosUtiles: filters.metrosUtiles || null,
        estado: filters.estado,
        comodidades: Object.entries(filters.comodidades)
            .filter(([_, value]) => value)
            .reduce((acc, [key]) => {
                acc[key] = true;
                return acc;
            }, {})
    };

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name in filters.comodidades) {
            setFilters(prev => ({
                ...prev,
                comodidades: {
                    ...prev.comodidades,
                    [name]: checked
                }
            }));
        } else {
            setFilters(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCardClick = (property) => {
        navigate(`/listing/details/${property.id}`);
    };


    const loadListings = (newPage = 0) => {
        setLoading(true);
        setError(null);

        const flatParams = {
            city,
            page: newPage,
            size: 10,
            tipoAnuncio: filters.tipoAnuncio,
            tipoVivienda: filters.tipoVivienda,
            precioMaximo: filters.precioMax,
            numHabitaciones: filters.habitaciones,
            numBanos: filters.banos,
            metrosConstruidos: filters.metrosConstruidos,
            metrosUtiles: filters.metrosUtiles,
            estado: filters.estado,
            ...Object.entries(filters.comodidades).reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {})
        };

        const queryString = new URLSearchParams(flatParams).toString();

        fetch(`/listings?${queryString}`)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                setListings(data.listings || []);
                setTotalPages(data.totalPages);
                setPage(data.currentPage + 1);
                setLoading(false);
            })
            .catch(err => {
                setError('Error al cargar los anuncios');
                setLoading(false);
            });
    };



    useEffect(() => {
        if (city) {
            loadListings(0);
        }
    }, [city]);


    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="listings-container">
            <h2>
                <FormattedMessage id="project.app.listings.listings"/> {city}
            </h2>

            {/* FILTROS */}
            <div className="filters-row">
                <select name="tipoAnuncio" className="filter-field" value={filters.tipoAnuncio} onChange={handleFilterChange}>
                    <option value="">Tipo de anuncio</option>
                    <option value="venta">Venta</option>
                    <option value="alquiler">Alquiler</option>
                </select>

                <select name="tipoVivienda" className="filter-field" value={filters.tipoVivienda} onChange={handleFilterChange}>
                    <option value="">Tipo de vivienda</option>
                    <option value="Casa">Casa</option>
                    <option value="Piso">Piso</option>
                    <option value="Chalet">Chalet</option>
                </select>

                <select name="precioMax" className="filter-field" value={filters.precioMax} onChange={handleFilterChange}>
                    <option value="">Precio máximo</option>
                    <option value="80000">80.000 €</option>
                    <option value="100000">100.000 €</option>
                    <option value="150000">150.000 €</option>
                    <option value="200000">200.000 €</option>
                    <option value="500000">500.000 €</option>
                    <option value="500001">Más de 500.000 €</option>
                </select>

                <select name="habitaciones" className="filter-field" value={filters.habitaciones} onChange={handleFilterChange}>
                    <option value="">Habitaciones</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                </select>

                <select name="banos" className="filter-field" value={filters.banos} onChange={handleFilterChange}>
                    <option value="">Baños</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                </select>

                <input
                    type="number"
                    name="metrosConstruidos"
                    className="filter-field"
                    placeholder="Metros construidos"
                    value={filters.metrosConstruidos}
                    onChange={handleFilterChange}
                    min="0"
                />

                <input
                    type="number"
                    name="metrosUtiles"
                    className="filter-field"
                    placeholder="Metros útiles"
                    value={filters.metrosUtiles}
                    onChange={handleFilterChange}
                    min="0"
                />

                {/* Desplegable de comodidades con checkboxes */}
                <div
                    className="dropdown"
                    onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) closeDropdown();
                    }}
                    tabIndex={0}
                >
                    <button className="dropdown-btn" onClick={toggleDropdown}>
                        Más opciones
                    </button>

                    {isDropdownOpen && (
                        <div className="dropdown-content" tabIndex={0}>
                            <label>
                                Estado:
                                <select
                                    name="estado"
                                    className="dropdown-select"
                                    value={filters.estado}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">(Todos)</option>
                                    <option value="obra_nueva">Obra nueva</option>
                                    <option value="buen_estado">Buen estado</option>
                                    <option value="a_reformar">A reformar</option>
                                </select>
                            </label>


                            {[
                                'ascensor', 'garaje', 'exterior', 'amueblado',
                                'trastero', 'jardin', 'terraza', 'calefaccion', 'piscina'
                            ].map((amenity) => (
                                <label key={amenity}>
                                    <input
                                        type="checkbox"
                                        name={amenity}
                                        checked={filters.comodidades[amenity]}
                                        onChange={handleFilterChange}
                                    />
                                    {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                                </label>
                            ))}
                        </div>
                    )}
                </div>







                <button className="filter-field-button" onClick={() => navigate('/listings/map', { state: { listings } })}>
                    Mapa 🗺️
                </button>

                <button className="filter-field-button" onClick={() => loadListings(0)}>
                    Buscar
                </button>
            </div>

            {loading && <p><FormattedMessage id="project.app.listings.loading" /></p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="cards-grid">
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        listing={listing}
                        onClick={handleCardClick}
                    />
                ))}
            </div>

            {/* Paginación */}
            <div className="pagination">
                <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Anterior</button>
                <span>
                    <FormattedMessage id="project.app.listings.listings.page" values={{ page, totalPages }} />
                </span>
                <button className="next-button" disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>
                    <FormattedMessage id="project.app.listings.next"/>
                </button>
            </div>
        </div>
    );
};

export default ListingsPage;
