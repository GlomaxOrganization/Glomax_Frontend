import { useEffect, useState } from 'react';
import {Category} from "../types/types";

export const useFetchCategories = (index : number) => {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:8080/categories?index="+index, {
                method: "GET",
                credentials: "include",
            });

            return await response.json();
        } catch (error) {
            console.error("Fetch user failed:", error);
        }
    };

    useEffect(() => {
        fetchCategories().then(r => {
            setCategories(r as Category[]);
        } )
    },[index])

    return categories;
};
