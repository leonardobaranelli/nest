"use client";
/*

import React, { useEffect, useState } from "react";
import Cards from "@/app/components/Cards/Cards";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetPostsByConditionQuery, Post, useGetPostsQuery } from "@/redux/features/PostSlice";
import Navbar from "@/app/components/Navbar/Navbar";
import PrecioFilters from "@/app/components/Filters/Filters";
import UbicacionFilters from "@/app/components/Filters/UbicacionFilters";
import TipoInmuebleFilters from "@/app/components/Filters/TipoInmuebleFilters";
import PriceFilter from "@/app/components/Filters/priceFilter";

interface NavbarProps {
  busqueda: React.Dispatch<React.SetStateAction<Post[]>>;
  
}

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
  const {
    data: allData,
  } = useGetPostsQuery("all");


  const [filterPrice, setFilterPrice] = useState<string>("all");
  const [filterUbicacion, setFilterUbicacion] = useState<string>("all");
  const [filterTipoInmueble, setFilterTipoInmueble] = useState<string>("all");
  const [busqueda, setBusqueda] = useState<Post[]>([])

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
    let filteredPosts = allData || [];
    filteredPosts = filterByPrice(filteredPosts, filterPrice);
    filteredPosts = filterByUbicacion(filteredPosts, filterUbicacion);
    filteredPosts = filterByTipoInmueble(filteredPosts, filterTipoInmueble);


    // Actualizar los datos filtrados
    setFilteredData(filteredPosts);
  }, [filterPrice, filterUbicacion, filterTipoInmueble, sellData, rentData, allData]);

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
        <Cards properties={filteredData} busqueda={busqueda}/>
      )}
      <PriceFilter/>
    </div>
  );
};

export default Home;


import Cards from "@/app/components/Cards/Cards";
import PriceFilter from "@/app/components/Filters/priceFilter";
import { fetchPosts } from "@/redux/features/getPost";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect} from "react";



const Home = () => {
  const dispatch = useAppDispatch();
  
  const globalState = useAppSelector((state) => state.posteo.posts);
  
  
  console.log("este es global  State",globalState);
  
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, []); 
  

  return (
    <div>
      <PriceFilter/>
      <h2 className="text-center m-10 text-xl">Propiedades</h2>
      <Cards properties={globalState} />
    </div>
  );
};

export default Home;

*/
import React, { useEffect, useState } from 'react';
import Cards from '@/app/components/Cards/Cards';
import Navbar from '@/app/components/Navbar/Navbar';
import Errors from '@/app/components/Error/Error';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateState } from '@/redux/features/GlobalSlice';
import { useGetPostsQuery } from '@/redux/services/api';
import { updateSelec } from '@/redux/features/SelecSlice';
import FavoriteCard from '@/app/components/favorites/favorites'; 
import DisplayFilter from '@/app/components/Filters/DisplayFilter';

const Home = () => {
  const dispatch = useAppDispatch();
  const { data: posts, isLoading, isError } = useGetPostsQuery('');
  const homeState = useAppSelector((state) => state.home.properties);
  const favoriteState = useAppSelector((state) => state.favorite.properties);
  const [showFavoriteNotification, setShowFavoriteNotification] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(updateState(posts || []));
      dispatch(updateSelec(posts || []));
    }
  }, [posts, isLoading, isError]);

  useEffect(() => {
    // Mostrar la notificación de favoritos cuando hay propiedades favoritas
    if (favoriteState.length > 0) {
      setShowFavoriteNotification(true);
    } else {
      setShowFavoriteNotification(false);
    }
  }, [favoriteState]);
 console.log("este es posts",homeState);
 
  return (
    <div>
      <Navbar />
 
      <button >
        <img src="/filter.png" width={25} height={25} alt="Filter" /><DisplayFilter/>
      </button>
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
      {showFavoriteNotification && (
        <div className="fixed top-10 right-10 h-1/4 w-1/4 bg-white z-50 p-4 border border-gray-300 rounded-lg shadow-lg">
          <FavoriteCard /> {/* Muestra las propiedades favoritas en la notificación */}
          <button onClick={() => setShowFavoriteNotification(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default Home;
