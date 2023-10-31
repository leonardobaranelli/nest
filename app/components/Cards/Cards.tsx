import React from "react";
import Card from "../Card/Card";

interface Property {
  days: number;
  type: string;
  condition: string;
  image: string[];
  title: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  floorNumber: number;
  aptNumber: string;
  price: number;
  description: string;
}

interface CardsProps {
  properties: Property[];
}

const Cards: React.FC<CardsProps> = ({ properties, busqueda }) => {
  if (Array.isArray(busqueda) && busqueda.length > 0) {
    return (
      <div className="flex justify-center aling-center gap-10 flex-wrap">
        {busqueda?.map((property, index) => (
          <Card key={index} {...property} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex justify-center aling-center gap-10 flex-wrap">
      {Array.isArray(properties) ? (
        properties.map((property, index) => <Card key={index} {...property} />)
      ) : (
        <p>No properties to display.</p>
      )}
    </div>
  );
};

export default Cards;
