// import React from 'react';
// import { useRouter } from 'next/router';

// const Detail = () => {
//   const router = useRouter();
//   const { title } = router.query;

  // En lugar de buscar la propiedad en el objeto query, puedes buscarla en tus datos.
  // Por ejemplo, en un arreglo de propiedades.

//   const properties = /* Tu arreglo de propiedades */;
//   const property = properties.find((p) => p.Titulo === title);

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
      <div className="">
        <h2>Ciudad</h2>
      </div>
      <div className="">
        <h2>{property.city}</h2>
      </div>
      <div className="">
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
