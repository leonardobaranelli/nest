import React from 'react';
import Card from '../Card/Card';

interface Property {
  Días: number;
  Tipo: string;
  Imagenes: string[];
  Titulo: string;
  Pais: string;
  Ciudad: string;
  Calle: string;
  Numero: string;
  Piso: number;
  NumeroDepto: string;
  Precio: {
    Monto: number;
    Moneda: string;
  };
  Descripcion: string;
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
