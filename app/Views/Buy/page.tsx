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
    <div className='flex flex-col gap-20'>
        <div className=" p-4 bg-[#fc9a84] flex items-center justify-around">
            <Link href="../../Views/home" className="font-medium text-gray-500 hover:text-gray-900">Home</Link>
            <Link href="" className=" font-medium text-indigo-600 hover:text-indigo-500">Log in</Link>
        </div>
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




