"use client";

import React, { useEffect, useState } from "react";
import Cards from "@/app/components/Cards/Cards";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetPostsByConditionQuery, Post } from "@/redux/features/PostSlice";
import Navbar from "@/app/components/Navbar/Navbar";
import PrecioFilters from "@/app/components/Filters/Filters";
import UbicacionFilters from "@/app/components/Filters/UbicacionFilters";
import TipoInmuebleFilters from "@/app/components/Filters/TipoInmuebleFilters";

const Home = () => {
  const dispatch = useAppDispatch();

  const {
    data: sellData,
    isLoading: isSellLoading,
    isError: isSellError,
  } = useGetPostsByConditionQuery("sell");
  const {
    data: rentData,
    isLoading: isRentLoading,
    isError: isRentError,
  } = useGetPostsByConditionQuery("rent");

  const [filterPrice, setFilterPrice] = useState<string>("all");
  const [filterUbicacion, setFilterUbicacion] = useState<string>("all");
  const [filterTipoInmueble, setFilterTipoInmueble] = useState<string>("all");
  const [busqueda, setBusqueda] = useState({})

  // Nuevo estado para los datos filtrados
  const [filteredData, setFilteredData] = useState<Post[]>([]);

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
      <Navbar busqueda={setBusqueda}/>
      <div className="flex gap-10 justify-center">
        <UbicacionFilters setFilterUbicacion={setFilterUbicacion} />
        <PrecioFilters setFilterPrice={setFilterPrice} />
        <TipoInmuebleFilters setFilterTipoInmueble={setFilterTipoInmueble} />
      </div>
      <h2 className="text-center m-10 text-xl">Propiedades</h2>
      {isSellLoading ? (
        <p className="flex justify-center">Loading Sell properties...</p>
      ) : isSellError ? (
        <p className="flex justify-center">Error al obtener datos de venta</p>
      ) : (
        <Cards properties={filteredData} busqueda = {busqueda}/>
      )}
    </div>
  );
};

export default Home;
