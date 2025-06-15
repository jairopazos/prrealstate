import React, { useMemo, useState, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import './ListingsMap.css';

const MapView = ({ properties = [] }) => {
    const mapRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyD19U9Vco8vll51H89mdqz_dE3txKqSO_g"
    });

    const center = useMemo(() => {
        if (properties.length === 0) return { lat: 40.4168, lng: -3.7038 };
        const avgLat = properties.reduce((sum, prop) => sum + prop.lat, 0) / properties.length;
        const avgLng = properties.reduce((sum, prop) => sum + prop.lng, 0) / properties.length;
        return { lat: avgLat, lng: avgLng };
    }, [properties]);

    const handleGeolocation = () => {
        if (!navigator.geolocation) return;

        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log('Posición obtenida:', pos); // Verifica la posición

                setUserLocation(pos);
                if (mapRef.current) {
                    mapRef.current.panTo(pos);
                    mapRef.current.setZoom(15);
                }
                setLoadingLocation(false);
            },
            () => {
                alert('No se pudo obtener tu ubicación.');
                setLoadingLocation(false);
            }
        );
    };

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

                    {properties.map((property) => (
                        <Marker
                            key={property.id}
                            position={{ lat: property.lat, lng: property.lng }}
                            onClick={() => setSelectedProperty(property)}
                            icon={{
                                url: getMarkerIcon(property.type),
                                scaledSize: new window.google.maps.Size(30, 30)
                            }}
                        />
                    ))}

                    {selectedProperty && (
                        <InfoWindow
                            position={{ lat: selectedProperty.lat, lng: selectedProperty.lng }}
                            onCloseClick={() => setSelectedProperty(null)}
                        >
                            <div className="property-info-window">
                                <h3>{selectedProperty.title}</h3>
                                <p>Precio: ${selectedProperty.price.toLocaleString()}</p>
                                <p>Habitaciones: {selectedProperty.bedrooms}</p>
                                <p>Tipo: {selectedProperty.type}</p>
                                <button
                                    onClick={() => window.location.href = `/property/${selectedProperty.id}`}
                                    className="details-button"
                                >
                                    Ver detalles
                                </button>
                            </div>
                        </InfoWindow>
                    )}
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
