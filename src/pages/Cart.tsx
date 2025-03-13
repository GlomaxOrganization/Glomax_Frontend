import { Header } from "../components/General/Header.tsx";
import { ItemCart } from "../types/types.ts";
import { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useFetchUser } from "../functions/useFetchUser.tsx";
import { useFetchTypesPurchase } from "../functions/useFetchTypesPurchase.tsx";
import { TransferData } from "./TransferData.tsx";

export const Cart = () => {
    initMercadoPago(`${import.meta.env.VITE_MERCADO_PAGO_TOKEN}`, { locale: "es-AR" });

    const [cart, setCart] = useState<ItemCart[]>([]);
    const [typePurchaseSelected, setTypePurchaseSelected] = useState<number>(1);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [error, setError] = useState<string>("");
    const [isPaid, setIsPaid] = useState<boolean>(false);
    const user = useFetchUser();
    const typesPurchase = useFetchTypesPurchase();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]") as ItemCart[];
        setCart(storedCart);
    }, []);

    const updateCart = (newCart: ItemCart[]) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const handleRemoveItem = (index: number) => {
        updateCart(cart.filter((_, i) => i !== index));
    };

    const handleAmountChange = (index: number, delta: number) => {
        const updatedCart = [...cart];
        updatedCart[index].amount = Math.max(1, updatedCart[index].amount + delta);
        updateCart(updatedCart);
    };

    const totalPrice = cart.reduce((total, item) => total + item.amount * item.product.category.price, 0);

    const createPreference = async () => {
        try {
            const { data } = await axios.post("http://localhost:8080/create-preference", cart, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            return data;
        } catch (error) {
            console.error("Error al crear la preferencia:", error);
        }
    };

    const handleTransfer = async () => {
        try {
            const response = await axios.post("http://localhost:8080/handle-transfer", cart, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            if (response.status === 200) setIsPaid(true);
        } catch (error) {
            console.error("Error al procesar la transferencia:", error);
        }
    };

    const handleBuy = async () => {
        const id = await createPreference();
        if (id) setPreferenceId(id);
    };

    const handlePurchase = () => {
        if (!user) return setError("¡Debe iniciar sesión para comprar!");
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        typePurchaseSelected === 1 ? handleBuy() : handleTransfer();
    };

    return (
        <div className="min-h-screen flex flex-col ">
            <Header />
            <div className="p-6 container mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#5C4033] mb-10">
                    Carrito de Compras
                </h1>

                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6 overflow-y-auto max-h-[70vh]">
                            {cart.map((item, index) => (
                                <div key={`${item.product.category.id}-${index}`} className="flex flex-col md:flex-row bg-[#5C4033] rounded-xl shadow-lg">
                                    <div className="w-full md:w-1/3">
                                        {item.product.category.images
                                            .find((i) => i.color.id === item.product.color.id) && (
                                            <img
                                                src={item.product.category.images.find((i) => i.color.id === item.product.color.id)?.source}
                                                alt={item.product.category.name}
                                                className="w-full h-64 object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                                            />
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col justify-between w-full">
                                        <h2 className="text-xl md:text-2xl font-semibold text-white">
                                            <a href={`/productDetail/${item.product.category.id}`}>
                                                {item.product.category.name}
                                            </a>
                                        </h2>
                                        <p className="text-white mt-2">
                                            <strong>Talle:</strong> {item.product.size.description} | <strong>Color:</strong> {item.product.color.description}
                                        </p>

                                        <div className="flex items-center gap-3 mt-4">
                                            <p className="text-white font-medium">Cantidad:</p>
                                            <button onClick={() => handleAmountChange(index, -1)} className="px-2 py-1 bg-[#FFDEAFFF] rounded hover:bg-[#C8994AFF]">-</button>
                                            <span className="text-lg text-white">{item.amount}</span>
                                            <button onClick={() => handleAmountChange(index, 1)} className="px-2 py-1 bg-[#FFDEAFFF] rounded hover:bg-[#C8994AFF]">+</button>
                                        </div>

                                        <p className="text-white font-bold mt-4">
                                            Total: ${(item.amount * item.product.category.price).toFixed(2)}
                                        </p>

                                        <button onClick={() => handleRemoveItem(index)} className="mt-4 bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black font-semibold px-4 py-2 rounded-lg">
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="bg-[#5C4033] text-white p-6 rounded-xl h-fit sticky top-20 mb-10">
                                <h2 className="text-2xl font-bold mb-6">Resumen de Compra</h2>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-lg">Productos:</p>
                                    <p className="text-lg font-bold break-all">{cart.reduce((total, item) => total + item.amount, 0)}</p>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-lg">Total:</p>
                                    <p className="text-lg font-bold break-all">${totalPrice.toFixed(2)}</p>
                                </div>
                                <p className="text-lg font-bold break-all mb-1">Medio de pago</p>
                                <select
                                    onChange={(e) => setTypePurchaseSelected(Number(e.target.value))}
                                    className="select select-bordered bg-[#FFDEAFFF] text-black w-full mb-4"
                                >
                                    {typesPurchase.map((t) => (
                                        <option key={t.id} value={t.id}>{t.description}</option>
                                    ))}
                                </select>

                                <button onClick={handlePurchase}
                                        className="w-full bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black font-semibold py-2 rounded-lg">
                                    Finalizar Compra
                                </button>

                                {error && <p className="text-red-400 mt-4">{error}</p>}
                                {preferenceId && <Wallet initialization={{preferenceId}}
                                                         customization={{texts: {valueProp: "smart_option"}}}/>}

                            </div>
                            {isPaid && <TransferData/>}
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600 text-xl">🛍️ Tu carrito está vacío. Agrega productos para
                        comenzar.</p>
                )}
            </div>
        </div>
    );
};
