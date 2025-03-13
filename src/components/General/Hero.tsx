import { motion } from "framer-motion";

export const Hero = () =>{
    return (
        <div className="hero min-h-[92.2vh]">
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
                                className="text-5xl font-bold lg:text-left text-center"
                                initial={{opacity: 0, x: -50}}
                                whileInView={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 0.3}}
                            >
                                Glomax
                            </motion.h1>
                            <motion.p
                                className="py-6 lg:text-left text-center"
                                initial={{opacity: 0, x: -50}}
                                whileInView={{opacity: 1, x: 0}}
                                transition={{duration: 1, delay: 0.6}}
                            >
                                Expresate con cada outfit. Ropa única para personas auténticas. ¡Comprá ahora y marcá la
                                diferencia!
                            </motion.p>
                            <div className="flex justify-center lg:justify-start">
                                <motion.a
                                    href={'/products'}
                                    className="bg-[#5C4033] hover:bg-[#a86b00] text-white font-semibold px-4 py-2 rounded-lg text-center inline-block"
                                    initial={{opacity: 0, x: -50}}
                                    whileInView={{opacity: 1, x: 0}}
                                    transition={{duration: 1, delay: 0.9}}
                                    whileHover={{scale: 1.5, rotate: 0}}
                                    whileTap={{scale: 0.9}}
                                >
                                    Comprar
                                </motion.a>
                            </div>

                            </div>

                    </motion.div>
                </div>
                <motion.img
                    alt={"Image Hero"}
                    src={"https://i.imgur.com/9mSCFxO.png"}
                    className="rounded-lg shadow-2xl lg:w-[40%]"
                    initial={{opacity: 0, x: 50}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 1, delay: 0.6}}
                ></motion.img>
            </div>
        </div>
    )
}