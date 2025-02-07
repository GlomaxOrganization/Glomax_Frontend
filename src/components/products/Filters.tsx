import { useEffect, useState } from "react";
import { useFetchTypes } from "../../functions/useFetchTypes.tsx";
import { useFetchSizes } from "../../functions/useFetchSizes.tsx";
import { useFetchColors } from "../../functions/useFetchColors.tsx";
import * as React from "react";
import { Category } from "../../types/types.ts";

export const Filters = (props: { setCategories: (categories: Category[]) => void }) => {
    const applyFilters = (filteredCategories: Category[]) => {
        props.setCategories(filteredCategories);
    };

    const types = useFetchTypes();
    const colors = useFetchColors();
    const sizes = useFetchSizes();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [typesSelected, setTypesSelected] = useState<number[]>([]);
    const [sizesSelected, setSizesSelected] = useState<number[]>([]);
    const [colorsSelected, setColorsSelected] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleSelectionChange = (
        id: number,
        isChecked: boolean,
        setState: React.Dispatch<React.SetStateAction<number[]>>
    ) => {
        setState((prev) => (isChecked ? [...prev, id] : prev.filter((item) => item !== id)));
    };

    const closeWithAnimation = () => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 300);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyDown = (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        event
    ) => {
        if (event.key === "Escape") {
            closeWithAnimation();
        }
    };

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

    const filterCategories = async (e: React.FormEvent) => {
        e.preventDefault();
        if (typesSelected.length < 1 && sizesSelected.length < 1 && colorsSelected.length < 1) {
            setError("No ha seleccionado ningún filtro!");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/categoriesFiltered`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    types: typesSelected,
                    sizes: sizesSelected,
                    colors: colorsSelected,
                }),
                credentials: 'include',
            });
            
            const categoriesData = await response.json();
            applyFilters(categoriesData);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError("Ocurrió un error desconocido!");
        } finally {
            setIsOpen(false);
        }
    };

    return (
        <>
            {!isOpen ? (
                <button
                    className="btn btn-primary bg-[#5C4033] hover:bg-[#7D4E30] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(true)}
                >
                    Más filtros
                </button>
            ) : (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[80] transition-opacity duration-300 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={closeWithAnimation}
                >
                    <div
                        className={`modal-box md:w-[50%] w-[90%] max-w-5xl bg-[#5C4033] rounded-2xl shadow-lg p-6 transform transition-all duration-300 ease-out ${
                            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-3 right-3 text-white hover:text-gray-300 text-xl font-bold"
                            onClick={closeWithAnimation}
                        >
                            ✕
                        </button>

                        <h2 className="text-white text-2xl font-semibold text-center mb-4">Filtros</h2>

                        <form className="grid gap-10" onSubmit={filterCategories}>
                            <div>
                                <label className="block mb-2 text-lg font-medium text-white">Tipo</label>
                                <div className="grid grid-cols-4">
                                    {types.map((t) => (
                                        <label key={t.id} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="checkbox border-white bg-[#5C4033]"
                                                checked={typesSelected.includes(t.id)}
                                                onChange={(e) => handleSelectionChange(t.id, e.target.checked, setTypesSelected)}
                                            />
                                            <span className="text-white">{t.description}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-lg font-medium text-white">Talles</label>
                                <div className="grid grid-cols-5">
                                    {sizes.map((s) => (
                                        <label key={s.id} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="checkbox border-white bg-[#5C4033]"
                                                checked={sizesSelected.includes(s.id)}
                                                onChange={(e) => handleSelectionChange(s.id, e.target.checked, setSizesSelected)}
                                            />
                                            <span className="text-white">{s.description}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-lg font-medium text-white">Colores</label>
                                <div className="grid grid-cols-6 gap-y-4">
                                    {colors.map((c) => (
                                        <label key={c.id} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="checkbox border-white bg-[#5C4033]"
                                                checked={colorsSelected.includes(c.id)}
                                                onChange={(e) => handleSelectionChange(c.id, e.target.checked, setColorsSelected)}
                                            />
                                            <span className="text-white">{c.description}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <button
                                    type="submit"
                                    className="w-full bg-white text-[#5C4033] hover:bg-gray-200 font-semibold py-3 rounded-lg transition-all duration-200"
                                >
                                    Aplicar filtros
                                </button>
                                {error && <p className={'text-white text-center'}>{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
