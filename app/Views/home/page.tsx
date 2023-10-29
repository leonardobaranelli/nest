"use client";

import React, { useEffect } from "react";
import Cards from "@/app/components/Cards/Cards";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetPostsByConditionQuery } from "@/redux/features/PostSlice";
import Navbar from "@/app/components/Navbar/Navbar";


const Home = () => {
  const dispatch = useAppDispatch();

  // Consulta para "sell"
  const {
    data: sellData,
    isLoading: isSellLoading,
    isError: isSellError,
  } = useGetPostsByConditionQuery("sell");

  // Consulta para "rent"
  const {
    data: rentData,
    isLoading: isRentLoading,
    isError: isRentError,
  } = useGetPostsByConditionQuery("rent");

  // Mostrar solo las primeras 3 propiedades
  const sellDataLimited = sellData;
  const rentDataLimited = rentData;

  useEffect(() => {
    if (!isSellLoading && !isSellError) {
//      console.log("Sell Data from API:", sellDataLimited);
    }
    if (!isRentLoading && !isRentError) {
//      console.log("Rent Data from API:", rentDataLimited);
    }
  }, [
    isSellLoading,
    isSellError,
    isRentLoading,
    isRentError,
    dispatch,
    sellDataLimited,
    rentDataLimited,
  ]);

  return (
    <div>
      <div>
        <Navbar />
  
      </div>
      <div>
        <h2 className="text-center m-10 text-xl">Propiedades en venta</h2>
        {isSellLoading ? (
          <p>Loading Sell properties...</p>
        ) : isSellError ? (
          <p>Error al obtener datos de venta</p>
        ) : (
          <Cards properties={sellDataLimited as Post[]} />
        )}
      </div>
      <div>
        <h2 className="text-center m-10 text-xl">Propiedades en alquiler</h2>
        {isRentLoading ? (
          <p>Loading Rent properties...</p>
        ) : isRentError ? (
          <p>Error al obtener datos de alquiler</p>
        ) : (
          <Cards properties={rentDataLimited as Post[]} />
        )}
      </div>
    </div>
  );
};

export default Home;
