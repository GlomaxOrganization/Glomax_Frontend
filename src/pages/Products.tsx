import { useFetchCategories } from "../functions/useFetchCategories.tsx";
import { ProductCard } from "../components/products/ProductCard.tsx";
import { Header } from "../components/General/Header.tsx";
import { Filters } from "../components/products/Filters.tsx";
import { Category } from "../types/types.ts";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Products = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [index, setIndex] = useState<number>(1);
    const initialCategories = useFetchCategories(index);

    useEffect(() => {
        setCategories(initialCategories);
    }, [initialCategories]);

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.23,
            },
        }),
        exit: { opacity: 0, scale: 0.9 },
    };

    return (
        <>
            <Header userObtained={null} />
            <div className="container mx-auto px-4 py-8 min-h-[93vh]">
                <motion.h1
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="text-4xl font-bold text-center text-[#5C4033] mb-6"
                >
                    Productos
                </motion.h1>

                <motion.p
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.3}}
                    className="text-lg text-center text-black max-w-2xl mx-auto mb-8"
                >
                    Explorá nuestra colección de productos cuidadosamente seleccionados.
                    <br></br>
                    Desde los colores más vibrantes hasta los estilos más elegantes,
                    <br></br>
                    encontrá lo que mejor va con vos.
                </motion.p>
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.3}}
                >
                    <Filters setCategories={setCategories}/>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    <AnimatePresence>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <motion.div
                                    key={category.id}
                                    custom={index}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <ProductCard category={category}/>
                                </motion.div>
                            ))
                        ) : (
                            <motion.p
                                className="col-span-full text-center text-black font-semibold text-2xl"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.5}}
                            >
                                No hay productos disponibles en este momento.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
                <div className={'flex justify-center mt-10'}>
                    <div className="join">
                        <button disabled={index < 2} onClick={() => setIndex((prev) => prev - 1)} className="join-item btn bg-[#5C4033] hover:bg-[#C8994AFF] hover:text-black rounded-lg text-white">«
                        </button>
                        <button className="join-item btn bg-[#5C4033] hover:bg-[#C8994AFF] hover:text-black rounded-lg text-white">{index}
                        </button>
                        <button disabled={index > 2} onClick={() => setIndex((prev) => prev + 1)} className="join-item btn bg-[#5C4033] hover:bg-[#C8994AFF] hover:text-black rounded-lg text-white">»
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};
