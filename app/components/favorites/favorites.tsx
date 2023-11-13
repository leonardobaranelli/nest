import { useAppDispatch } from '@/redux/hooks';
import { useGetFavoritesQuery } from '@/redux/services/favorite';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


interface Property {
  userId: string;
  postId: string;  
  images: string[];
  title: string;
  price: number;
}

function FavoriteCard() {
  const { data: favoriteProperties } = useGetFavoritesQuery({ userId: 'c13784e7-1045-474d-869e-886ea55f9092' });
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useAppDispatch();


  const nextImage = () => {
    if (favoriteProperties) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % favoriteProperties[currentPropertyIndex]?.images.length);
    }
  };

  const prevImage = () => {
    if (favoriteProperties) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + favoriteProperties[currentPropertyIndex]?.images.length) % favoriteProperties[currentPropertyIndex]?.images.length);
    }
  };


  return (
    <div>
      {favoriteProperties && favoriteProperties.length > 0 && (
        <div>
          <Link href={`/Views/${favoriteProperties[currentPropertyIndex]?.postId}`}>
            <h1>{favoriteProperties[currentPropertyIndex]?.title}</h1>
          </Link>
          <p>Precio: ${favoriteProperties[currentPropertyIndex]?.price}</p>
          <div className="property-images">
            {favoriteProperties[currentPropertyIndex]?.images.map((image, imageIndex) => (
              <img
                key={imageIndex}
                src={image}
                width={25}
                height={25}
                alt={`Property Image ${imageIndex}`}
                style={{ display: imageIndex === currentImageIndex ? 'block' : 'none' }}
              />
            ))}
          </div>
          <button onClick={prevImage}>PREV</button>
          <button onClick={nextImage}>NEXT</button>
        </div>
      )}
    </div>
  );
}


export default FavoriteCard;
