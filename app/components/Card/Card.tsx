import React from 'react';

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

const Card: React.FC<Property> = (property) => {
  return (
    <div className="property-card">
      <h2>{property.Titulo}</h2>
      <div className="property-images">
        {property.Imagenes.map((imagen, index) => (
          <img key={index} src={imagen} alt={`Imagen ${index + 1}`} />
        ))}
      </div>
      <p>Tipo: {property.Tipo}</p>
      <p>Precio: {property.Precio.Monto} {property.Precio.Moneda}</p>
      <p>Descripción: {property.Descripcion}</p>
    </div>
  );
};

export default Card;

