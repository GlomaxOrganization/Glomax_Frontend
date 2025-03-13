import { useParams } from "react-router-dom";
import { useFetchCategoryById } from "../functions/useFetchCategoryById.tsx";
import { Header } from "../components/General/Header.tsx";
import { useState, useEffect } from "react";
import { useFetchSimilarCategories } from "../functions/useFetchSimilarCategories.tsx";
import { ProductCard } from "../components/products/ProductCard.tsx";
import { Detail } from "../components/products/Detail.tsx";

export const ProductDetail = () => {
    const { id } = useParams();
    const category = useFetchCategoryById(id);

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [itemsPerView, setItemsPerView] = useState<number>(3);

    const similarCategories = useFetchSimilarCategories(
        category ? category.type.id : 1,
        category ? category.id : 1
    );

    const updateItemsPerView = () => {
        if (window.innerWidth < 640) {
            setItemsPerView(1);
        } else if (window.innerWidth < 1024) {
            setItemsPerView(2);
        } else {
            setItemsPerView(3);
        }
    };

    useEffect(() => {
        updateItemsPerView();
        window.addEventListener("resize", updateItemsPerView);
        return () => window.removeEventListener("resize", updateItemsPerView);
    }, []);

    const getVisibleCategories = () => {
        if (!similarCategories) return [];

        const visibleItems = similarCategories.slice(currentIndex, currentIndex + itemsPerView);

        if (visibleItems.length < itemsPerView) {
            return [
                ...visibleItems,
                ...similarCategories.slice(0, itemsPerView - visibleItems.length),
            ];
        }

        return visibleItems;
    };

    const handleNext = () => {
        if (similarCategories) {
            setCurrentIndex((prevIndex) =>
                prevIndex + itemsPerView >= similarCategories.length ? 0 : prevIndex + 1
            );
        }
    };

    const handlePrev = () => {
        if (similarCategories) {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0
                    ? Math.max(0, similarCategories.length - itemsPerView)
                    : prevIndex - 1
            );
        }
    };

    return (
        <div className="min-h-[93vh]">
            <Header />

            <div className="container mx-auto">
                <Detail category={category} />

                {similarCategories && similarCategories.length > 0 && (
                    <div className="flex flex-col gap-24 pb-20">
                        <h2 className="text-4xl font-bold text-center">Productos similares</h2>

                        <div className="relative overflow-hidden w-full mx-auto">
                            <button
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-3xl p-2 bg-[#5C4033] text-white shadow-md rounded-full z-10"
                                onClick={handlePrev}
                                aria-label="Anterior"
                            >
                                &lt;
                            </button>

                            <div className="flex transition-transform duration-300 ease-in-out">
                                {getVisibleCategories().map((category, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2"
                                    >
                                        <ProductCard category={category} />
                                    </div>
                                ))}
                            </div>

                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-3xl p-2 bg-[#5C4033] text-white shadow-md rounded-full z-10"
                                onClick={handleNext}
                                aria-label="Siguiente"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
