import { useEffect, useState } from "react";
import {Image} from "../../types/types.ts";


export const ImageCarousel = (props: { images: Image[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { images } = props;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="carousel h-96 w-full relative">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`carousel-item absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={image.source}
                        alt={image.source}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
        </div>
    );
};
