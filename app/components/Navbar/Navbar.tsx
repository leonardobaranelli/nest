import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { loginUserAsync, logout } from "../../../redux/features/UserSlice";
import { useState } from "react";
import SearchBar from "../Search/SearchBar";

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Implementa la lógica para cerrar sesión aquí
    dispatch(logout());
  };

  const renderLoginButton = () => {
    if (isAuthenticated) {
      return (
        <button onClick={handleLogout} className="text-white">
          Logout
        </button>
      );
    } else {
      return (
        <Link href="/Views/Login">
          <h1 className="text-white">Log in</h1>
        </Link>
      );
    }

};
    const handleLogout = () => {
        // Implementa la lógica para cerrar sesión aquí
        dispatch(logout());
    };
    return (
        <div className="bg-[#fc9a84]">
        <nav className="border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <p>Nest</p>
                <div>
                    <search/>
                </div>
                <button
                    onClick={toggleMenu}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open main menu</span>
                    <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
                    <li>
                        <Link
                        className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent"
                        href="../../Views/Rent">
                        Alquilar
                        </Link>
                    </li>
                    <li>
                        <Link
                        className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent"
                        href="../../Views/Buy">
                        Comprar
                        </Link>
                    </li>
                    <li>
                        <Link
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0"
                        href="../../Views/FormCreate">
                        Publicar Inmueble
                        </Link>
                    </li>
                    <li>
                        <Link
                        className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent"
                        href="../../dashboard/tables">
                        Dashboard
                    </Link>
                    </li>
{/*                     <li>
                        <Link
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded-full hover:bg-yellow-400"
                        href="../../Views/Login">
                        Log in
                        </Link>
                    </li> */}
                    <li className="block py-2 pl-3 pr-4 text-gray-900 rounded-full hover:bg-yellow-400">
                        {renderLoginButton()}
                    </li>
                    </ul>
                </div>
                </div>
            </nav>

  };

  return (
    <header className="bg-gradient-to-r from-[#ff8e75] to-[rgba(255,71,71,0.26)] shadow-lg bg-blend-multiply">
      <nav className="border-gray-200">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="font-logo text-5xl font-bold text-white">Nest</h1>
          </div>
          <div className="relative hidden sm:block mt-2">
            <SearchBar />
          </div>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
              <li>
                <Link
                  className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent"
                  href="../../Views/Rent"
                >
                  Alquilar
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent"
                  href="../../Views/Buy"
                >
                  Comprar
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0"
                  href="../../Views/FormCreate"
                >
                  Publicar Inmueble
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 pl-3 pr-4 text-black rounded md:bg-transparent"
                  href="../../dashboard/tables"
                >
                  Dashboard
                </Link>
              </li>
              <li className="block py-2 pl-3 pr-4 text-gray-900 rounded-full hover:bg-yellow-400">
                {renderLoginButton()}
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;

