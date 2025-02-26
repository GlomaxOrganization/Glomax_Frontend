import {useEffect, useState} from "react";
import {User} from "../types/types.ts";

export const useFetchUser = () => {
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            const response = await fetch("http://localhost:8080/user", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) return;

            const text = await response.text(); // Lee la respuesta como texto
            if (!text){
                localStorage.removeItem("user");
                return null;
            } // Si está vacía, retorna null

            return JSON.parse(text); // Parsea solo si hay contenido
        } catch (error) {
            console.error("Fetch user failed:", error);
            return null;
        }
    };

    useEffect(() => {
        fetchUser().then(userData => {
            if (userData) {
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            }
        });
    }, []);

    return user;
};
