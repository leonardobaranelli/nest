import React from "react";
import Search from "../Search/SearchBar";
import Link from "next/link";
import { Post } from "@/redux/features/PostSlice";

interface NavbarProps {  
  busqueda: React.Dispatch<React.SetStateAction<Post[]>>;  
}

const Navbar: React.FC<NavbarProps> = ({ busqueda }) => {
  return (
    /*         <div style={{display:'flex', justifyContent:"space-around", alignItems:"center", background:"#ffefeb"}}>
            <h2>Logo</h2>
            <div>
                
            </div>
            <ul style={{display:'flex', justifyContent:"space-around", listStyle:"none", gap:"50px"}}>
                <li><Link href="../../Views/Buy">Buy</Link></li>
                <li><Link href="../../Views/Rent">Rent</Link></li>
                <li>Publicar inmueble</li>
            </ul>
        </div> */
    <div className=" p-4 bg-[#fc9a84]">
      <nav className=" flex items-center justify-between sm:h-10">
        <div>
          <Search busqueda ={busqueda}/>
        </div>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            <Link
              href="../../Views/Buy"
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Venta
            </Link>
            <Link
              href="../../Views/Rent"
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Alquiler
            </Link>
            <Link
              href="../../Views/FormCreate"
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Publicar Inmueble
            </Link>
            <Link
              href=""
              className=" font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </div>
      </nav>
    </div>
  );
};

export default Navbar;
