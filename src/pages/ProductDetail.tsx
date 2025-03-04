import {useParams} from "react-router-dom";
import {useFetchCategoryById} from "../functions/useFetchCategoryById.tsx";
import {Header} from "../components/General/Header.tsx";
import {useState} from "react";
import {useFetchSimilarCategories} from "../functions/useFetchSimilarCategories.tsx";
import {ProductCard} from "../components/products/ProductCard.tsx";
import {Detail} from "../components/products/Detail.tsx";

export const ProductDetail = () => {
    const { id } = useParams();
    const category = useFetchCategoryById(id);

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const similarCategories = useFetchSimilarCategories(category ? category.type.id : 1, category ? category.id : 1);

    const getVisibleCategories = () => {
        if (!similarCategories) return [];

        const itemsPerView = getItemsPerView();
        const visibleItems = similarCategories.slice(currentIndex, currentIndex + itemsPerView);

        if (visibleItems.length < itemsPerView) {
            return [
                ...visibleItems,
                ...similarCategories.slice(0, itemsPerView - visibleItems.length),
            ];
        }

        return visibleItems;
    };

    const getItemsPerView = () => {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    };

    const handleNext = () => {
        const itemsPerView = getItemsPerView();
        if (similarCategories && currentIndex + itemsPerView >= similarCategories.length) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        const itemsPerView = getItemsPerView();
        if (currentIndex === 0) {
            setCurrentIndex(similarCategories ? similarCategories.length - itemsPerView : 0);
        } else {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <div className="min-h-[93vh]">
            <Header />
            <div className={''}>
                <Detail category={category} />
                <div className={'flex flex-col gap-24 pb-20'}>
                    <h2 className={'text-4xl font-bold text-center'}>Productos similares</h2>
                    <div className="relative w-[95%] mx-auto">
                        <button
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl"
                            onClick={handlePrev}
                        >
                            &lt;
                        </button>
                        <div className="flex overflow-hidden">
                            {getVisibleCategories().map((category, index) => (
                                <ProductCard category={category} key={index}/>
                            ))}
                        </div>
                        <button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl"
                            onClick={handleNext}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}