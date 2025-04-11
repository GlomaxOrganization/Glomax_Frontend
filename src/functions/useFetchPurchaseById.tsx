import { useEffect, useState } from 'react';
import {Purchase} from "../types/types";

export const useFetchPurchaseById = (id: string | undefined) => {
    const [purchase, setPurchase] = useState<Purchase | null>(null);

    const fetchPurchase = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/getPurchaseById?id=${id}", {
                method: "GET",
                credentials: "include",
            });

            return await response.json();
        } catch (error) {
            console.error("Fetch user failed:", error);
        }
    };

    useEffect(() => {
        fetchPurchase().then(r => {
            setPurchase(r as Purchase);
        } )
    },[id])

    return purchase;
};
