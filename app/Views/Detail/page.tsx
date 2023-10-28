"use client";
import React from "react";
import data from "./data.json";

const Detail = (/* aca tiene que recibir un parametro que buscar */) => { 

  const properties = data; //esto  cuando haya conexion con el estado global

  interface Pfind {
    days: number;
    type: string;
    condition: string;
    image: string;
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

  const property = properties.find(
    (p: Pfind) => p.title === "Cozy Apartment in Downtown" //esto esta HARCODEADO, SE CONECTA CON EL PARAMETRO
  );

  if (!property) {
    return <div>Propiedad no encontrada</div>;
  }

  return (
    <div className="md:container md:mx-auto mx-auto">
      <div className="property-location">
      <div className="property-location">
        <h2>Imagen</h2>
      </div>
      <div className="property-details">
        <img src={property.image} alt="" />
      </div>
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
