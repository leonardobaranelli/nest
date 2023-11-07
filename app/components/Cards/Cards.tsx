import React from "react";
import Card from "../Card/Card";
import { Property } from "@/redux/features/SelecSlice";

interface CardsProps {  
  properties: Property[];
}

const Cards: React.FC<CardsProps> = ({ properties }) => {
  const propertiesArray = Array.isArray(properties) ? properties : [properties];

  return (
    <div className="flex justify-center align-center gap-10 flex-wrap">
      {propertiesArray?.map((property, index) => (
        <Card key={index} properties={property} />

      ))}
    </div>
  );
};

export default Cards;
