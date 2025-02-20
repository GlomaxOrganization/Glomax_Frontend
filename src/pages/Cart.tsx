import { Header } from "../components/General/Header.tsx";
import { ItemCart } from "../types/types.ts";
import { useState, useEffect } from "react";

export const Cart = () => {
    const [cart, setCart] = useState<ItemCart[]>([]);

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

    const totalPrice = cart.reduce((total, item) => total + item.amount * item.category.price, 0);

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
                                    key={`${item.category.id}-${index}`}
                                    className="flex bg-[#5C4033] rounded-xl shadow-lg"
                                >
                                    <div className="w-1/4 h-full">
                                        {item.category.images
                                            .filter(i => i.color.id === item.color.id)
                                            .slice(0, 1)
                                            .map((image, index) => (
                                                <img key={index} src={image.source} alt={item.category.name}
                                                     className="w-full h-80 object-cover rounded-l-xl"/>
                                            ))
                                        }
                                    </div>


                                    <div className="w-3/4 p-6 grid grid-rows-4">
                                            <h2 className="text-2xl font-semibold text-white mb-2">
                                                <a href={'/productDetail/'+ item.category.id}>{item.category.name}</a>
                                            </h2>
                                            <p className="text-white text-xl mb-2">
                                                <span className="font-medium">Talle:</span> {item.size.description} |{" "}
                                                <span className="font-medium">Color:</span> {item.color.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-white">
                                                <p className={'font-medium text-xl'}>Cantidad:</p>
                                                <button
                                                    onClick={() => handleDecreaseAmount(index)}
                                                    className="bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black px-2 py-1 rounded"
                                                >
                                                    -
                                                </button>
                                                <span className="text-lg font-semibold">{item.amount}</span>
                                                <button
                                                    onClick={() => handleIncreaseAmount(index)}
                                                    className="bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black px-2 py-1 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className={'flex justify-between items-center'}>
                                                <p className="text-xl font-bold text-white">
                                                    Precio Unitario: ${item.category.price}
                                                </p>
                                                <p className="text-xl font-extrabold text-white">
                                                    Total: ${item.amount * item.category.price}
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
                                <p className="text-lg">{cart.length}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg">Total:</p>
                                <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
                            </div>
                            <button
                                className="mt-4 w-full bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black font-semibold px-4 py-2 rounded-lg transition duration-300"
                            >
                                Finalizar Compra
                            </button>
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
