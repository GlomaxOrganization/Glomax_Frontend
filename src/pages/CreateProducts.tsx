import { useState } from "react";
import { Header } from "../components/General/Header.tsx";
import { useFetchColors } from "../functions/useFetchColors.tsx";
import * as React from "react";
import {useModal} from "../components/Utilities/useModal.tsx";

export const CreateProducts = () => {
    const colors = useFetchColors();
    const sizes = ["S", "M", "L", "XL", "XXL"];

    const [idCategory, setIdCategory] = useState<number>(0);
    const [idColor, setIdColor] = useState<string>("");
    const [stock, setStock] = useState<Record<string, number>>(
        sizes.reduce((acc, size) => ({ ...acc, [size]: 0 }), {})
    );
    const { isOpen, isVisible, setIsOpen, closeWithAnimation } = useModal();
    const [message , setMessage] = useState<string>("");

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIdCategory(Number(e.target.value));
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIdColor(e.target.value);
    };

    const handleStockChange = (size: string, value: number) => {
        setStock((prev) => ({ ...prev, [size]: value }));
    };

    const handleSubmit = async () => {
        const productData = {
            idCategory: idCategory,
            idColor: idColor,
            amounts: sizes.map((size) => stock[size]),
        };

        try {
            const response = await fetch("https://glomaxbackend.up.railway.app/create-products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) throw new Error("Error al crear el producto");
            setStock(sizes.reduce((acc, size) => ({ ...acc, [size]: 0 }), {}));

            setMessage("Products added successfully!");
            setIsOpen(true)
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un error al enviar los datos");
        }
    };

    return (
        <>
            <Header userObtained={null} />
            <div className="p-6 container mx-auto min-h-[86.6vh]">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#5C4033] mb-5">
                    Crear productos
                </h1>

                <div className="flex justify-around items-center gap-8">
                    <div>
                        <label htmlFor="category" className="lg:text-xl text-l font-semibold">
                            Categoría
                        </label>
                        <input
                            id="category"
                            type="number"
                            value={idCategory}
                            onChange={handleCategoryChange}
                            className="border border-black lg:text-xl text-l pl-2 mt-2 w-full"
                            min={0}
                        />
                    </div>

                    <div>
                        <label htmlFor="color" className="lg:text-xl text-l font-semibold">
                            Color
                        </label>
                        <select
                            id="color"
                            value={idColor}
                            onChange={handleColorChange}
                            className="select select-bordered bg-[#5C4033] w-full max-w-xs text-white mt-2"
                        >
                            <option value="">Seleccionar color</option>
                            {colors
                                .sort((a, b) => a.description.localeCompare(b.description))
                                .map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.description}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <table className="border border-black w-full mt-10" id="tablaProductos">
                    <thead>
                    <tr className="border border-black bg-[#5C4033] text-white lg:text-xl text-l font-bold">
                        <th className="border border-black">Talle</th>
                        <th className="border border-black">Stock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sizes.map((size) => (
                        <tr
                            key={size}
                            className="border border-black text-center lg:text-xl text-l font-semibold bg-[#ffdeaf]"
                        >
                            <td className={'border border-black'}>{size}</td>
                            <td>
                                <input
                                    type="number"
                                    value={stock[size] || ''}
                                    onChange={(e) => handleStockChange(size, Number(e.target.value))}
                                    className="border border-black lg:text-xl text-l pl-2 w-20"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="text-center mt-8">
                    <button
                        onClick={handleSubmit}
                        className="bg-[#5C4033] text-white px-6 py-2 rounded-lg lg:text-xl"
                    >
                        Guardar Productos
                    </button>
                </div>
            </div>

            {isOpen && (
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
                        <p className={'text-3xl text-center text-white'}>{message}</p>
                    </div>
                </div>
            )}
        </>
    );
};
