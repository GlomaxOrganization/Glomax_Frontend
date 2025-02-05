import { motion } from "framer-motion";

export const Hero = () =>{
    return (
        <div className="hero min-h-[93vh]">
            <div className="hero-content flex-col lg:flex-row">
                <div>
                    <motion.div
                        className="flex flex-col md:gap-6 gap-10"
                        initial={{opacity: 0, y: -50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 1, ease: "easeOut"}}
                    >
                        <div>
                            <motion.h1
                                className="text-5xl font-bold"
                                initial={{opacity: 0, x: -50}}
                                whileInView={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 0.3}}
                            >
                                Glomax
                            </motion.h1>
                            <motion.p
                                className="py-6"
                                initial={{opacity: 0, x: -50}}
                                whileInView={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 0.6}}
                            >
                                Exprésate con cada outfit. Ropa única para personas auténticas. ¡Compra ahora y marca la
                                diferencia! Web
                            </motion.p>
                            <motion.button
                                className="bg-[#a86b00] hover:bg-[#a86b00] text-white font-semibold px-4 py-2 rounded-lg"
                                initial={{opacity: 0, x: -50}}
                                whileInView={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 0.9}}
                                whileHover={{scale: 1.5, rotate: 0}}
                                whileTap={{scale: 0.9}}
                            >
                                Comprar
                            </motion.button>
                        </div>

                    </motion.div>
                </div>
                <motion.img
                    alt={"Image Hero"}
                    src={"https://i.imgur.com/9mSCFxO.png"}
                    className="rounded-lg shadow-2xl w-[40%]"
                    initial={{opacity: 0, x: 50}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 1, delay: 0.6}}
                ></motion.img>
            </div>
        </div>
    )
}