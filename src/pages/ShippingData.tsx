import { Header } from "../components/General/Header.tsx";
import { motion } from "framer-motion";

export const ShippingData = () => {
    return (
        <>
            <Header userObtained={null} />
            <div className="p-6 container min-h-[86.6vh] mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-4xl font-bold text-center text-[#5C4033] mb-10"
                >
                    Envíos
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#5C4033] text-white p-6 rounded-xl h-fit sticky top-20 mb-10"
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-5">
                            Correo Argentino
                        </h2>
                        <p>
                            Realizamos envíos a todo el país a través de Correo Argentino. Podés recibir tu compra en la
                            puerta de tu casa o retirarla en la sucursal más cercana.
                        </p>
                        <p className="mt-4">
                            Una vez despachado el pedido, te proporcionaremos el código de seguimiento en el detalle de
                            tu compra para que puedas rastrear el envío en todo momento.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-[#5C4033] text-white p-6 rounded-xl h-fit sticky top-20 mb-10"
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-5">
                            Express
                        </h2>
                        <p>
                            Entrega Express es un servicio de envío rápido disponible para residentes de Buenos Aires y
                            la Ciudad Autónoma de Buenos Aires.
                        </p>
                        <p className="mt-4">
                            Recibí tu compra en el mismo día o al día siguiente con un proceso ágil y seguro.
                        </p>
                    </motion.div>
                </div>

                <div className="md:grid grid-cols-1 lg:grid-cols-2 items-center gap-12 hidden">
                    <motion.img
                        src="/correoArgentino.svg"
                        alt="Correo Argentino"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mx-auto"
                    />
                    <motion.img
                        src="/flex.svg"
                        alt="Entrega Express"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mx-auto w-[200px]"
                    />
                </div>
            </div>
        </>
    );
};
