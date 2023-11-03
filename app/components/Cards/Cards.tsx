import React from "react";
import Card from "../Card/Card";

interface Property {
  days: number | null;
  type: string;
  condition: string;
  image: string[];
  title: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  floorNumber: string;
  aptNumber: string;
  price: number;
  description: string;
  id: string;
  images: string[];
  userId: string | null;
}

interface CardsProps {
  properties: Property[];
}

const Cards: React.FC<CardsProps> = ({ properties }) => {
  return (
    <div className="flex justify-center align-center gap-10 flex-wrap">
      {Array.isArray(properties) ? (
        properties.map((property, index) => <Card key={index} {...property} />)
      ) : (
        <p>No properties to display.</p>
      )}
    </div>
  );
};

export default Cards;
