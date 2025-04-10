import { useEffect, useState } from 'react';
import {Color} from "../types/types.ts";

export const useFetchColors = () => {
    const [colors, setColors] = useState<Color[]>([]);

    const fetchColors = async () => {
        try {
            const response = await fetch("https://glomaxbackend.up.railway.app/colors", {
                method: "GET",
                credentials: "include",
            });

            return await response.json();
        } catch (error) {
            console.error("Fetch types failed:", error);
        }
    };

    useEffect(() => {
        fetchColors().then(r => {
            setColors(r as Color[]);
        } )
    },[])

    return colors;
};
