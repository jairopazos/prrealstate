import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';
import './ListingsPage.css';
import {FormattedMessage} from "react-intl";

const useQuery = () => new URLSearchParams(useLocation().search);

const ListingsPage = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const city = query.get('city') || '';
    const [page, setPage] = useState(0);  // Estado para manejar la paginación
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);  // Estado para el total de páginas
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        tipoAnuncio: '',
        tipoVivienda: '',
        precioMax: '',
        habitaciones: '',
        banos: '',
        estado: '',
        comodidades: {
            piscina: false,
            jardin: false,
            garaje: false,
            ascensor: false,
        }
    });

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

    useEffect(() => {
        console.log('City:', city);  // Agrega este log para ver cuando `city` cambia
        if (!city) return;

        setLoading(true);
        setError(null);

        dispatch(
            actions.fetchListings(
                city,
                0, // página 0
                10,
                data => {
                    setListings(data.listings || []);
                    setTotalPages(data.totalPages);
                    setPage(data.currentPage + 1);
                    setLoading(false);
                },
                err => {
                    setError(err.message || 'Error al cargar los anuncios');
                    setLoading(false);
                }
            )
        );
    }, [city, page]);

    // Función para manejar la paginación
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

                <select name="estado"  className="filter-field" value={filters.estado} onChange={handleFilterChange}>
                    <option value="">Estado</option>
                    <option value="obra_nueva">Obra nueva</option>
                    <option value="buen_estado">Buen estado</option>
                    <option value="a_reformar">A reformar</option>
                </select>

                <div className="suggestions-dropdown">
                    <label>
                        <input type="checkbox" name="piscina" checked={filters.comodidades.piscina} onChange={handleFilterChange} />
                        Piscina
                    </label>
                    <label>
                        <input type="checkbox" name="jardin" checked={filters.comodidades.jardin} onChange={handleFilterChange} />
                        Jardín
                    </label>
                    <label>
                        <input type="checkbox" name="garaje" checked={filters.comodidades.garaje} onChange={handleFilterChange} />
                        Garaje
                    </label>
                    <label>
                        <input type="checkbox" name="ascensor" checked={filters.comodidades.ascensor} onChange={handleFilterChange} />
                        Ascensor
                    </label>
                </div>

                <button className="filter-field-button" onClick={() => alert("Abrir mapa")}>
                     Mapa 🗺️
                </button>

                <button className="filter-field-button" onClick={() => alert("Abrir mapa")}>
                    Mapa 🗺️
                </button>

            </div>

            {loading && <p>
                <FormattedMessage id="project.app.listings.loading"/>
            </p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}


            <div className="cards-grid">
                {listings.map((listing) => (
                    <div key={listing.id} className="listing-card">
                        <div className="carousel">
                            {listing.urls?.map((img, idx) => (
                                <img key={idx} src={img} alt={`listing-${idx}`} />
                            ))}
                        </div>
                        <h3>{listing.name}</h3>
                        <p className={"listing-description"} >{listing.description}</p>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <div className="pagination">
                <button
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}>
                    Anterior
                </button>
                <span>
                    <FormattedMessage
                        id="project.app.listings.listings.page"
                        values={{ page, totalPages }}
                    />
                </span>
                <button
                    className={"next-button"}
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}>
                    <FormattedMessage id="project.app.listings.next"/>
                </button>
            </div>
        </div>
    );
};

export default ListingsPage;
