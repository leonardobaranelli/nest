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

  const dispatch = useAppDispatch();
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);

  const nextProperty = () => {
    setCurrentPropertyIndex((prevIndex) => (prevIndex + 1) % favoriteProperties.length);
  };

  const prevProperty = () => {
    setCurrentPropertyIndex((prevIndex) => (prevIndex - 1 + favoriteProperties.length) % favoriteProperties.length);
  };


  useEffect(() => {
    setCurrentPropertyIndex(0);
  }, [favoriteProperties]);

  console.log("lo de fav", favoriteProperties);


  return (
    <div className="bg-gray-100 p-4">
      {favoriteProperties && favoriteProperties.length > 0 ? (
        <div>

          <div className="flex flex-row space-x-4">

            <div className={`transition-transform transform scale-100 text-center`}>
            <div className="mx-auto"> 
  {favoriteProperties[currentPropertyIndex]?.images.length > 0 && (
    <img
      src={favoriteProperties[currentPropertyIndex].images[0]}
      className="rounded-md w-full h-auto" // Añadir estas clases
      alt={`Property Image 0`}
    />
  )}
</div>
              <Link href={`/Views/${favoriteProperties[currentPropertyIndex].postId}`}>
                <h1 className="text-xl font-bold cursor-pointer hover:underline">
                  {favoriteProperties[currentPropertyIndex].title}
                </h1>
              </Link>
              <p className="text-gray-700">Precio: ${favoriteProperties[currentPropertyIndex].price}</p>
            </div>

          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={prevProperty}
              disabled={favoriteProperties.length <= 1}
              className="text-white bg-[#FD8974] px-4 py-2 rounded disabled:opacity-50"
            >
              PREV
            </button>
            <button
              onClick={nextProperty}
              disabled={favoriteProperties.length <= 1}
              className="text-white bg-[#FD8974] px-4 py-2 rounded disabled:opacity-50"
            >
              NEXT
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No hay propiedades favoritas.</p>
      )}
    </div>
  );
}

export default FavoriteCard;

