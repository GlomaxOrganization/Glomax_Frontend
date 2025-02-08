import { Image } from "../../types/types.ts";
import { useState } from "react";
import { Carousel } from "./Carousel.tsx";
import {useModal} from "./useModal.tsx";

export const ImageGallery = ({ images }: { images: Image[] }) => {
    const [imageSelected, setImageSelected] = useState<Image | null>(images.length > 0 ? images[0] : null);
    const { isOpen, isVisible, setIsOpen, closeWithAnimation } = useModal();

    return (
        <>
            <div className="flex">
                <div className="grid gap-4 w-[20%]">
                    {images.slice(0, 5).map((image, index) => (
                        <div key={index} className="h-32 w-32 relative">
                            <img
                                className="rounded-lg w-full h-full cursor-pointer"
                                src={image.source}
                                alt="Image"
                                onClick={() => setImageSelected(image)}
                            />
                            {index === 4 && images.length > 5 && (
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-80 z-10
                                               rounded-lg text-white text-5xl flex items-center justify-center cursor-pointer"
                                    onClick={() => {
                                        setIsOpen(true)
                                        setImageSelected(image);
                                    }}
                                >
                                    +{images.length - 5}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="w-[80%]">
                    {imageSelected ? (
                        <img className="h-[85vh] w-full rounded-lg" src={imageSelected.source} alt="Image" />
                    ) : (
                        <div className="h-[85vh] w-full flex items-center justify-center text-gray-500">
                            No hay imágenes disponibles
                        </div>
                    )}
                </div>
            </div>

            {isOpen && imageSelected && (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[80] 
                                transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                    onClick={closeWithAnimation}
                >
                    <div
                        className={`max-w-5xlrounded-2xl shadow-lg p-6 
                                    transform transition-all duration-300 ease-out ${
                            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        }`}
                    >
                        <Carousel images={images} imageSelected={imageSelected} />
                    </div>
                </div>
            )}
        </>
    );
};
