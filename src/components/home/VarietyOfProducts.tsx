import {motion} from "framer-motion";

export const VarietyOfProducts = () => {
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
            className="container min-h-[80vh] mx-auto px-4 sm:px-8 flex flex-col-reverse lg:flex-row items-center justify-between">
            <div className="grid grid-cols-2 gap-4">
                {[
                    "https://i.imgur.com/v4nhL5n.jpeg",
                    "https://i.imgur.com/P55MRPs.png",
                    "https://i.imgur.com/DHkSobJ.png",
                    "https://i.imgur.com/pRfjtmc.png"
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
                            initial={{opacity: 0, x: -50}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 1, delay: 0.4 + index * 0.2}}
                        />
                    </motion.div>

                ))}
            </div>

            <motion.div
                className="flex flex-col gap-8 lg:gap-12 text-center lg:text-left"
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1, ease: "easeOut"}}
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-bold"
                    initial={{opacity: 0, x: 50}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 1, delay: 0.3}}
                >
                    Variedad de productos
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl"
                    initial={{opacity: 0, x: 50}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 1, delay: 0.6}}
                >
                    Encontrá prendas únicas para cada ocasión, con una amplia variedad de estilos, talles y
                    colores.<br/> ¡Renová tu look con nuestras últimas tendencias!
                </motion.p>

                <div className="flex justify-center lg:justify-start">
                    <motion.a
                        href="/productos"
                        className="bg-[#5C4033] hover:bg-[#a86b00] text-white font-semibold px-6 py-3 rounded-lg"
                        initial={{opacity: 0, x: 50}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 1, delay: 0.9}}
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                    >
                        Ver todos los productos
                    </motion.a>
                </div>
            </motion.div>

        </div>

    )
}