import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PostCard = ({ title, description, images = [] }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [hovered, setHovered] = useState(false);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg border hover:shadow-xl transition"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative h-60 w-full bg-gray-200">
                <img
                    src={images[currentImage]}
                    alt={`Imagen ${currentImage + 1}`}
                    className="h-full w-full object-cover transition duration-300"
                />
                {hovered && images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                        >
                            <ChevronRight />
                        </button>
                    </>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ListingCard;
