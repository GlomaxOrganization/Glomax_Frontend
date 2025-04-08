import { Header } from "../components/General/Header.tsx";
import { useParams } from "react-router-dom";
import { useFetchPurchaseById } from "../functions/useFetchPurchaseById.tsx";
import { useState, useEffect } from "react";
import {useFetchUser} from "../functions/useFetchUser.tsx";

export const PurchaseDetail = () => {
    const { id } = useParams();
    const purchase = useFetchPurchaseById(id);
    const [error, setError] = useState<string | null>(null);
    const user = useFetchUser(true);

    useEffect(() => {
        if (!purchase) {
            setError("Hubo un error al encontrar la compra buscada.");
        }else{
            setError(null);
        }
    }, [purchase]);

    return (
        <>
            <Header userObtained={user} />
            <div className="p-6 container mx-auto min-h-[86.6vh]">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#5C4033] mb-5">
                    Detalle de la Compra {' -> #' + purchase?.id}
                </h1>
                {user?.id == 1 &&
                    <div className="flex justify-center">
                        <button
                            onClick={() => window.location.href = '/editar-compra/' + id}
                            className="bg-[#5C4033] hover:bg-[#C8994AFF] text-white hover:text-black font-semibold px-4 py-2 rounded-lg transition duration-300 min-w-[10%]"
                        >
                            Editar
                        </button>
                    </div>
                }
                <div className="my-20">
                    <table className="border border-black w-full mt-10">
                        <thead>
                        <tr className="border border-black bg-[#5C4033] text-white lg:text-xl text-l font-bold">
                            <th className="border border-black">Seguimiento</th>
                            <th className="border border-black">Estado</th>
                            <th className="border border-black">Tipo de pago</th>
                            <th className="border border-black">Costo de envío</th>
                            <th className="border border-black">Precio</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            className="border border-black text-center lg:text-xl text-l font-semibold bg-[#ffdeaf]"
                        >
                            <td className={'border border-black'}>{purchase?.trackingCode}</td>
                            <td className={'border border-black'}>{purchase?.statePurchase.description}</td>
                            <td className={'border border-black'}>{purchase?.typePurchase.description}</td>
                            <td className={'border border-black'}>${purchase?.shippingCost}</td>
                            <td className={'border border-black'}>${purchase?.price}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#5C4033] mb-5">
                    {purchase?.items.length != undefined && purchase?.items.length > 1 ? 'Productos' : 'Producto'}
                </h2>
                <div
                    className={`grid ${purchase?.items.length != undefined && purchase?.items.length > 1 ? 'grid-cols-2 ' : 'grid-cols-1 md:max-w-[50%] mx-auto'} items-center gap-8`}>
                    {purchase?.items.map((item, index) => (
                        <div key={`${item.product.category.id}-${index}`}
                             className="flex flex-col md:flex-row bg-[#5C4033] rounded-xl shadow-lg">
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
                                    <p className="text-white font-medium">Cantidad: {item.amount}</p>
                                </div>

                                <p className="text-white font-bold mt-4">
                                    Total: ${(item.amount * item.product.category.price).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {error && <p className="text-2xl text-center text-black">{error}</p>}
            </div>
        </>
    );
};
