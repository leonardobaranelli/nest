// import React from 'react';
// import { useRouter } from 'next/router';

// const Detail = () => {
//   const router = useRouter();
//   const { title } = router.query;

  // En lugar de buscar la propiedad en el objeto query, puedes buscarla en tus datos.
  // Por ejemplo, en un arreglo de propiedades.

//   const properties = /* Tu arreglo de propiedades */;
//   const property = properties.find((p) => p.Titulo === title);

//   if (!property) {
//     return <div>Propiedad no encontrada</div>;
//   }

//   return (
//     <div className="detail-container">
//       <div className="property-details">
//         <h2>{property.Titulo}</h2>
//         {/* Agrega aquí los detalles de la propiedad, como título, imágenes, descripción, etc. */}
//       </div>
//       <div className="property-location">
//         <h2>Ubicación</h2>
//         {/* Agrega aquí detalles de la ubicación, como país, ciudad, calle, número, etc. */}
//       </div>
//       <div className="property-price">
//         <h2>Precio</h2>
//         {/* Agrega aquí el precio de la propiedad, incluyendo monto y moneda. */}
//       </div>
//       <div className="property-contact">
//         <h2>Contacto</h2>
//         {/* Agrega aquí información de contacto o un formulario de contacto, si es necesario. */}
//       </div>
//     </div>
//   );
// };

// export default Detail;
