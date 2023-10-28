"use client";

import React, { useEffect } from 'react';
import Cards from '@/app/components/Cards/Cards';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetPostsByConditionQuery } from "@/redux/features/PostSlice";

const Page = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetPostsByConditionQuery("sell");

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log("Data from API:", data); // Agregar el console.log aquí
    }
  }, [isLoading, isError, dispatch]);

  return (
    <div>
      <button>
        <Link href="/Views/home">Home</Link>
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error al obtener datos</p>
      ) : (
        <Cards properties={data as Post[]} />
      )}
    </div>
  );
};

export default Page;




