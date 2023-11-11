'use client'

import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updateState } from "@/redux/features/GlobalSlice";
import { useGetPostsByConditionQuery} from "@/redux/services/api";
import { updateSelec } from "@/redux/features/SelecSlice";
import {useGetUserQuery} from "@/redux/features/api"


const Alquiler = () => {
  const dispatch = useAppDispatch();
  const { data: posts, isLoading, isError } = useGetPostsByConditionQuery("rent");

  
  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(updateState(posts || []));
      dispatch(updateSelec(posts || []));
    }
  }, [posts, isLoading, isError]);
  
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        ALQUILER
      </h4>

      <div className="flex flex-col overflow-scroll overflow-y-auto h-[600px]">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm uppercase font-bold xsm:text-base">
              Propiedades
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm uppercase font-bold xsm:text-base">
              Nombre
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm uppercase font-bold xsm:text-base">
              Ubicación
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm uppercase font-bold xsm:text-base">
              Precio U$D
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm uppercase font-bold xsm:text-base">
              Tipo
            </h5>
          </div>
        </div>

        {posts?.map((rent, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === posts.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                {rent.images && rent.images[0] ? (
                  <img
                    src={rent.images[0]}
                    alt="rent"
                    width={48}
                    height={48}
                    className="w-20 h-20"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-2 rounded-full"></div>
                )}
              </div>
            
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{rent.title}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{rent.country}, {rent.city}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">${rent.price}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{rent.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alquiler;