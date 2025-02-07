import { useEffect, useState } from 'react';
import {Size} from "../types/types.ts";

export const useFetchSizes = () => {
    const [sizes, setSizes] = useState<Size[]>([]);

    const fetchSizes = async () => {
        try {
            const response = await fetch("http://localhost:8080/sizes", {
                method: "GET",
                credentials: "include",
            });

            return await response.json();
        } catch (error) {
            console.error("Fetch types failed:", error);
        }
    };

    useEffect(() => {
        fetchSizes().then(r => {
            setSizes(r as Size[]);
        } )
    },[])

    return sizes;
};
