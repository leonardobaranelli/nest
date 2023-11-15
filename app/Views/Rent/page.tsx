"use client";

// import React, { useEffect, useState } from 'react';
// import Cards from '@/app/components/Cards/Cards';
// import Link from 'next/link';
// import { useGetPostsByConditionQuery, Post } from "@/redux/features/PostSlice";

// import PrecioFilters from '@/app/components/Filters/Filters';
// import UbicacionFilters from '@/app/components/Filters/CityFilter';
// import TipoInmuebleFilters from '@/app/components/Filters/filterByCountry';

// const Page = () => {
//   const { data: postData, isLoading, isError } = useGetPostsByConditionQuery("rent");
//   const [filterPrice, setFilterPrice] = useState<string>("all");
//   const [filterUbicacion, setFilterUbicacion] = useState<string>("all");
//   const [filterTipoInmueble, setFilterTipoInmueble] = useState<string>("all");

//   const filterData = (data: Post[], priceFilter: string, ubicacionFilter: string, tipoInmuebleFilter: string) => {
//     return data
//       .filter((post) => {
//         if (priceFilter === "lessThan1000" && post.price >= 1000) {
//           return false;
//         }
//         if (priceFilter === "greaterThan1000" && post.price < 1000) {
//           return false;
//         }
//         if (ubicacionFilter !== "all" && post.city !== ubicacionFilter) {
//           return false;
//         }
//         if (tipoInmuebleFilter !== "all" && post.type !== tipoInmuebleFilter) {
//           return false;
//         }
//         return true;
//       });
//   };

//   const filteredData = filterData(postData || [], filterPrice, filterUbicacion, filterTipoInmueble);

//   return (
//     <div className='flex flex-col gap-20'>
//       <div className="p-4 bg-[#fc9a84] flex items-center justify-around">
//         <Link href="../../Views/home" className="font-medium text-gray-500 hover:text-gray-900">Home</Link>
//         <Link href="../../Views/Buy" className="font-medium text-gray-500 hover:text-gray-900">Venta</Link>
//         <Link href="" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link>
//       </div>

//       <div className="flex gap-10 justify-center">
//         <UbicacionFilters setFilterUbicacion={setFilterUbicacion} />
//         <PrecioFilters setFilterPrice={setFilterPrice} />
//         <TipoInmuebleFilters setFilterTipoInmueble={setFilterTipoInmueble} />
//       </div>

//       {isLoading ? (
//         <p className="flex justify-center">Loading...</p>
//       ) : isError ? (
//         <p className="flex justify-center">Error al obtener datos</p>
//       ) : filteredData.length === 0 ? (
//         <p className="flex justify-center">No hay publicaciones</p>
//       ) : (
//         <Cards properties={filteredData} />
//       )}
//     </div>
//   );
// };

// export default Page;

import React, { useEffect, useState } from "react";
import Cards from "@/app/components/Cards/Cards";
import Navbar from '@/app/components/Navbar/Navbar';
import DisplayFilter from "@/app/components/Filters/DisplayFilter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Errors from "@/app/components/Error/Error";
import { updateState } from "@/redux/features/GlobalSlice";
import { useGetPostsByConditionQuery, useGetPostsQuery } from "@/redux/services/api";
import { updateSelec } from "@/redux/features/SelecSlice";
import Link from "next/link";

function Page() {
  const dispatch = useAppDispatch();
  const { data: posts, isLoading, isError } = useGetPostsByConditionQuery("rent");

  const homeState = useAppSelector((state) => state.home.properties);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(updateState(posts || []));
      dispatch(updateSelec(posts || []));
    }
  }, [posts, isLoading, isError]);
;
  

  return (
    <div>
    <Navbar/>
    <div className='flex flex-col gap-20'>
      <DisplayFilter />
      <div className="flex gap-10 justify-center">
        {isLoading ? (
          <img src="/Infinity-4.5s-224px.gif" alt="Cargando..." />
        ) : posts && posts.length > 0 ? (
          <div className="flex gap-10 justify-center">
            <Cards properties={homeState} />
          </div>
        ) : (
          <Errors />
        )}
      </div>
    </div>
  </div>
);
};

export default Page




