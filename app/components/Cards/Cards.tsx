import React from "react";
import Card from "../Card/Card";
import { Post } from "@/redux/features/PostSlice";

interface CardsProps {  
  properties: Post[];
  busqueda: Post[];
}

const Cards: React.FC<CardsProps> = ({ properties }) => {
  return (
    <div className="flex justify-center align-center gap-10 flex-wrap">
      {Array.isArray(properties) ? (
        properties?.map((property, index) => <Card key={index} {...property} />)
      ) : (
        <p>No properties to display.</p>
      )}
    </div>
  );
};

export default Cards;
