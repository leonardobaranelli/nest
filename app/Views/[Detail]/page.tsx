'use client'

import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetPostQuery } from "@/redux/features/PostSlice";

const Detail = () => {
  interface Pfind {
    id: string | number;
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

  const {Detail} = useParams();
  console.log(Detail);
  const [property, setPropertyServer] = useState<Pfind | undefined>(undefined);
  
  const { data } = useGetPostQuery(Detail);
  console.log(data);
  

  useEffect(() => {
    setPropertyServer(data);

  }, [data]);

  if (!property) {
    return <div>Propiedad no encontrada</div>;
  }

  return (
    <div className="md:container md:mx-auto mx-auto">
      <div className="property-location">
        {property.images?.map((imagen, index) => (
          <img
            src={imagen}
            alt=''
          />
        ))}
        <h2>Dias</h2>
      </div>
      <div className="property-details">
        <h2>{property.days}</h2>
      </div>
      <div className="property-location">
        <h2>Tipo</h2>
      </div>
      <div className="property-details">
        <h2>{property.type}</h2>
      </div>
      <div className="property-location">
        <h2>Condicion</h2>
      </div>
      <div className="property-details">
        <h2>{property.condition}</h2>
      </div>
      <div className="property-location">
        <h2>Titulo</h2>
      </div>
      <div className="property-details">
        <h2>{property.title}</h2>
      </div>
      <div className="property-location">
        <h2>Pais</h2>
      </div>
      <div className="property-details">
        <h2>{property.country}</h2>
      </div>
      <div className="property-location">
        <h2>Ciudad</h2>
      </div>
      <div className="property-details">
        <h2>{property.city}</h2>
      </div>
      <div className="property-location">
        <h2>Calle</h2>
      </div>
      <div className="property-details">
        <h2>{property.streetName}</h2>
      </div>
      <div className="property-location">
        <h2>Numeracion</h2>
      </div>
      <div className="property-details">
        <h2>{property.streetNumber}</h2>
      </div>
      <div className="property-location">
        <h2>Precio</h2>
      </div>
      <div className="property-details">
        <h2>{property.price}</h2>
      </div>
      <div className="property-location">
        <h2>Descripcion</h2>
      </div>
      <div className="property-details">
        <h2>{property.description}</h2>
      </div>
    </div>
  );
};

export default Detail;
