import React from 'react';

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

const Card: React.FC<Property> = (property) => {
  return (
    <div className="property-card">
      <h2>{property.title}</h2>
      <div className="property-images">
      <img src={property.image} alt={`image`} />
        {/* {property.Imagenes.map((imagen, index) => (
          <img key={index} src={imagen} alt={`Imagen ${index + 1}`} />
        ))} */}
      </div>
      <p>Tipo: {property.type}</p>
      <p>Precio: {property.price}</p>
      {/* <p>Precio: {property.Precio.Monto} {property.Precio.Moneda}</p> */}
      <p>Descripción: {property.description}</p>
    </div>
  );
};

export default Card;
