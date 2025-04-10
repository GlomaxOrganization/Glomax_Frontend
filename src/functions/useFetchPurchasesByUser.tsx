import { useEffect, useState } from 'react';
import {Purchase} from "../types/types";

export const useFetchPurchasesByUser = () => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);

    const fetchPurchasesByUser = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/purchases-by-user", {
                method: "GET",
                credentials: "include",
            });

            return await response.json();
        } catch (error) {
            console.error("Fetch user failed:", error);
        }
    };

    useEffect(() => {
        fetchPurchasesByUser().then(r => {
            setPurchases(r as Purchase[]);
        } )
    },[])

    return purchases;
};
