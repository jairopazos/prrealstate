import React, { useState } from 'react';
import './ListingCard.css';

const ListingCard = ({ listing, onClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? listing.urls.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === listing.urls.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="listing-card" onClick={() => onClick(listing)}>
            <div className="carousel">
                <img
                    src={listing.urls[currentIndex]}
                    alt={`listing-${currentIndex}`}
                    className="carousel-image"
                />
                {listing.urls.length > 1 && (
                    <>
                        <button className="arrow left" onClick={handlePrev}>❮</button>
                        <button className="arrow right" onClick={handleNext}>❯</button>
                    </>
                )}
            </div>
            <h3>{listing.name}</h3>
            <h3>{parseFloat(listing.precio).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €</h3>
            <p className="listing-description">{listing.description}</p>
        </div>
    );
};

export default ListingCard;
