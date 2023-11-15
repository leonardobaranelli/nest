"use client";

import React, { useEffect, useState } from "react";
import Cards from "@/app/components/Cards/Cards";
import Navbar from '@/app/components/Navbar/Navbar';
import DisplayFilter from "@/app/components/Filters/DisplayFilter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Errors from "@/app/components/Error/Error";
import { updateState } from "@/redux/features/GlobalSlice";
import { useGetPostsByConditionQuery } from "@/redux/services/api";
import { updateSelec } from "@/redux/features/SelecSlice";
import Link from "next/link";
import { Property } from "@/redux/features/SelecSlice";


function Page() {
  const dispatch = useAppDispatch();
  const { data: posts, isLoading, isError } = useGetPostsByConditionQuery("sell");

  const homeState: Property[] = useAppSelector((state) => state.home.properties);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(updateState(posts || []));
      dispatch(updateSelec(posts || []));
    }
  }, [posts, isLoading, isError]);

  return (
    <div>
      <Navbar/>
    <div className='flex flex-col gap-20'>
      
      {<DisplayFilter />}
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

