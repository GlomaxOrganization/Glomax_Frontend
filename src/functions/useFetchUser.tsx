import { useEffect, useState } from "react";
import { User } from "../types/types.ts";

export const useFetchUser = (shouldFetch : boolean) => {
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            const response = await fetch("https://glomaxbackend.up.railway.app/user", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) return;

            const text = await response.text();
            if (!text) {
                localStorage.removeItem("user");
                return null;
            }

            return JSON.parse(text);
        } catch (error) {
            console.error("Fetch user failed:", error);
            return null;
        }
    };

    useEffect(() => {
        if (!shouldFetch) return;

        fetchUser().then(userData => {
            if (userData) {
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            }
        });
    }, [shouldFetch]);

    return user;
};
