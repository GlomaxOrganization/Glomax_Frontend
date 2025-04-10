import {useEffect, useRef, useState} from 'react';
import {Filter, Purchase} from "../types/types";

export const useFetchSales = (data: Filter, filtered: boolean) => {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const hasFetched = useRef(false); // Evita la doble ejecución


    const fetchPurchases = async () => {
        try {
            const response = await fetch("https://glomaxbackend.up.railway.app/purchases", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            return await response.json();
        } catch (error) {
            console.error("Fetch user failed:", error);
        }
    };

    useEffect(() => {
        fetchPurchases().then(r => {
            setPurchases(r as Purchase[]);
            if (hasFetched.current) return; // 🔴 Evita doble ejecución
            hasFetched.current = true;
        } )
    },[filtered]);

    return purchases;
};
