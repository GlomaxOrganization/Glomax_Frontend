import {useFetchUser} from "../../functions/useFetchUser.tsx";
import {User} from "../../types/types.ts";

export const Header = (props :{userObtained: User | null }) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as unknown[];

    const amount = cart.length;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const user= props.userObtained ?? useFetchUser();

    const login = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    const logout = () => {
        window.location.href = "http://localhost:8080/logout";
    };

    return (
        <header className="bg-[#5C4033]">
            <div className="navbar px-6 py-3">
                <div className="flex-1">
                    <h1>
                        <a href={"/"}
                           className="text-2xl font-bold text-white  transition">
                            Glomax
                        </a>
                    </h1>
                </div>
                <div className="flex-none flex gap-4">
                    <a href="/carrito">
                        <div className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                                <span className="badge badge-sm indicator-item bg-red-500 text-white">{amount}</span>
                            </div>
                        </div>
                    </a>

                    <div className="dropdown dropdown-end z-20 ">
                        {user ?
                            <>
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full border">
                                        <img
                                            alt={user.username}
                                            src={user.profilePhoto}/>
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu menu-sm w-52 rounded-lg shadow-lg mt-3 p-2 bg-[#FFDEAFFF] text-black">
                                    <li>
                                        <a href={"/perfil"} className="rounded-lg px-4 py-2 text-l">
                                            Mi perfil
                                        </a>
                                    </li>
                                    <li>
                                        <a href={"/perfil"} className="rounded-lg px-4 py-2 text-l">
                                            Mis compras
                                        </a>
                                    </li>
                                    {user.id == 1 &&
                                        <li>
                                            <a href={"/ventas"} className="rounded-lg px-4 py-2 text-l">
                                                Ventas
                                            </a>
                                        </li>
                                    }
                                    <li>
                                        <button onClick={logout} className="rounded-lg px-4 py-2 text-l">
                                            Cerrar sesión
                                        </button>
                                    </li>
                                </ul>
                            </> :
                            <>
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt={'Sin usuario'}
                                            src={'/user.svg'}/>
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu menu-sm w-52 rounded-lg shadow-lg mt-3 p-2 bg-[#FFDEAFFF] text-black">
                                    <li>
                                        <button onClick={login} className="rounded-lg px-4 py-2 text-l">
                                            Iniciar sesión
                                        </button>
                                    </li>
                                </ul>
                            </>
                        }
                    </div>
                </div>
            </div>
            <nav className="grid grid-cols-3 py-3 shadow-lg text-white text-xl font-semibold text-center">
                <a href={'/envios'}>Envíos</a>
                <a href={'/productos'}>Productos</a>
                <a href={'/contacto'}>Contacto</a>
            </nav>
            <div className="py-2 bg-[#C8994AFF]">
                <p className={'md:text-lg text-black md:font-semibold text-center'}>
                    ¡Envío gratis en compras superiores a $35.000! | 10% de descuento en todos los productos pagando con transferencia.
                </p>
            </div>
        </header>
    );
};
