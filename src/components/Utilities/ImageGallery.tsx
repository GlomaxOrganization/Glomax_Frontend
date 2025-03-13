import { Image } from "../../types/types.ts";
import { useState } from "react";
import { Carousel } from "./Carousel.tsx";
import { useModal } from "./useModal.tsx";

export const ImageGallery = ({ images }: { images: Image[] }) => {
    const [imageSelected, setImageSelected] = useState<Image | null>(images[0] || null);
    const { isOpen, isVisible, setIsOpen, closeWithAnimation } = useModal();

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-[20%] w-full">
                    <div className="hidden lg:grid gap-4">
                        {images.slice(0, 5).map((image, index) => (
                            <div key={index} className="h-24 relative cursor-pointer">
                                <img
                                    className="rounded-lg w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    src={image.source}
                                    alt={`Image ${index + 1}`}
                                    onClick={() => setImageSelected(image)}
                                />
                                {index === 4 && images.length > 5 && (
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-70 rounded-lg flex items-center justify-center text-white text-xl cursor-pointer"
                                        onClick={() => {
                                            setIsOpen(true);
                                            setImageSelected(image);
                                        }}
                                    >
                                        +{images.length - 5}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="lg:hidden flex gap-4 overflow-x-auto scrollbar-hide">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                className="h-20 w-20 rounded-lg object-cover cursor-pointer transition-transform hover:scale-105"
                                src={image.source}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setImageSelected(image)}
                            />
                        ))}
                    </div>
                </div>

                <div className="lg:w-[80%] w-full">
                    {imageSelected ? (
                        <img
                            className="w-full rounded-lg object-cover transition-opacity duration-500"
                            style={{
                                height: "auto",
                                maxHeight: "80vh",
                            }}
                            src={imageSelected.source}
                            alt="Selected image"
                        />
                    ) : (
                        <div className="h-[50vh] w-full flex items-center justify-center text-gray-500">
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
                        className={`w-full max-w-[90%] lg:max-w-5xl rounded-2xl shadow-lg p-6 
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
