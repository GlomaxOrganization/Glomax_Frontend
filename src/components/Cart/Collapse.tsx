import { useState } from "react";
import { motion } from "framer-motion";
import {Purchase} from "../../types/types.ts";
import {formatDate} from "../../functions/formatDate.tsx";

export const Collapse = (props:{ purchase : Purchase }) => {
    const [isOpen, setIsOpen] = useState(false);
    const {purchase} = props;
    return (
        <div className="w-full p-4 border border-[#FFDEAFFF] rounded-2xl shadow-lg">
            <button
                className="w-full flex justify-between items-center text-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                 Compra #{purchase.id} | {formatDate(purchase.createdAt)}
                <span className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}> ▼ </span>
            </button>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden flex gap-8 pt-6"
            >
                <img src={purchase.image.source} alt={purchase.title} className={'w-32 h-36 rounded-xl'} />
                <div className="w-full">
                    <h2 className={'font-bold text-xl'}>{purchase.title}</h2>
                    <div className={'grid grid-cols-2'}>
                        <div className="flex items-center mb-2 gap-3">
                            <p className="text-lg">Precio:</p>
                            <p className="text-lg font-bold">${purchase.price}</p>
                        </div>
                        <div className="flex items-center mb-2 gap-3">
                            <p className="text-lg">Estado:</p>
                            <p className="text-lg font-bold">{purchase.statePurchase.description}</p>
                        </div>

                        <div className="flex items-center mb-2 gap-3">
                            <p className="text-lg">Tipo de pago:</p>
                            <p className="text-lg font-bold">{purchase.typePurchase.description}</p>
                        </div>
                    </div>
                    <button className="w-full bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black font-semibold px-4 py-2 rounded-lg transition duration-300"
                    >
                        Ver detalle
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

