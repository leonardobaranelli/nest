"use client";

import React, { useEffect, useState } from 'react';
import Cards from '@/app/components/Cards/Cards';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetPostsByConditionQuery, Post } from "@/redux/features/PostSlice";
import Navbar from '@/app/components/Navbar/Navbar';
import PrecioFilters from '@/app/components/Filters/Filters';
import UbicacionFilters from '@/app/components/Filters/UbicacionFilters';
import TipoInmuebleFilters from '@/app/components/Filters/TipoInmuebleFilters';

const Home = () => {
  const dispatch = useAppDispatch();

  const { data: sellData, isLoading: isSellLoading, isError: isSellError } = useGetPostsByConditionQuery("sell");
  const { data: rentData, isLoading: isRentLoading, isError: isRentError } = useGetPostsByConditionQuery("rent");

  const [filterPrice, setFilterPrice] = useState<string>("all");
  const [filterUbicacion, setFilterUbicacion] = useState<string>("all");
  const [filterTipoInmueble, setFilterTipoInmueble] = useState<string>("all");

  // Nuevo estado para los datos filtrados
  const [filteredData, setFilteredData] = useState<Post[]>([]);
  const [busqueda, setBusqueda] = useState({})
 
  useEffect(() => {
    // Filtrar por precio
    const filterByPrice = (data: Post[], priceFilter: string) => {
      if (priceFilter === "lessThan1000") {
        return data.filter((post) => post.price < 1000);
      } else if (priceFilter === "greaterThan1000") {
        return data.filter((post) => post.price > 1000);
      }
      return data; // No se aplica filtro de precio
    };

    // Filtrar por ubicación
    const filterByUbicacion = (data: Post[], ubicacionFilter: string) => {
      if (ubicacionFilter !== "all") {
        return data.filter((post) => post.city === ubicacionFilter);
      }
      return data; // No se aplica filtro de ubicación
    };

    // Filtrar por tipo de inmueble
    const filterByTipoInmueble = (data: Post[], tipoInmuebleFilter: string) => {
      if (tipoInmuebleFilter !== "all") {
        return data.filter((post) => post.type === tipoInmuebleFilter);
      }
      return data; // No se aplica filtro de tipo de inmueble
    };

    // Aplicar todos los filtros
    let filteredPosts = sellData || [];
    filteredPosts = filterByPrice(filteredPosts, filterPrice);
    filteredPosts = filterByUbicacion(filteredPosts, filterUbicacion);
    filteredPosts = filterByTipoInmueble(filteredPosts, filterTipoInmueble);

    // Actualizar los datos filtrados
    setFilteredData(filteredPosts);

  }, [filterPrice, filterUbicacion, filterTipoInmueble, sellData, rentData]);

  return (
    <div>
      <div>
        <Navbar  busqueda = {setBusqueda}/>
  
      </div>
      <div>
        <h2 className="text-center m-10 text-xl">Propiedades en venta</h2>
        {isSellLoading ? (
          <p>Loading Sell properties...</p>
        ) : isSellError ? (
          <p>Error al obtener datos de venta</p>
        ) : (
          <Cards properties={sellDataLimited as Post[]} busqueda = {busqueda}/>
        )}
      </div>
      <div>
        <h2 className="text-center m-10 text-xl">Propiedades en alquiler</h2>
        {isRentLoading ? (
          <p>Loading Rent properties...</p>
        ) : isRentError ? (
          <p>Error al obtener datos de alquiler</p>
        ) : (
          <Cards properties={rentDataLimited as Post[]} busqueda = {busqueda}/>
        )}
      </div>
    </div>
  );
};

export default Home;
