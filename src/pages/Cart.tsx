import { Header } from "../components/General/Header.tsx";
import { ItemCart } from "../types/types.ts";
import {useState, useEffect, useCallback} from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useFetchUser } from "../functions/useFetchUser.tsx";
import { useFetchTypesPurchase } from "../functions/useFetchTypesPurchase.tsx";
import {AnimatePresence, motion} from "framer-motion";

export const Cart = () => {
    const [cart, setCart] = useState<ItemCart[]>([]);
    const [typePurchaseSelected, setTypePurchaseSelected] = useState(1);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const user = useFetchUser(true);
    const typesPurchase = useFetchTypesPurchase();

    useEffect(() => {
        initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_TOKEN, { locale: "es-AR" });
        sessionStorage.removeItem("modalShown");

        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]") as ItemCart[];
        setCart(storedCart);
    }, []);

    const updateCart = useCallback((newCart: ItemCart[]) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }, []);

    const handleRemoveItem = useCallback((index: number) => {
        updateCart(cart.filter((_, i) => i !== index));
    }, [cart, updateCart]);

    const handleAmountChange = useCallback((index: number, delta: number) => {
        const updatedCart = [...cart];
        updatedCart[index].amount = Math.max(1, updatedCart[index].amount + delta);
        updateCart(updatedCart);
    }, [cart, updateCart]);

    const createPreference = async () => {
        try {
            const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL+"/create-preference", cart, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            return data;
        } catch (error) {
            console.error("Error al crear la preferencia:", error);
            setError("No se pudo iniciar el pago con Mercado Pago.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleTransfer = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/handle-transfer", cart, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                window.location.href = "/perfil";
            }
        } catch (err) {
            const message =
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                err?.response?.data || "Error de conexión con el servidor";
            setError(message);
        }
    };

    const handleBuy = async () => {
        setIsLoading(true);
        const id = await createPreference();
        if (id) setPreferenceId(id);
    };

    const handlePurchase = () => {
        if (!user) return setError("¡Debe iniciar sesión para comprar!");
        if (!user.phoneNumber) return setError("¡Debe completar sus datos en Mi Perfil!");
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        typePurchaseSelected === 2 ? handleBuy() : handleTransfer();
    };

    const totalItems = cart.reduce((sum, item) => sum + item.amount, 0);
    const isTransfer = typePurchaseSelected === 1;

    const totalPriceWithoutShipping = cart.reduce((sum, item) => {
        const basePrice = item.product.category.price;
        const price = isTransfer ? basePrice : basePrice * 1.1;
        return sum + item.amount * price;
    }, 0);


    const priceWithType =
        typePurchaseSelected === 1
            ? totalPriceWithoutShipping
            : totalPriceWithoutShipping * 1.10;

    const shippingCost = priceWithType >= 50000 ? 0 : 8000;

    const totalPrice = totalPriceWithoutShipping + shippingCost;

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: index * 0.4 },
        }),
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
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 50}}
                        transition={{duration: 0.5}}
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
                                                    Total:
                                                    ${typePurchaseSelected == 1 ? (item.amount * item.product.category.price).toFixed(2) : (item.amount * (item.product.category.price + item.product.category.price * 10 / 100)).toFixed(2)}
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
                            <motion.a href={'/productos'} whileHover={{scale: 1.05}}>
                                <button
                                    className="w-full bg-[#5C4033] hover:bg-[#C8994AFF] hover:text-black text-white font-semibold py-2 rounded-lg">
                                    Seguir comprando
                                </button>
                            </motion.a>
                        </div>

                        <motion.div
                            className="bg-[#5C4033] text-white p-6 rounded-xl h-fit sticky top-20 mb-10 shadow-xl"
                            initial={{opacity: 0, x: 100}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5, delay: 0.2}}
                        >
                            <h2 className="text-2xl font-bold mb-4 text-center">Resumen de compra</h2>

                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between">
                                    <span>Productos:</span>
                                    <span className="font-semibold">{totalItems}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Costo de envío:</span>
                                    <span className="font-semibold">${shippingCost.toLocaleString()}</span>
                                </div>

                                {typePurchaseSelected === 1 && (
                                    <div className="flex justify-between">
                                        <span>Descuento por transferencia:</span>
                                        <span className="font-semibold">10%</span>
                                    </div>
                                )}

                                <hr className="border-white/30 my-2"/>

                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total:</span>
                                    <span>
        $
                                        {(typePurchaseSelected === 1
                                                ? totalPrice
                                                : totalPrice
                                        ).toFixed(2)}
      </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block mb-2 font-semibold text-white">Medio de pago</label>
                                <motion.select
                                    onChange={(e) => setTypePurchaseSelected(Number(e.target.value))}
                                    className="select select-bordered bg-[#FFDEAFFF] text-black w-full"
                                    whileHover={{scale: 1.02}}
                                >
                                    {typesPurchase.map((t) => (
                                        <option key={t.id} value={t.id}>{t.description}</option>
                                    ))}
                                </motion.select>
                            </div>

                            <motion.button
                                onClick={handlePurchase}
                                className="mt-6 w-full bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black font-semibold py-2 rounded-lg"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                Finalizar Compra
                            </motion.button>

                            {error && <p className="text-white text-center text-lg mt-4">{error}</p>}

                            {isLoading ? (
                                <div className="flex items-center justify-center mt-6">
                                    <span className="loading loading-spinner text-[#FFDEAFFF]"></span>
                                </div>
                            ) : (
                                preferenceId && (
                                    <div className="mt-6 overflow-scroll">
                                        <Wallet
                                            initialization={{preferenceId}}
                                            customization={{texts: {valueProp: "smart_option"}}}
                                        />
                                    </div>
                                )
                            )}
                        </motion.div>

                    </motion.div>
                ) : (
                    <div>
                        <motion.p
                            className="text-center text-gray-600 text-xl"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5}}
                        >
                            🛍️ Tu carrito está vacío. Agrega productos para comenzar.
                        </motion.p>

                        <motion.a href={'/productos'} whileHover={{scale: 1.05}}>
                            <button
                                className="w-full bg-[#5C4033] hover:bg-[#C8994AFF] hover:text-black text-white font-semibold py-2 rounded-lg mt-10">
                                ¡Comenzar a comprar!
                            </button>
                        </motion.a>
                    </div>

                )}

            </div>
        </div>
    );
};
