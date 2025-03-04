import { Header } from "../components/General/Header.tsx";
import { ItemCart } from "../types/types.ts";
import { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios";
import {useFetchUser} from "../functions/useFetchUser.tsx";
import {useFetchTypesPurchase} from "../functions/useFetchTypesPurchase.tsx";

export const Cart = () => {

    initMercadoPago(`${import.meta.env.VITE_MERCADO_PAGO_TOKEN}`, {
        locale: "es-AR",
    });

    const [cart, setCart] = useState<ItemCart[]>([]);
    const [typePurchaseSelected, setTypePurchaseSelected] = useState<number>(1);
    const [preferenceId, setPreferenceId] = useState(null);
    const [error, setError] = useState<string>("");
    const user= useFetchUser();
    const typesPurchase= useFetchTypesPurchase();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]") as ItemCart[];
        setCart(storedCart);
    }, []);

    const handleRemoveItem = (index: number) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleIncreaseAmount = (index: number) => {
        const updatedCart = [...cart];
        updatedCart[index].amount += 1;
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleDecreaseAmount = (index: number) => {
        const updatedCart = [...cart];
        if (updatedCart[index].amount > 1) {
            updatedCart[index].amount -= 1;
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
    };

    const totalPrice = cart.reduce((total, item) => total + item.amount * item.product.category.price, 0);

    const createPreference = async () => {
        const url = 'http://localhost:8080/create-preference';
        try {
            const response = await axios.post(url, cart, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error al crear la preferencia:", error);
        }
    };

    const handleTransfer = async () => {
        const url = 'http://localhost:8080/handle-transfer';
        try {
            const response = await axios.post(url, cart, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) window.location.href = "/datos-transferencia"
        } catch (error) {
            console.error("Error al crear la preferencia:", error);
        }
    };

    const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
    };

    return (
        <div className={'min-h-[100vh]'}>
            <Header />
            <div className="px-4 py-10 w-[95%] mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-[#5C4033] mb-10">Carrito de Compras</h1>
                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6 overflow-y-scroll max-h-[70vh]">
                            {cart.map((item, index) => (
                                <div
                                    key={`${item.product.category.id}-${index}`}
                                    className="flex lg:flex-row flex-col bg-[#5C4033] rounded-xl shadow-lg"
                                >
                                    <div className="lg:w-1/4 h-full">
                                        {item.product.category.images
                                            .filter(i => i.color.id === item.product.color.id)
                                            .slice(0, 1)
                                            .map((image, index) => (
                                                <img key={index} src={image.source} alt={item.product.category.name}
                                                     className="w-full h-80 object-cover lg:rounded-l-xl lg:rounded-tr-none rounded-t-xl"/>
                                            ))
                                        }
                                    </div>


                                    <div className="lg:w-3/4 p-6 grid grid-rows-4">
                                            <h2 className="lg:text-2xl text-xl font-semibold text-white lg:mb-2">
                                                <a href={'/productDetail/'+ item.product.category.id}>{item.product.category.name}</a>
                                            </h2>
                                            <p className="text-white lg:text-xl text-l lg:mb-2">
                                                <span className="font-medium">Talle:</span> {item.product.size.description} |{" "}
                                                <span className="font-medium">Color:</span> {item.product.color.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-white">
                                                <p className={'font-medium lg:text-xl text-l'}>Cantidad:</p>
                                                <button
                                                    onClick={() => handleDecreaseAmount(index)}
                                                    className="bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black px-2 py-1 rounded"
                                                >
                                                    -
                                                </button>
                                                <span className="lg:text-lg text-l font-semibold">{item.amount}</span>
                                                <button
                                                    onClick={() => handleIncreaseAmount(index)}
                                                    className="bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black px-2 py-1 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className={'flex justify-between items-center'}>
                                                <p className="lg:text-xl font-bold text-white">
                                                    Precio Unitario: ${item.product.category.price.toFixed(2)}
                                                </p>
                                                <p className="lg:text-xl font-extrabold text-white">
                                                    Total: ${(item.amount * item.product.category.price).toFixed(2)}
                                                </p>
                                            </div>

                                        <button
                                            onClick={() => handleRemoveItem(index)}
                                            className="mt-4 bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black font-semibold px-4 py-2 rounded-lg transition duration-300"
                                        >
                                            Eliminar del Carrito
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#5C4033] text-white rounded-xl shadow-lg p-6 sticky top-20 h-fit">
                            <h2 className="text-2xl font-bold mb-4">Resumen de la Compra</h2>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg">Productos:</p>
                                <p className="text-lg">{cart.reduce((total, item) => total + item.amount,0)}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg">Total:</p>
                                <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
                            </div>
                            <div className={'flex justify-between items-center mb-2'}>
                                <p className="text-lg font-bold">Tipo de pago</p>
                                <select className="select select-bordered bg-[#FFDEAFFF] w-full max-w-xs text-black"
                                        onChange={(e) => setTypePurchaseSelected(
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            //@ts-expect-error
                                            e.target.value)}>
                                    {typesPurchase.map((t) => (
                                        <option key={t.id} value={t.id}>{t.description}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={
                                    user
                                        ? typePurchaseSelected === 1
                                            ? handleBuy
                                            : handleTransfer
                                        : () => { setError("¡Debe iniciar sesión!"); }
                                }

                                className="mt-4 w-full bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black font-semibold px-4 py-2 rounded-lg transition duration-300"
                            >
                                Finalizar Compra
                            </button>
                            {error && <p className={'text-center font-semibold mt-3'}>{error}</p>}

                            {preferenceId &&
                                <Wallet initialization={{preferenceId: preferenceId}}
                                        customization={{texts: {valueProp: 'smart_option'}}}/>
                            }
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-600 text-xl">
                        🛍️ Tu carrito está vacío. Agrega productos para comenzar.
                    </div>
                )}
            </div>
        </div>
    );
};
