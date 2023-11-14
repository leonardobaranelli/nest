"use client";
import React, { useEffect, useState } from 'react';
import Cards from '@/app/components/Cards/Cards';
import Navbar from '@/app/components/Navbar/Navbar';
import Errors from '@/app/components/Error/Error';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateState } from '@/redux/features/GlobalSlice';
import { useGetPostsQuery } from '@/redux/services/api';
import { updateSelec } from '@/redux/features/SelecSlice';
import FavoriteCard from '@/app/components/favorites/favorites';
import DisplayFilter from '@/app/components/Filters/DisplayFilter';

const Home = () => {
  const dispatch = useAppDispatch();
  const { data: posts, isLoading, isError } = useGetPostsQuery('');
  const homeState = useAppSelector((state) => state.home.properties);
  const favoriteState = useAppSelector((state) => state.favorite.properties);
  const [showFavoriteNotification, setShowFavoriteNotification] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(updateState(posts || []));
      dispatch(updateSelec(posts || []));
    }
  }, [posts, isLoading, isError]);

  useEffect(() => {
    // Mostrar la notificación de favoritos cuando hay propiedades favoritas
    if (favoriteState.length > 0) {
      setShowFavoriteNotification(true);
    } else {
      setShowFavoriteNotification(false);
    }
  }, [favoriteState]);

  return (
    <div>
      <Navbar />
      <div>
        <img src="/filter.png" width={25} height={25} alt="Filter" /><DisplayFilter />
      </div>

      <div className="flex gap-10 justify-center">
        {isLoading ? (
          <img src="/Infinity-4.5s-224px.gif" alt="Cargando..." />
        ) : posts && posts.length > 0 ? (
          <div className="flex gap-10 justify-center">
            <Cards properties={homeState} />
          </div>
        ) : (
          <Errors />
        )}
      </div>
      {showFavoriteNotification && (
        <div className="fixed top-10 right-10 h-1/4 w-1/4 bg-white z-50 p-4 border border-gray-300 rounded-lg shadow-lg">
          <FavoriteCard /> {/* Muestra las propiedades favoritas en la notificación */}
          <button onClick={() => setShowFavoriteNotification(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default Home;
