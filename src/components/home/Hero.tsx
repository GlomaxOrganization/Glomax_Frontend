import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <div className="container md:min-h-[80vh] min-h-[85vh] mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <motion.div
                className="flex flex-col gap-8 lg:gap-12 text-center lg:text-left md:pt-0 pt-14"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-bold"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    Glomax
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    Expresate con cada outfit. Ropa única para personas auténticas. ¡Comprá ahora y marcá la diferencia!
                </motion.p>

                <div className="flex justify-center lg:justify-start">
                    <motion.a
                        href="/productos"
                        className="bg-[#5C4033] hover:bg-[#C8994AFF] hover:text-black text-white font-semibold px-6 py-3 rounded-lg"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Comprar
                    </motion.a>
                </div>
            </motion.div>

            <motion.img
                alt="Image Hero"
                src="https://i.imgur.com/Vokvf7e.png"
                className="w-full max-w-[220px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[450px] mb-12 lg:mb-0 rounded-lg shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
            />
        </div>
    );
};
