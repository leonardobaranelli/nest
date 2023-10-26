import React from 'react';
import Card from '../Card/Card';

interface Property {
  days: number;
  type: string;
  condition: string;
  image: string;
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

const Cards: React.FC<CardsProps> = ({ properties }) => {
  return (
    <div className="property-cards">
      {properties.map((property, index) => (
        <Card key={index} {...property} />
      ))}
    </div>
  );
};

export default Cards;
