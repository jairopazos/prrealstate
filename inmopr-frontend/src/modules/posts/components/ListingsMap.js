import React, { useMemo, useState, useRef, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import './ListingsMap.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const MapView = () => {
    const mapRef = useRef(null);
    const location = useLocation();
    const listings = location.state?.listings || [];
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [enrichedListings, setEnrichedListings] = useState([]);
    const navigate = useNavigate();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyD19U9Vco8vll51H89mdqz_dE3txKqSO_g"
    });

    const geocodeAddress = (address) => {
        return new Promise((resolve, reject) => {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address }, (results, status) => {
                if (status === "OK" && results.length > 0) {
                    const location = results[0].geometry.location;
                    resolve({ lat: location.lat(), lng: location.lng() });
                } else {
                    console.error(`Fallo geocodificando "${address}":`, status);
                    resolve(null);
                }
            });
        });
    };

    const center = useMemo(() => {
        const valid = enrichedListings.filter(p => p.lat && p.lng);
        if (valid.length === 0) return { lat: 40.4168, lng: -3.7038 };
        const avgLat = valid.reduce((sum, prop) => sum + prop.lat, 0) / valid.length;
        const avgLng = valid.reduce((sum, prop) => sum + prop.lng, 0) / valid.length;
        return { lat: avgLat, lng: avgLng };
    }, [enrichedListings]);


    useEffect(() => {
        if (!isLoaded) return;

        const enrichListings = async () => {
            const enriched = await Promise.all(
                listings.map(async (property) => {
                    if (property.lat && property.lng) {
                        return property; // Ya tiene coordenadas
                    }

                    const fullAddress = `${property.address.street} ${property.address.number}, ${property.address.city}, ${property.address.province}, ${property.address.postalCode}`;
                    const coords = await geocodeAddress(fullAddress);

                    return coords ? { ...property, ...coords } : property; // Añade las coordenadas si están disponibles
                })
            );

            setEnrichedListings(enriched);
        };

        enrichListings();
    }, [listings, isLoaded]);

    return (
        <div className="map-container" style={{ height: '100vh', width: '100%' }}>
            {!isLoaded ? (
                <div>Cargando mapa...</div>
            ) : (
                <GoogleMap
                    zoom={13}
                    center={center}
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={(map) => {
                        mapRef.current = map;

                        // Crear el control de geolocalización
                        const controlDiv = document.createElement('div');
                        controlDiv.className = 'custom-location-button';
                        controlDiv.title = 'Ir a mi ubicación';
                        controlDiv.style.margin = '8px';

                        const controlUI = document.createElement('div');
                        controlUI.className = 'button';
                        controlUI.style.backgroundColor = '#fff';
                        controlUI.style.border = 'none';
                        controlUI.style.width = '32px';
                        controlUI.style.height = '32px';
                        controlUI.style.borderRadius = '4px';
                        controlUI.style.cursor = 'pointer';
                        controlUI.style.backgroundSize = '180px 18px';
                        controlUI.style.backgroundPosition = '0px 0px';
                        controlUI.style.backgroundRepeat = 'no-repeat';
                        controlUI.style.boxShadow = 'none'; // Eliminar cualquier sombra

                        controlDiv.appendChild(controlUI);

                        controlUI.addEventListener('click', () => {
                            if (!navigator.geolocation) return alert("Geolocalización no disponible");

                            navigator.geolocation.getCurrentPosition(
                                (position) => {
                                    const pos = {
                                        lat: position.coords.latitude,
                                        lng: position.coords.longitude,
                                    };
                                    map.panTo(pos);
                                    map.setZoom(15);
                                    controlUI.style.backgroundPosition = '-144px 0px'; // animación final
                                },
                                () => {
                                    alert("No se pudo obtener tu ubicación");
                                    controlUI.style.backgroundPosition = '0px 0px';
                                }
                            );
                        });

                        map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
                    }}
                >

                    {enrichedListings.map((property) => (
                        <Marker
                            key={property.id}
                            position={{ lat: property.lat, lng: property.lng }}
                            onClick={() => navigate(`/listing/details/${property.id}`)}
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/transparent.png",
                                labelOrigin: new window.google.maps.Point(15, 10),
                            }}
                            label={{
                                text: `${parseFloat(property.precio).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`,
                                color: '#ffffff',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                className: 'price-label',
                            }}
                        />

                    ))}


                </GoogleMap>
            )}
        </div>
    );
};

function getMarkerIcon(propertyType) {
    const icons = {
        apartment: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        house: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
        commercial: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        default: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    };
    return icons[propertyType] || icons.default;
}

export default MapView;
