import { useFetchCategories } from "../functions/useFetchCategories.tsx";
import { ProductCard } from "../components/products/ProductCard.tsx";
import { Header } from "../components/General/Header.tsx";
import {Filters} from "../components/products/Filters.tsx";
import {Category} from "../types/types.ts";
import {useEffect, useState} from "react";

export const Products = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const initialCategories = useFetchCategories();

    useEffect(() => {
        setCategories(initialCategories);
    }, [initialCategories]);

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8 min-h-[93vh]">
                <h1 className="text-4xl font-bold text-center text-black mb-6">
                    Descubre nuestros productos
                </h1>
                <p className="text-lg text-center text-black max-w-2xl mx-auto mb-8">
                    Explora nuestra colección de productos cuidadosamente seleccionados. Desde los colores más vibrantes
                    hasta los estilos más elegantes, encuentra lo que mejor se adapta a ti.
                </p>

                <Filters setCategories={setCategories}/>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <ProductCard key={category.id} category={category}/>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-black font-semibold text-2xl">
                            No hay productos disponibles en este momento.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};
