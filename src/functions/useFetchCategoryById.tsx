import { useEffect, useState } from 'react';
import {Category} from "../types/types";

export const useFetchCategoryById = (id: string | undefined) => {
    const [category, setCategory] = useState<Category | null>(null);

    const fetchCategory = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+`/getCategoryById?id=${id}`, {
                method: "GET",
                credentials: "include",
            });

            return await response.json();
        } catch (error) {
            console.error("Fetch user failed:", error);
        }
    };

    useEffect(() => {
        fetchCategory().then(r => {
            setCategory(r as Category);
        } )
    },[id])

    return category;
};
