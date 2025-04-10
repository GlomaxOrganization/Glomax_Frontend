import { useEffect, useState } from 'react';
import {Category} from "../types/types";

export const useFetchSimilarCategories = (typeId: number | undefined, id : number | undefined) => {
    const [categories, setCategories] = useState<Category[] | null>(null);

    const fetchSimilarCategories = async () => {
        try {
            const response = await fetch(`https://glomaxbackend.up.railway.app/getSimilarCategories?typeId=${typeId}`, {
                method: "GET",
                credentials: "include",
            });

            return await response.json();
        } catch (error) {
            console.error("Fetch user failed:", error);
        }
    };

    useEffect(() => {
        fetchSimilarCategories().then(r => {
            setCategories(r as Category[]);
        } )
    },[typeId])

    return categories?.filter(c => c.id !== id);
};
