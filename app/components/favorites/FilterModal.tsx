
import React, { useEffect } from 'react';
import FavoriteCard from './favorites';
import { useGetFavoritesQuery } from '@/redux/services/favorite';

interface FilterModalProps {
  onClose: () => void;
}



const FilterModal: React.FC<FilterModalProps> = ({ onClose }) => {
  return (
    <div className="fixed bottom-0 right-0 m-4 ">
  <div className="bg-white p-4 w-96 rounded-lg shadow-lg">
  <div className="rounded-t-md flex flex-row justify-around items-center">
    <h2 className="font-logo text-lg">Propiedades Favoritas</h2>

    <button onClick={onClose} className="text-3xl text-gray-600 hover:text-gray-800">
      ×
    </button>
  </div>
  <div className="p-4">
    <FavoriteCard />
  </div>
</div>
    </div>
  );
};

export default FilterModal;


