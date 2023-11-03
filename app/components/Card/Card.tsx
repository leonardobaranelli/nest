import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/redux/hooks';
import { add, remove } from '@/redux/features/Favorite';

interface Property {
  days: number | null;
  type: string;
  condition: string;
  image: string[];
  title: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  floorNumber: string;
  aptNumber: string;
  price: number;
  description: string;
  id: string; 
  images: string[]; 
  userId: string | null; 
}

const Card: React.FC<Property> = (property) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useAppDispatch();

  const nextImage = () => {
    if (currentImage < property.images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      dispatch(remove(property)); // Llama a la acción para quitar la propiedad favorita
    } else {
      dispatch(add(property)); // Llama a la acción para agregar la propiedad favorita
    }
  };

  // Rutas a las imágenes para favorito y no favorito/like.pn
  const favoriteImageUrl = '/dislike.png';
  const notFavoriteImageUrl = '/like.png';

  return (
    <div className="w-96 p-4 bg-white rounded-3xl shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="h-52 w-90 relative">
        {property.images?.map((imagen, index) => (
          <img
            key={index} 
            src={imagen}
            alt={`image`}
            className={`rounded h-full w-full object-cover object-center absolute top-0 left-0 transition-opacity duration-300 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {property.images?.length > 1 && (
          <div className="absolute top-0 left-0 h-full w-1/2 flex items-center cursor-pointer" onClick={prevImage}>
            <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
              <g transform="rotate(-90 12 12)">
                <g id="feArrowUp0" fill="none" fillRule="evenodd" strokeWidth="1">
                  <g id="feArrowUp1" fill="currentColor">
                    <path id="feArrowUp2" d="m4 15l8-8l8 8l-2 2l-6-6l-6 6" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        )}
        {property.images?.length > 1 && (
          <div className="absolute top-0 right-0 h-full w-1/2 flex items-center justify-end cursor-pointer" onClick={nextImage}>
            <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
              <g transform="rotate(90 12 12)">
                <g id="feArrowUp0" fill="none" fillRule="evenodd" strokeWidth="1">
                  <g id="feArrowUp1" fill="currentColor">
                    <path id="feArrowUp2" d="m4 15l8-8l8 8l-2 2l-6-6l-6 6" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        )}
      </div>
      <div className='flex flex-col justify-around gap-8'>
        <div>
          <h2 className="text-xl font-bold text-center">
            <Link href={`/Views/${property.id}`}>{property.title}</Link>
          </h2>
          <h2 className='text-center mt-5 text-xl text-center font-semibold'>${property.price}</h2>
        </div>
        <div className="p-4">
          <p className="text-gray-600">{property.condition}</p>
          <p className="text-gray-600">
            <img src="/location .png" width={30} height={30} alt="direccion" /> {property.type} en {property.streetName} {property.floorNumber}
          </p>
          <p className="text-gray-600">{property.country}, {property.city}</p>
          <div className="flex justify-end items-center mt-4">
            <button onClick={toggleFavorite} className={`favorite-button ${isFavorite ? 'favorite' : ''}`}>
              {isFavorite ? (
                <img src={favoriteImageUrl} width={40} height={40} alt="Favorito" />
              ) : (
                <img src={notFavoriteImageUrl}width={40} height={40} alt="No favorito" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;





/* import React from 'react';
import { useState } from 'react';

interface Property {
  days: number;
  type: string;
  condition: string;
  image: string[];
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
  console.log(property)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < property.image.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  return (
    <div className="w-96 p-4 bg-white rounded-3xl shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="h-52 w-96 relative">
        {property.image.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`image ${index}`}
            className={`h-full w-full object-cover object-center absolute top-0 left-0 transition-opacity duration-300 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {property.image.length > 1 && (
          <div className="absolute top-0 left-0 h-full w-1/2 flex items-center cursor-pointer" onClick={prevImage}>
            <span className="text-4xl">&#9664;</span>
          </div>
        )}
        {property.image.length > 1 && (
          <div className="absolute top-0 right-0 h-full w-1/2 flex items-center justify-end cursor-pointer" onClick={nextImage}>
            <span className="text-4xl">&#9654;</span>
          </div>
        )}
      </div>
      <h2 className="text-xl font-semibold text-center">{property.title}</h2>
      <div className="p-4 flex flex-col justify-center">
        <h2 className="text-center mt-5 text-xl text-center">${property.price}</h2>
        <p className="text-gray-600">Tipo: {property.type}</p>
        <p className="text-gray-600">País: {property.country}</p>
        <p className="text-gray-600">Ciudad: {property.city}</p>
        <p className="text-gray-600">Dirección: {property.streetName} {property.floorNumber}</p>
      </div>
    </div>
  );
};

export default Card; */