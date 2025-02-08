export const Header = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as unknown[];
    const amount = cart.length;

    return (
        <header className="navbar bg-[#5C4033] shadow-md px-6 py-3">
            <div className="flex-1">
                <a className="text-2xl font-bold text-gray-900 dark:text-white hover:text-gray-600 transition">
                    Glomax
                </a>
            </div>
            <div className="flex-none flex gap-4">
                {/* Carrito de compras */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700 dark:text-white"
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
                    <div
                        tabIndex={0}
                        className="dropdown-content card card-compact w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-3">
                        <div className="card-body">
                            <span className="text-lg font-bold text-gray-800 dark:text-white">{amount} Items</span>
                            <span className="text-gray-600 dark:text-gray-300">Subtotal: <strong>$999</strong></span>
                            <div className="card-actions mt-2">
                                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg transition">
                                    Ver carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Perfil de usuario */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full border border-gray-300 dark:border-gray-600">
                            <img
                                alt="User profile"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu menu-sm w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-3 p-2">
                        <li>
                            <a className="flex justify-between text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-4 py-2">
                                Perfil
                                <span className="badge bg-blue-500 text-white">Nuevo</span>
                            </a>
                        </li>
                        <li>
                            <a className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-4 py-2">
                                Configuración
                            </a>
                        </li>
                        <li>
                            <a className="text-red-500 hover:bg-red-100 dark:hover:bg-red-700 rounded-lg px-4 py-2">
                                Cerrar sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};
