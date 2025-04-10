import { Header } from "../components/General/Header.tsx";
import { motion } from "framer-motion";
import {RandomMercadoLibreLink} from "../components/Contact/RandomMercadoLibreLink.tsx";

export const Contact = () => {

    return (
        <>
            <Header userObtained={null} />
            <div className="p-6 container min-h-[86.6vh] mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#5C4033] mb-10">
                    Contacto y políticas
                </h1>

                <div className="">
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        className="bg-[#5C4033] text-white p-6 rounded-xl h-fit sticky top-20 mb-10"
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-5">
                            Mercado Libre
                        </h2>
                        <RandomMercadoLibreLink />
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        className="bg-[#5C4033] text-white p-6 rounded-xl h-fit sticky top-20 mb-10"
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-5">
                            Contacto
                        </h2>
                        <div className={'grid md:grid-cols-4 grid-cols-2 md:gap-y-0 gap-y-4'}>
                            <a href={'mailto:paoloaleman86@gmail.com'} target={'_blank'}><img src={'/gmail.svg'}
                                                                                              alt={'Gmail'}
                                                                                              className={'md:w-12 w-10 mx-auto'}/></a>
                            <a href={'https://wa.me/qr/O6PGT4RAMINRM1'} target={'_blank'}><img src={'/whatsapp.svg'}
                                                                                               alt={'Whatsapp'}
                                                                                               className={'md:w-12 w-10 mx-auto'}/></a>
                            <a href={'https://www.instagram.com/glomax_fashion/'} target={'_blank'}>
                                <img src={'/instagram.svg'} alt={'Instagram'} className={'md:w-12 w-10 mx-auto'}/>
                            </a>
                            <a href={'https://www.tiktok.com/@rayzal_carp'} target={'_blank'}><img src={'/tiktok.svg'}
                                                                                                   alt={'TikTok'}
                                                                                                   className={'md:w-12 w-10 mx-auto'}/></a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 0.3}}
                        className="bg-[#5C4033] text-white p-6 rounded-xl h-fit sticky top-20 mb-10"
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-5">
                            Políticas de Cambios y Devoluciones
                        </h2>

                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-3">Cambios y Devoluciones</h3>

                            <p>
                                Si no estás satisfecho con tu compra, podés solicitar un cambio o devolución dentro de
                                los 7 días posteriores a la recepción del producto.
                            </p>

                            <p className="mt-4 font-semibold">Condiciones para realizar un cambio o devolución:</p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li>El producto debe estar en su estado original, sin uso y con etiquetas intactas.</li>
                                <li>Es obligatorio presentar el comprobante de compra.</li>
                                <li>Los costos de envío corren por cuenta del cliente, salvo que el producto tenga un
                                    defecto de fábrica o el producto enviado no sea el comprado.
                                </li>
                            </ul>

                            <p className="mt-4">
                                Para gestionar un cambio o devolución, contactanos a través de nuestro correo o
                                WhatsApp.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};
