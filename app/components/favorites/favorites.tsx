import { useAppDispatch, useAppSelector } from '@/redux/hooks';
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
  const favoriteProperties = useAppSelector((state) => state.favorites.posts);
  const { data: posts, isLoading, isError } =  useGetFavoritesQuery({ userId: 'c30e0fed-a0c0-4882-9495-356a6e82b0bd' });
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

console.log("estado favorite",favoriteProperties);

  return (
    <div>
      {favoriteProperties && favoriteProperties.length > 0 && (
        <div>
          <Link href={`/Views/${favoriteProperties[currentPropertyIndex]?.postId}`}>
            <h1>{favoriteProperties[currentPropertyIndex]?.title}</h1>
          </Link>
          <p>Precio: ${favoriteProperties[currentPropertyIndex]?.price}</p>
          <div className="property-images">
            {/* {favoriteProperties[currentPropertyIndex]?.images.map((image, imageIndex) => ( */}
              {/* <img
                key={imageIndex}
                src={image}
                width={25}
                height={25}
                alt={`Property Image ${imageIndex}`}
                style={{ display: imageIndex === currentImageIndex ? 'block' : 'none' }}
              />
            ))} */}
          </div>
          <button onClick={prevImage}>PREV</button>
          <button onClick={nextImage}>NEXT</button>
        </div>
      )}
    </div>
  );
}


export default FavoriteCard;
