"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetPostQuery } from "@/redux/services/api";
import { log } from "console";

const Detail = () => {
  interface Pfind {
    days: number | null;
    type: string;
    condition: string;
    images: string[];
    title: string;
    country: string;
    city: string;
    streetName: string;
    streetNumber: string;
    floorNumber: string;
    aptNumber: string;
    price: number;
    description: string;
  
  }

  const { Detail } = useParams();
  const [property, setPropertyServer] = useState<Pfind | undefined>(undefined);

  const { data } = useGetPostQuery(Detail);

  useEffect(() => {
    setPropertyServer(data);
  }, [data]);
  
  if (!property) {
    return <div>Propiedad no encontrada</div>;
  }

  return (
    <div className="md:container md:mx-auto mx-auto">
      <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
          {property.images?.map((imagen, index) => (
            <img
              key={index}
              src={imagen}
              alt=""
              className="w-full h-64 object-cover mt-10"
            />
          ))}
        </div>

        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300">
              {property.title}
            </p>
            <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
              {property.title}
            </h1>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-xl leading-4 text-gray-800 dark:text-gray-300">
              {property.description}
            </p>
          </div>
          <div>
            <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">
              Precio: ${property.price}
            </p>
            <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">
              Dias: {property.days}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
              Tipo: {property.type}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
              Condicion: {property.condition}
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
              Locacion: {property.country} {property.city}
            </p>
            <p className="md:w-96 text-base leading-normal text-gray-600 dark:text-gray-300 mt-4">
              Domicilio: {property.streetName} {property.streetNumber} {property.aptNumber}
              
            </p>
          </div>
          <div>
            <div className="border-t border-b py-4 mt-7 border-gray-200">
              <div
                data-menu
                className="flex justify-between items-center cursor-pointer"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
