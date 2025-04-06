import { Header } from "../components/General/Header.tsx";
import { ItemCart } from "../types/types.ts";
import { useState, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useFetchUser } from "../functions/useFetchUser.tsx";
import { useFetchTypesPurchase } from "../functions/useFetchTypesPurchase.tsx";
import {AnimatePresence, motion} from "framer-motion";

export const Cart = () => {
    initMercadoPago(`${import.meta.env.VITE_MERCADO_PAGO_TOKEN}`, { locale: "es-AR" });

    const [cart, setCart] = useState<ItemCart[]>([]);
    const [typePurchaseSelected, setTypePurchaseSelected] = useState<number>(1);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [error, setError] = useState<string>("");
    const user = useFetchUser();
    const typesPurchase = useFetchTypesPurchase();

    sessionStorage.removeItem("modalShown");

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

            if (response.status === 200) {
                window.location.href = "/perfil";
            }
        } catch (error) {
            if (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                error.response) {
                setError(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    error.response.data);
            } else {
                setError("Error de conexión con el servidor");
            }
        }
    };


    const handleBuy = async () => {
        const id = await createPreference();
        if (id) setPreferenceId(id);
    };

    const handlePurchase = () => {
        if (!user) return setError("¡Debe iniciar sesión para comprar!");
        if (!user.phoneNumber) return setError("¡Debe completar sus datos en Mi Perfil!");
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        typePurchaseSelected === 2 ? handleBuy() : handleTransfer();
    };

    const totalItems = cart.reduce((total, item) => total + item.amount, 0);

    const totalPriceWithoutShipping = cart.reduce((total, item) => total + item.amount * item.product.category.price, 0);

    const shippingCost = totalPriceWithoutShipping >= 35000 ? 0 : 8000;

    const totalPrice = totalPriceWithoutShipping + shippingCost;

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        exit: { opacity: 0, scale: 0.9 },
    };

    return (
        <div className="min-h-screen flex flex-col ">
            <Header userObtained={user} />
            <div className="p-6 container mx-auto">
                <motion.h1
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="text-4xl font-bold text-center text-[#5C4033] mb-6"
                >
                    Carrito de compras
                </motion.h1>

                {cart.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        <div className="lg:col-span-2 flex flex-col gap-y-6">
                            <div className="space-y-6 overflow-y-auto max-h-[60vh] ">
                                <AnimatePresence>
                                    {cart.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            custom={index}
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="flex flex-col md:flex-row bg-[#5C4033] rounded-xl shadow-lg"

                                        >
                                            <div className="w-full md:w-1/3">
                                                {item.product.category.images.find((i) => i.color.id === item.product.color.id) && (
                                                    <motion.img
                                                        src={item.product.category.images.find((i) => i.color.id === item.product.color.id)?.source}
                                                        alt={item.product.category.name}
                                                        className="w-full h-64 object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                                                    />
                                                )}
                                            </div>

                                            <div className="p-6 flex flex-col justify-between w-full">
                                                <h2 className="text-xl md:text-2xl font-semibold text-white">
                                                    <a href={`/productDetail/${item.product.category.id}`}
                                                       className="relative text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                                                    >
                                                        {item.product.category.name}
                                                    </a>
                                                </h2>
                                                <p className="text-white mt-2">
                                                    <strong>Talle:</strong> {item.product.size.description} | <strong>Color:</strong> {item.product.color.description}
                                                </p>

                                                <motion.div
                                                    className="flex items-center gap-3 mt-4"
                                                >
                                                    <p className="text-white font-medium">Cantidad:</p>
                                                    <button onClick={() => handleAmountChange(index, -1)}
                                                            className="px-2 py-1 bg-[#FFDEAFFF] rounded hover:bg-[#C8994AFF]">-
                                                    </button>
                                                    <span className="text-lg text-white">{item.amount}</span>
                                                    <button onClick={() => handleAmountChange(index, 1)}
                                                            className="px-2 py-1 bg-[#FFDEAFFF] rounded hover:bg-[#C8994AFF]">+
                                                    </button>
                                                </motion.div>

                                                <p className="text-white font-bold mt-4">
                                                    Total: ${typePurchaseSelected == 1 ? (item.amount * item.product.category.price).toFixed(2) : (item.amount * item.product.category.price + item.product.category.price * 10 / 100).toFixed(2)}
                                                </p>

                                                <motion.button
                                                    onClick={() => handleRemoveItem(index)}
                                                    className="mt-4 bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black font-semibold px-4 py-2 rounded-lg"
                                                    whileHover={{scale: 1.05}}
                                                    whileTap={{scale: 0.95}}
                                                >
                                                    Eliminar
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <motion.a href={'/products'} whileHover={{scale: 1.05}}>
                                <button
                                    className="w-full bg-[#5C4033] hover:bg-[#C8994AFF] hover:text-black text-white font-semibold py-2 rounded-lg">
                                    Seguir comprando
                                </button>
                            </motion.a>
                        </div>

                        <motion.div
                            className="bg-[#5C4033] text-white p-6 rounded-xl h-fit sticky top-20 mb-10"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">Resumen de Compra</h2>
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-lg">Productos:</p>
                                <p className="text-lg font-bold break-all">{totalItems}</p>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <p className="text-lg">Costo de envío:</p>
                                <p className="text-lg font-bold break-all">${shippingCost}</p>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <p className="text-lg">Descuento:</p>
                                <p className="text-lg font-bold break-all">{typePurchaseSelected == 1 ? '10%' : '0%'}</p>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <p className="text-lg">Total:</p>
                                <p className="text-lg font-bold break-all">${typePurchaseSelected == 1 ? totalPrice.toFixed(2) : (totalPrice + totalPriceWithoutShipping * 10 / 100).toFixed(2)}</p>
                            </div>

                            <p className="text-lg font-bold break-all mb-1">Medio de pago</p>
                            <motion.select
                                onChange={(e) => setTypePurchaseSelected(Number(e.target.value))}
                                className="select select-bordered bg-[#FFDEAFFF] text-black w-full mb-4"
                                whileHover={{ scale: 1.02 }}
                            >
                                {typesPurchase.map((t) => (
                                    <option key={t.id} value={t.id}>{t.description}</option>
                                ))}
                            </motion.select>

                            <motion.button
                                onClick={handlePurchase}
                                className="w-full bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black font-semibold py-2 rounded-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Finalizar Compra
                            </motion.button>

                            {error && <p className="text-white text-center text-lg mt-4">{error}</p>}
                            {preferenceId && <Wallet initialization={{preferenceId}} customization={{texts: {valueProp: "smart_option"}}}/>}
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.p
                        className="text-center text-gray-600 text-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        🛍️ Tu carrito está vacío. Agrega productos para comenzar.
                    </motion.p>
                )}

            </div>
        </div>
    );
};
