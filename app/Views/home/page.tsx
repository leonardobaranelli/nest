import React from 'react';
import Navbar from '@/app/components/Navbar/Navbar';
import Cards from '../../components/Cards/Cards'; 

function Home() {
  const properties = [
    {
      "Días": 30,
      "Tipo": "Alquiler",
      "Imagenes": [
        "https://i.pinimg.com/474x/ff/f8/94/fff8945a0c476cdd12e06c8a07dcc8f1.jpg",
      ],
      "Titulo": "La Hermosa casa en la playa que tendre XD",
      "Pais": "España",
      "Ciudad": "Barcelona",
      "Calle": "Calle de la Playa",
      "Numero": "123",
      "Piso": 2,
      "NumeroDepto": "B",
      "Precio": {
        "Monto": 1500,
        "Moneda": "EUR"
      },
      "Descripcion": "Esta encantadora casa de playa ofrece vistas panorámicas al mar, una ubicación conveniente y una amplia terraza para disfrutar del sol y el sonido de las olas. Cuenta con 3 habitaciones, 2 baños y una cocina totalmente equipada."
    },    {
      "Días": 30,
      "Tipo": "Alquiler",
      "Imagenes": [
        "https://i.pinimg.com/564x/ed/b1/a3/edb1a3ad47d3410c0581f2685ea5bc57.jpg"
      ],
      "Titulo": "Hermosa casa en la playa",
      "Pais": "España",
      "Ciudad": "Barcelona",
      "Calle": "Calle de la Playa",
      "Numero": "123",
      "Piso": 2,
      "NumeroDepto": "B",
      "Precio": {
        "Monto": 1500,
        "Moneda": "EUR"
      },
      "Descripcion": "Esta encantadora casa de playa ofrece vistas panorámicas al mar, una ubicación conveniente y una amplia terraza para disfrutar del sol y el sonido de las olas. Cuenta con 3 habitaciones, 2 baños y una cocina totalmente equipada."
    },

  ];

  return (
    <div>
      <div>
        <Navbar />
        <h2>Home</h2>
      </div>

      <Cards properties={properties} />
    </div>
  );
}

export default Home;
