import {useFetchCategories} from "../functions/useFetchCategories.tsx";
import {ProductCard} from "../components/ProductCard.tsx";
import {Header} from "../components/General/Header.tsx";

export const Products = () => {
    const categories = useFetchCategories();
    return (
        <>
            <Header/>
            <div className="grid grid-cols-3 gap-4">
                {categories.map((category) => (
                    <ProductCard key={category.id} category={category}/>
                ))}
            </div>
        </>
    )
}