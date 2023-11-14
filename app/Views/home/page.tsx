"use client"

// En Home.tsx
import React, { useEffect, useState } from 'react';
import Cards from '@/app/components/Cards/Cards';
import Navbar from '@/app/components/Navbar/Navbar';
import Errors from '@/app/components/Error/Error';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateState } from '@/redux/features/GlobalSlice';
import { useGetPostsQuery } from '@/redux/services/api';
import { updateSelec } from '@/redux/features/SelecSlice';
import FavoriteCard from '@/app/components/favorites/favorites';
import FilterModal from '@/app/components/favorites/FilterModal';
import { useGetFavoritesQuery } from '@/redux/services/favorite';

const Home = () => {
  const dispatch = useAppDispatch();
  const { data: posts, isLoading, isError } = useGetPostsQuery('');
  const homeState = useAppSelector((state) => state.home.properties);
  const favoriteState = useAppSelector((state) => state.favorite.properties);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(updateState(posts || []));
      dispatch(updateSelec(posts || []));
    }
  }, [posts, isLoading, isError]);

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  return (
    <div>
      <Navbar />

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

      <img     
        src="/dislike.png"  
        alt="Mostrar Modal"
        onClick={toggleFilterModal}
        className="fixed bottom-4 right-4 cursor-pointer"
        style={{ width: '50px', height: '50px' }}  
      />

      {showFilterModal && <FilterModal onClose={toggleFilterModal} />}
    </div>
  );
};

export default Home;

