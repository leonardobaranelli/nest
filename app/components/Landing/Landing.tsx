import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Navbar from "../Navbar/Navbar";

const Landing = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div>
      <Navbar/>
      <div
        className="h-full flex flex-col-reverse justify-center items-center gap-6 text-center p-2 sm:flex-row sm:justify-around"
        style={{
          background:
            
            "linear-gradient(90deg, rgba(255,92,57,1) 0%, rgba(166,85,35,1) 49%, #cfb8b8 100%)",
        }}
      >
        <div>
          <h1 className="text-white text-xl lg:text-4xl font-bold">
            Nest, tu hogar es donde estés.
          </h1>
          <h2 className="text-white text-xl lg:text-3xl font-light">
            Propiedades en venta y alquiler.
          </h2>
        </div>
        <div className="sm:w-1/2 ">
          <img
            className="w-full mb-4 rounded-lg lg:mb-0 lg:flex"
            src="https://static.vecteezy.com/system/resources/previews/029/609/304/non_2x/background-wallpaper-for-selling-purchasing-renting-and-finding-house-free-photo.jpg"
            alt="Home"
          />
        </div>
      </div>
      <div className="pb-8 w-full pt-8">
        <div className="container mx-auto">
          <div className="text-center w-full pb-4">
            <h3 className=" sm:text-3xl text-2xl text-black-800 pt-4 xl:w-1/2 mx-auto">
              Te acompañamos en cada paso
            </h3>
          </div>
          <div className="text-center flex flex-col justify-center items-center gap-10 p-2 md:flex-row">
            <div className="flex flex-col gap-10 w-5/6 h-full sm:w-1/2 p-6 shadow-xl hover:shadow-2xl rounded-xl bg-white">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Búsqueda clara y rápida
              </h3>
              <p className="text-gray-600 mb-8">
                Pensamos nuestros filtros, mapas y comparadores de avisos para
                simplificarte la experiencia.
              </p>
            </div>
            <div className="flex flex-col gap-10 w-5/6 h-full sm:w-1/2 p-6 shadow-xl hover:shadow-2xl rounded-xl bg-white">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Tenés tu propia sección
              </h3>
              <p className="text-gray-600 mb-8">
                Desde tu cuenta podés acceder de forma segura a los avisos
                contactados y favoritos.
              </p>
            </div>
            <div className="flex flex-col gap-10 w-5/6 h-full sm:w-1/2 p-6 shadow-xl hover:shadow-2xl rounded-xl bg-white">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Variedad de anunciantes
              </h3>
              <p className="text-gray-600 mb-8">
                Inmobiliarias y dueños directos de todo el país ofrecen las
                mejores opciones de propiedades para vos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
