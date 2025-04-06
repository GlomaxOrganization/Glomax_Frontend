import { Collapse } from "../components/Cart/Collapse.tsx";
import { useFetchSales } from "../functions/useFetchSales.tsx";
import { useState } from "react";
import { Header } from "../components/General/Header.tsx";
import {Filter} from "../types/types.ts";
import {useFetchUser} from "../functions/useFetchUser.tsx";

export const Sales = () => {
    const [filtered, setFiltered] = useState<boolean>(false)
    const user= useFetchUser();

    const [filters, setFilters] = useState<Filter>({
        statePurchase: 0 as number | undefined,
        id: 0 as number | undefined,
        client: "" as string | undefined,
        dateFrom: "",
        dateUntil: "",
        typePurchase: 0 as number | undefined
    });

    const purchases = useFetchSales(filters, filtered);

    const statesPurchase = {
        1: "No pagado",
        2: "En preparación",
        3: "En camino",
        4: "Entregado"
    };

    const typesPurchase = {
        1: "Transferencia",
        2: "Tarjeta de Débito/Crédito"
    };

    const handleFilterChange = (key: keyof typeof filters, value: string | number | undefined) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const resetFilters = () => {
        setFilters({
            statePurchase: undefined,
            id: undefined,
            client: undefined,
            dateFrom: "",
            dateUntil: "",
            typePurchase: undefined
        });
    };



    return (
        <>
            <Header userObtained={user} />
            <div className="min-h-[86.9vh] py-6">
                <div className="container mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-[#5C4033] mb-5">
                        Ventas
                    </h1>
                    <details className="mb-5">
                        <summary className="text-2xl md:text-3xl font-bold text-[#5C4033]">
                            Filtros
                        </summary>
                        <div>
                            <div className="grid grid-cols-4 gap-10 py-6 items-center">
                                <div>
                                    <label className="block mb-2 text-lg font-medium text-black">ID</label>
                                    <input
                                        type="number"
                                        value={filters.id ?? ""}
                                        min={1}
                                        onChange={(e) => handleFilterChange("id", Number(e.target.value))}
                                        className="input input-bordered w-full bg-[#5C4033] text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-lg font-medium text-black">Cliente</label>
                                    <input
                                        type="text"
                                        value={filters.client ?? ""}
                                        onChange={(e) => handleFilterChange("client", e.target.value)}
                                        className="input input-bordered w-full bg-[#5C4033] text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-lg font-medium text-black">Estado</label>
                                    <select
                                        className="select select-bordered bg-[#5C4033] w-full max-w-xs text-white"
                                        onChange={(e) => handleFilterChange("statePurchase", Number(e.target.value))}
                                        value={filters.statePurchase ?? ""}
                                    >
                                        <option value="0">Selecciona un estado</option>
                                        {Object.entries(statesPurchase).map(([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2 text-lg font-medium text-black">Tipo de pago</label>
                                    <select
                                        className="select select-bordered bg-[#5C4033] w-full max-w-xs text-white"
                                        onChange={(e) => handleFilterChange("typePurchase", Number(e.target.value))}
                                        value={filters.typePurchase ?? ""}
                                    >
                                        <option value="0">Selecciona un tipo</option>
                                        {Object.entries(typesPurchase).map(([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2 text-lg font-medium text-black">Fecha desde</label>
                                    <input
                                        type="date"
                                        value={filters.dateFrom}
                                        onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                                        className="input input-bordered w-full bg-[#5C4033] text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-lg font-medium text-black">Fecha hasta</label>
                                    <input
                                        type="date"
                                        value={filters.dateUntil}
                                        onChange={(e) => handleFilterChange("dateUntil", e.target.value)}
                                        className="input input-bordered w-full bg-[#5C4033] text-white"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={()=> {setFiltered(!filtered)}}
                                    type="submit"
                                    className="bg-[#5C4033] hover:bg-[#C8994AFF] text-white hover:text-black font-semibold px-4 py-2 rounded-lg transition duration-300"
                                >
                                    Filtrar ventas
                                </button>
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
                                >
                                    Resetear filtros
                                </button>
                            </div>
                        </div>
                    </details>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
                        {purchases.map((purchase, index) => (
                            <div
                                key={purchase.id}
                                className="bg-[#5C4033] text-white p-6 rounded-xl h-fit sticky top-20 mb-10"
                            >
                                <Collapse purchase={purchase} index={index} user={user} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
