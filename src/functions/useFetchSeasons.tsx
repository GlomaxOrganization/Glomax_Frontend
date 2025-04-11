import { useEffect, useState } from 'react';
import {Season} from "../types/types.ts";

export const useFetchSeasons = () => {
    const [seasons, setSeasons] = useState<Season[]>([]);

    const fetchSeasons = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/seasons", {
                method: "GET",
                credentials: "include",
            });

            return await response.json();
        } catch (error) {
            console.error("Fetch types failed:", error);
        }
    };

    useEffect(() => {
        fetchSeasons().then(r => {
            setSeasons(r as Season[]);
        } )
    },[])

    return seasons;
};
