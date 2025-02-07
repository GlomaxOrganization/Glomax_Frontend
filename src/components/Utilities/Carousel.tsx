import { Image } from "../../types/types.ts";
import { useState } from "react";

export const Carousel = ({ images, imageSelected }: { images: Image[], imageSelected: Image }) => {
    const [currentIndex, setCurrentIndex] = useState(images.findIndex(img => img.source === imageSelected.source));

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative lg:w-[600px] lg:h-[800px] mx-auto flex items-center justify-center"
             onClick={(e) => e.stopPropagation()}
        >
            <img src={images[currentIndex].source}
                 className="w-full h-full object-cover rounded-lg"
                 alt="Carousel Image"/>

            <button
                className="absolute left-5 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
                onClick={prevSlide}
            >
                ❮
            </button>

            <button
                className="absolute right-5 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
                onClick={nextSlide}
            >
                ❯
            </button>

            <div className="absolute bottom-5 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`h-3 w-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};
