import {motion} from "framer-motion";

export const ShippingType = () => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                delay: index * 0.6,
            },
        }),
        exit: { opacity: 0, scale: 0.9 },
    };

    return (
        <div
            className="container min-h-screen mx-auto px-4 sm:px-8 flex flex-col-reverse lg:flex-row items-center justify-between">
            <motion.div
                className="flex flex-col gap-8 lg:gap-12 text-center lg:text-left"
                initial={{opacity: 0, y: -50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: "easeOut"}}
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-bold"
                    initial={{opacity: 0, x: -50}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 1, delay: 0.3}}
                >
                    Tipos de envío
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl"
                    initial={{opacity: 0, x: -50}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 1, delay: 0.6}}
                >
                    Realizamos la mayoría de nuestros envíos a través de Correo Argentino, <br/>
                    garantizando seguridad y cobertura en {"todo"} el territorio.
                    Si vivís en zonas seleccionadas, <br/>
                    también ofrecemos la opción de envío Flex para que recibas tu compra de manera más rápida.
                </motion.p>

                <div className="flex justify-center lg:justify-start">
                    <motion.a
                        href="/envios"
                        className="bg-[#5C4033] hover:bg-[#C8994AFF] hover:text-black text-white font-semibold px-6 py-3 rounded-lg"
                        initial={{opacity: 0, x: -50}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 1, delay: 0.9}}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                    >
                        Ver más información
                    </motion.a>
                </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
                {[
                    "/correoArgentino.svg",
                    "/flex.svg",
                ].map((imageUrl, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.img
                            key={index}
                            alt={`Image Hero ${index + 1}`}
                            src={imageUrl}
                            className="w-full max-w-[150px] md:max-w-[200px] lg:max-w-[250px] rounded-lg shadow-lg"
                            initial={{opacity: 0, x: 50}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 1, delay: 0.4 + index * 0.2}}
                        />
                    </motion.div>

                ))}
            </div>
        </div>

    )
}