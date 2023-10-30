"use client";

import React, { useEffect, useState } from 'react';
import Cards from '@/app/components/Cards/Cards';
import Link from 'next/link';
import { useGetPostsByConditionQuery, Post } from "@/redux/features/PostSlice";

import PrecioFilters from '@/app/components/Filters/Filters';
import UbicacionFilters from '@/app/components/Filters/UbicacionFilters';
import TipoInmuebleFilters from '@/app/components/Filters/TipoInmuebleFilters';

const Page = () => {
  const { data: postData, isLoading, isError } = useGetPostsByConditionQuery("rent");
  const [filterPrice, setFilterPrice] = useState<string>("all");
  const [filterUbicacion, setFilterUbicacion] = useState<string>("all");
  const [filterTipoInmueble, setFilterTipoInmueble] = useState<string>("all");

  const filterData = (data: Post[], priceFilter: string, ubicacionFilter: string, tipoInmuebleFilter: string) => {
    return data
      .filter((post) => {
        if (priceFilter === "lessThan1000" && post.price >= 1000) {
          return false;
        }
        if (priceFilter === "greaterThan1000" && post.price < 1000) {
          return false;
        }
        if (ubicacionFilter !== "all" && post.city !== ubicacionFilter) {
          return false;
        }
        if (tipoInmuebleFilter !== "all" && post.type !== tipoInmuebleFilter) {
          return false;
        }
        return true;
      });
  };

  const filteredData = filterData(postData || [], filterPrice, filterUbicacion, filterTipoInmueble);

  return (
    <div className='flex flex-col gap-20'>
      <div className="p-4 bg-[#fc9a84] flex items-center justify-around">
        <Link href="../../Views/home" className="font-medium text-gray-500 hover:text-gray-900">Home</Link>
        <Link href="" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link>
      </div>

     
      <UbicacionFilters setFilterUbicacion={setFilterUbicacion} />
      <PrecioFilters setFilterPrice={setFilterPrice} />
      <TipoInmuebleFilters setFilterTipoInmueble={setFilterTipoInmueble} />

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error al obtener datos</p>
      ) : filteredData.length === 0 ? (
        <p>No hay publicaciones</p>
      ) : (
        <Cards properties={filteredData} />
      )}
    </div>
  );
};

export default Page;


