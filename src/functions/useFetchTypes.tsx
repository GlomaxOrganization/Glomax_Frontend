import { useEffect, useState } from 'react';
import {Type} from "../types/types.ts";

export const useFetchTypes = () => {
    const [types, setTypes] = useState<Type[]>([]);

    const fetchType = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/types", {
                method: "GET",
                credentials: "include",
            });

            return await response.json();
        } catch (error) {
            console.error("Fetch types failed:", error);
        }
    };

    useEffect(() => {
        fetchType().then(r => {
            setTypes(r as Type[]);
        } )
    },[])

    return types;
};
