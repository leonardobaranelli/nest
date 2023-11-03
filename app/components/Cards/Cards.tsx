import React from "react";
import Card from "../Card/Card";
import { Post } from "@/redux/features/PostSlice";

interface CardsProps {  
  properties: Post[];
  busqueda: Post[];
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
        properties?.map((property, index) => <Card key={index} {...property} />)
      ) : (
        <p>No properties to display.</p>
      )}
    </div>
  );
};

export default Cards;
