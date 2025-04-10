import { useEffect, useState } from 'react';
import {TypePurchase} from "../types/types";

export const useFetchTypesPurchase = () => {
    const [typesPurchase, setTypesPurchase] = useState<TypePurchase[]>([]);

    const fetchTypesPurchase = async () => {
        try {
            const response = await fetch("https://glomaxbackend.up.railway.app/typesPurchase", {
                method: "GET",
                credentials: "include",
            });

            return await response.json();
        } catch (error) {
            console.error("Fetch user failed:", error);
        }
    };

    useEffect(() => {
        fetchTypesPurchase().then(r => {
            setTypesPurchase(r as TypePurchase[]);
        } )
    },[])

    return typesPurchase;
};
