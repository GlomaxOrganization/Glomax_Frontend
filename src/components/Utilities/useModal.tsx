import { useState, useEffect, useCallback } from "react";

export const useModal = (initialState = false, animationDuration = 300) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const [isVisible, setIsVisible] = useState(false);

    const closeWithAnimation = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), animationDuration);
    }, [animationDuration]);

    const handleKeyDown = useCallback((
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        event) => {
        if (event.key === "Escape") {
            closeWithAnimation();
        }
    }, [closeWithAnimation]);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            window.addEventListener("keydown", handleKeyDown);
            document.body.classList.add("overflow-hidden");
        } else {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.classList.remove("overflow-hidden");
        };
    }, [handleKeyDown, isOpen]);

    return { isOpen, isVisible, setIsOpen, closeWithAnimation };
};