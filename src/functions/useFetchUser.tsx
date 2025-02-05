import { useEffect, useState } from 'react';
import {User} from "../types/types";

export const useFetchUser = () => {
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            const response = await fetch("http://localhost:8080/session", {
                method: "GET",
                credentials: "include",
            });

            return await response.json();
        } catch (error) {
            console.error("Fetch user failed:", error);
        }
    };

    useEffect(() => {
        fetchUser().then(r => {
            setUser(r as User);
        } )
    },[])

    return user;
};
