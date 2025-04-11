import { useEffect, useState } from 'react';
import {Product} from "../types/types";

export const useFetchProduct = (categoryId: number | undefined, sizeId: number, colorId: number) => {
    const [product, setProduct] = useState<Product | null>(null);

    const fetchProduct = async () => {
        if(sizeId == 0) return;
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/getProduct", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    categoryId: categoryId,
                    sizeId: sizeId,
                    colorId: colorId,
                }),
                credentials: 'include',
            });
            return await response.json();
        } catch (error) {
            console.error("Fetch user failed:", error);
        }
    };

    useEffect(() => {
        fetchProduct().then(r => {
            setProduct(r as Product);
        } )
    },[categoryId, sizeId, colorId]);

    return product;
};
