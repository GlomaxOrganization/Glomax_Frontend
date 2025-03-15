import { ImageGallery } from "../Utilities/ImageGallery.tsx";
import { Category, ItemCart } from "../../types/types.ts";
import { useEffect, useState } from "react";
import { useFetchProduct } from "../../functions/useFetchProduct.tsx";
import { Notification } from "../Notification.tsx";
import { useModal } from "../Utilities/useModal.tsx";

export const Detail = ({ category }: { category: Category | null }) => {
    const [error, setError] = useState<string>("");
    const [amountSelected, setAmountSelected] = useState<number>(1);
    const [sizeSelected, setSizeSelected] = useState<number>(0);
    const [colorSelected, setColorSelected] = useState<number>(0);
    const [isAvailable, setIsAvailable] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState(false);
    const { isOpen, isVisible, setIsOpen, closeWithAnimation } = useModal();

    useEffect(() => {
        if (category) {
            setSizeSelected(category.sizes.length ? category.sizes[0].id : 0);
            setColorSelected(category.colors.length ? category.colors[0].id : 0);
        }
    }, [category]);

    const product = useFetchProduct(category?.id ?? 1, sizeSelected, colorSelected);

    useEffect(() => {
        setIsAvailable(product == null);
    }, [product]);

    const addToCart = () => {
        if (!product) {
            setError("No se puede agregar un producto inexistente.");
            setShowNotification(true);
            return;
        }

        if(product.stock < amountSelected) {
            setError("La cantidad máxima disponible es "+ product.stock);
            setShowNotification(true);
            return;
        }

        const cart: ItemCart[] = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingProductIndex = cart.findIndex(
            (item) =>
                item.product.size.id === sizeSelected &&
                item.product.color.id === colorSelected
        );

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].amount += amountSelected;
        } else {
            const size = product.category.sizes.find((s) => s.id === sizeSelected);
            const color = product.category.colors.find((c) => c.id === colorSelected);

            if (!size || !color) {
                throw new Error("No se encontró el tamaño o color seleccionado.");
            }

            const newProduct: ItemCart = {
                product,
                amount: amountSelected,
            };

            cart.push(newProduct);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setError("Producto agregado correctamente!");
        setShowNotification(true);
    };

    return (
        <>
            {category && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-10 min-h-[92vh] md:pt-28">
                    <div className="w-full lg:w-[80%] mx-auto">
                        <ImageGallery images={category.images} />
                    </div>

                    <div className="flex flex-col gap-8 p-4 lg:p-0">
                        <h1 className="text-black text-xl font-semibold">
                            <a href="/productos">Productos {'>'}</a>
                        </h1>

                        <h1 className="text-black text-4xl font-bold">{category.name}</h1>

                        <div className="grid gap-2">
                            <h2 className="text-black text-4xl font-bold">
                                ${((category.price * 1.2).toFixed(2))}
                            </h2>
                            <h2 className="text-black text-2xl font-semibold">
                                ¡${category.price.toFixed(2)} con transferencia!
                            </h2>
                        </div>

                        <div className="grid gap-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Talles */}
                                <div className="flex flex-col">
                                    <label className="block mb-2 text-lg font-medium text-black">
                                        Talles
                                    </label>
                                    <select
                                        className="select select-bordered bg-[#5C4033] w-full max-w-xs text-white"
                                        onChange={(e) => setSizeSelected(Number(e.target.value))}
                                        value={sizeSelected}
                                    >
                                        {category.sizes.reverse().map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.description}
                                            </option>
                                        ))}
                                    </select>
                                    <span
                                        onClick={() => setIsOpen(true)}
                                        className="pt-2 text-left font-semibold cursor-pointer"
                                    >
                                        Ver guía de talles
                                    </span>
                                </div>

                                <div>
                                    <label className="block mb-2 text-lg font-medium text-black">
                                        Colores
                                    </label>
                                    <select
                                        className="select select-bordered bg-[#5C4033] w-full max-w-xs text-white"
                                        onChange={(e) => setColorSelected(Number(e.target.value))}
                                        value={colorSelected}
                                    >
                                        {category.colors.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 items-end gap-6">
                                <div>
                                    <label className="block mb-2 text-lg font-medium text-black">
                                        Cantidad
                                    </label>
                                    <input
                                        type="number"
                                        value={amountSelected}
                                        min={1}
                                        max={10}
                                        onChange={(e) => setAmountSelected(Number(e.target.value))}
                                        className="input input-bordered w-full bg-[#5C4033] text-white"
                                    />
                                </div>

                                <button
                                    disabled={isAvailable}
                                    className={`w-full text-white ${
                                        isAvailable ? "bg-gray-400" : "bg-[#5C4033]"
                                    } font-semibold py-3 rounded-lg transition-all duration-200`}
                                    onClick={addToCart}
                                >
                                    {isAvailable ? "Sin stock" : "Agregar al carrito"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {isOpen && (
                        <div
                            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity ${
                                isVisible ? "opacity-100" : "opacity-0"
                            }`}
                            onClick={closeWithAnimation}
                        >
                            <div className="max-w-[90%] lg:max-w-5xl p-6 rounded-xl bg-white shadow-lg transform transition-all duration-300">
                                <img
                                    src={category.sizeGuide}
                                    alt="Guía de talles"
                                    className="rounded-xl"
                                />
                            </div>
                        </div>
                    )}

                    {showNotification && (
                        <Notification message={error} onClose={() => setShowNotification(false)} />
                    )}
                </div>
            )}
        </>
    );
};
