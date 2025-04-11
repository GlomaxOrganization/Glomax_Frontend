import { motion } from "framer-motion";

export const ShippingType = () => {
    return (
        <div className="container min-h-[80vh] mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between md:gap-20 gap-10 mt-24">
            <motion.div
                className="flex flex-col gap-8 lg:gap-12 text-center lg:text-left"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-bold"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    Tipos de envío
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    Realizamos la mayoría de nuestros envíos a través de Correo Argentino, garantizando seguridad y cobertura en todo el país. <br />
                    Si vivís en Buenos Aires o CABA, también ofrecemos la opción de Envío Express para que recibas tu compra más rápido.
                </motion.p>

                <div className="flex justify-center lg:justify-start">
                    <motion.a
                        href="/envios"
                        className="bg-[#5C4033] hover:bg-[#C8994AFF] hover:text-black text-white font-semibold px-6 py-3 rounded-lg"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        viewport={{ once: true }}
                    >
                        Ver más información
                    </motion.a>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["/correoArgentino.svg", "/flex.svg"].map((imageUrl, index) => (
                    <motion.img
                        key={index}
                        alt={`Método de envío ${index + 1}`}
                        src={imageUrl}
                        className="w-full max-w-[150px] md:max-w-[200px] lg:max-w-[250px] rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                        viewport={{ once: true }}
                    />
                ))}
            </div>
        </div>
    );
};
