import { useState } from "react";
import { motion } from "framer-motion";
import { Purchase } from "../../types/types.ts";
import { formatDate } from "../../functions/formatDate.tsx";
import { InfoRow } from "../General/InfoRow.tsx";
import { TransferData } from "../../pages/TransferData.tsx";
import { useModal } from "../Utilities/useModal.tsx";

export const Collapse = ({ purchase }: { purchase: Purchase }) => {
    const [show, setShow] = useState(false);
    const { isOpen, isVisible, setIsOpen, closeWithAnimation } = useModal();

    const collapseAnimation = {
        initial: { height: 0, opacity: 0 },
        animate: { height: show ? "auto" : 0, opacity: show ? 1 : 0 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.4, ease: "easeInOut" },
    };

    const shouldShowModal = purchase.statePurchase.id === 1 && purchase.typePurchase.id === 2;

    return (
        <div className="w-full flex flex-col p-4 border border-[#FFDEAFFF] rounded-2xl shadow-lg">
            <button
                className="w-full flex justify-between items-center text-lg font-semibold sm:text-base"
                onClick={() => setShow((prev) => !prev)}
            >
                <span className="truncate">
                    Compra #{purchase.id} | {formatDate(purchase.createdAt)}
                </span>
                <span
                    className={`transform transition-transform duration-300 ${
                        show ? "rotate-180" : "rotate-0"
                    }`}
                >
                    ▼
                </span>
            </button>

            <motion.div {...collapseAnimation} className="overflow-hidden flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                    <img
                        src={purchase.image.source}
                        alt={purchase.title}
                        className="w-24 h-28 sm:w-32 sm:h-36 rounded-xl"
                    />

                    <div className="w-full flex flex-col gap-2">
                        <h2 className="font-bold text-lg sm:text-xl">{purchase.title}</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <InfoRow label="Precio:" value={`$${purchase.price}`} />
                            <InfoRow label="Estado:" value={purchase.statePurchase.description} />
                            <InfoRow label="Tipo de pago:" value={purchase.typePurchase.description} />

                            {shouldShowModal && (
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black font-semibold px-4 py-2 rounded-lg transition duration-300"
                                >
                                    Ver detalles de transferencia
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

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
                        <TransferData />
                    </div>
                </div>
            )}
        </div>
    );
};
