import { Header } from "../components/General/Header.tsx";
import { useFetchUser } from "../functions/useFetchUser.tsx";
import { useState, useEffect } from "react";

export const EditProfile = () => {
    const user = useFetchUser();
    const [name, setName] = useState<string>("");
    const [document, setDocument] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [province, setProvince] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setName(user.username || "");
            setDocument(user.document || "");
            setPhoneNumber(user.phoneNumber || "");
            setAddress(user.address || "");
            setZipCode(user.zipCode || "");
            setCity(user.city || "");
            setCountry(user.country || "");
            setProvince(user.province || "");
        }
    }, [user]);


    const editProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Nombre -> ' + name);

        try {
            const response = await fetch(`http://localhost:8080/edit-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    document: document,
                    phoneNumber: phoneNumber,
                    address: address,
                    zipCode: zipCode,
                    city: city,
                    country: country,
                    province: province,
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                setError('Error en la solicitud');
                return;
            }
            setError(null);
            window.location.href="/perfil";
        } catch (error) {
            console.error("Edit profile failed:", error);
        }
    }

    return (
        <>
            <Header />
            <div className="container mx-auto min-h-[87.9vh]">
                <h1 className="text-4xl font-extrabold text-center text-[#5C4033] my-10">Editar Perfil</h1>
                <form onSubmit={editProfile} className="grid grid-cols-3 gap-y-10 bg-[#5C4033] text-white rounded-xl p-10">
                    <div>
                        <label className="block mb-2 text-lg font-medium">Nombre</label>
                        <input
                            type="text"
                            placeholder="Ingrese su nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered w-full max-w-xs bg-[#FFDEAFFF] text-black"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium">Documento</label>
                        <input
                            type="text"
                            placeholder="Ingrese su documento"
                            value={document}
                            onChange={(e) => setDocument(e.target.value)}
                            className="input input-bordered w-full max-w-xs bg-[#FFDEAFFF] text-black"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium">Celular</label>
                        <input
                            type="text"
                            placeholder="Ingrese su celular"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="input input-bordered w-full max-w-xs bg-[#FFDEAFFF] text-black"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium">Dirección</label>
                        <input
                            type="text"
                            placeholder="Ingrese su dirección"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input input-bordered w-full max-w-xs bg-[#FFDEAFFF] text-black"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium">Código Postal</label>
                        <input
                            type="text"
                            placeholder="Ingrese su código postal"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="input input-bordered w-full max-w-xs bg-[#FFDEAFFF] text-black"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium">Ciudad</label>
                        <input
                            type="text"
                            placeholder="Ingrese su ciudad"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input input-bordered w-full max-w-xs bg-[#FFDEAFFF] text-black"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium">Provincia</label>
                        <input
                            type="text"
                            placeholder="Ingrese su provincia"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            className="input input-bordered w-full max-w-xs bg-[#FFDEAFFF] text-black"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-lg font-medium">País</label>
                        <input
                            type="text"
                            placeholder="Ingrese su país"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="input input-bordered w-full max-w-xs bg-[#FFDEAFFF] text-black"
                        />
                    </div>
                    <button type={"submit"} className="mt-4 w-full bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black font-semibold px-4 py-2 rounded-lg transition duration-300">
                        Editar Perfil
                    </button>
                </form>
                {error && <p className={'text-center font-bold mt-3 text-2xl'}>{error}</p>}
            </div>
        </>
    );
};
