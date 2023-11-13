'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/redux/hooks';
import { add, remove } from '@/redux/features/Favorite';
import { Property } from '@/redux/features/SelecSlice';

import { Post, useAddFavoriteMutation, useDeleteFavoriteMutation, useGetFavoritesQuery } from '@/redux/services/favorite';
import StarRating from '../StarRating/StarRating';


interface CardsProps {  
  properties: Property;
}

const Card: React.FC<CardsProps> = ({properties}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useAppDispatch();

  const [deleteFavorite]=useDeleteFavoriteMutation()
  const [addFavorite]=useAddFavoriteMutation()
  const { data: favoriteProperties } = useGetFavoritesQuery({ userId: 'c2ae643d-6871-4004-acb4-d83b90c7b8fa' });

  const nextImage = () => {
    if (currentImage < properties.images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };



  const { id, title, price, images } = properties;
  const userId = "c13784e7-1045-474d-869e-886ea55f9092";
  const postId=id

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    if (isFavorite) {
      deleteFavorite({ userId, postId });
    } else {
      const post: Post = {
        userId,
        postId,
        images,
        title,
        price,
      };
    
      addFavorite(post);
      
 
    }

  };
        

  
  
  
  
  

  const favoriteImageUrl = '/dislike.png';
  const notFavoriteImageUrl = '/like.png';

  return (
    <div className="w-96 p-4 bg-white rounded-3xl shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="h-52 w-90 relative">
        {properties.images?.map((imagen, index) => (
          <img
            key={index} 
            src={imagen}
            alt={`image`}
            className={`rounded h-full w-full object-cover object-center absolute top-0 left-0 transition-opacity duration-300 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {properties.images?.length > 1 && (
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
        {properties.images?.length > 1 && (
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
            <Link href={`/Views/${properties.id}`}>{properties.title}</Link>
          </h2>
          <h2 className='text-center mt-5 text-xl font-semibold'>${properties.price}</h2>
        </div>
        <div className="p-4">
          {/* Utiliza el componente StarRating para mostrar el puntaje como estrellas */}
          <StarRating score={properties.score} />
          <p className="text-gray-600">{properties.condition}</p>
          <p className="text-gray-600">
            <img src="/location .png" width={30} height={30} alt="direccion" /> {properties.type} en {properties.streetName} {properties.floorNumber}
          </p>
          <p className="text-gray-600">{properties.country}, {properties.city}</p>
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


