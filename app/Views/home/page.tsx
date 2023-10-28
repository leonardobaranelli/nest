"use client";

import React, { useEffect } from 'react';
import Cards from '@/app/components/Cards/Cards';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetPostsByConditionQuery } from "@/redux/features/PostSlice"; 
import Navbar from '@/app/components/Navbar/Navbar';

const Home = () => {
  const dispatch = useAppDispatch();

  // Consulta para "sell"
  const { data: sellData, isLoading: isSellLoading, isError: isSellError } = useGetPostsByConditionQuery("sell");

  // Consulta para "rent"
  const { data: rentData, isLoading: isRentLoading, isError: isRentError } = useGetPostsByConditionQuery("rent");

  // Mostrar solo las primeras 3 propiedades
  const sellDataLimited = sellData?.slice(0, 3);
  const rentDataLimited = rentData?.slice(0, 3);

  useEffect(() => {
    if (!isSellLoading && !isSellError) {
      console.log("Sell Data from API:", sellDataLimited);
    }
    if (!isRentLoading && !isRentError) {
      console.log("Rent Data from API:", rentDataLimited);
    }
  }, [isSellLoading, isSellError, isRentLoading, isRentError, dispatch, sellDataLimited, rentDataLimited]);

  return (
    <div>
    <div>
        <Navbar />
        <h2>Home</h2>
      </div>
      <div>
        <h2>Sell Properties</h2>
        {isSellLoading ? (
          <p>Loading Sell properties...</p>
        ) : isSellError ? (
          <p>Error al obtener datos de venta</p>
        ) : (
          <Cards properties={sellDataLimited as Post[]} />
        )}
      </div>
      <div>
        <h2>Rent Properties</h2>
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

