import { Header } from "../components/General/Header.tsx";
import {useFetchUser} from "../functions/useFetchUser.tsx";
import {Collapse} from "../components/Cart/Collapse.tsx";
import {useFetchPurchases} from "../functions/useFetchPurchases.tsx";

export const Profile = () => {
    const user = useFetchUser();
    const purchases = useFetchPurchases()

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8 min-h-[92.2vh]">
                <h1 className="text-4xl font-extrabold text-center text-[#5C4033] mb-10">Carrito de Compras</h1>
                <div className={'grid grid-cols-3 gap-x-10'}>
                    <div className="flex flex-col gap-8">
                        <div className="bg-[#5C4033] text-white rounded-xl shadow-lg p-6 sticky top-20 h-fit">
                            <div className={'flex justify-between items-start'}>
                                <h2 className="text-2xl font-bold mb-4">Mis datos</h2>
                                <a href={'/editar-perfil'}><img src={"/edit.svg"} alt={"Editar"} className={'w-8 h-8'}/></a>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg">Nombre:</p>
                                <p className="text-lg font-bold">{user?.username}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg">Mail:</p>
                                <p className="text-lg font-bold">{user?.email}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg">Documento:</p>
                                <p className="text-lg font-bold">{user?.document}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg">Celular:</p>
                                <p className="text-lg font-bold">{user?.phoneNumber}</p>
                            </div>
                        </div>

                        <div className="bg-[#5C4033] text-white rounded-xl shadow-lg p-6 sticky top-20 h-fit">
                            <div className={'flex justify-between items-start'}>
                                <h2 className="text-2xl font-bold mb-4">Mi dirección</h2>
                                <a href={'/editar-direccion'}><img src={"/edit.svg"} alt={"Editar"} className={'w-8 h-8'}/></a>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg">Calle:</p>
                                <p className="text-lg font-bold">{user?.address}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg">Ciudad:</p>
                                <p className="text-lg font-bold">{user?.city},{user?.zipCode}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg">Province:</p>
                                <p className="text-lg font-bold">{user?.province}</p>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-lg">País:</p>
                                <p className="text-lg font-bold">{user?.country}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#5C4033] text-white rounded-xl shadow-lg p-6 sticky top-20 h-fit col-span-2">
                        <h2 className="text-2xl font-bold mb-4">Mis compras</h2>

                        {purchases.map((purchase, index) => (
                            <Collapse key={index} purchase={purchase} />
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
};
