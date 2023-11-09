import React from 'react';
import FavoriteCard from './favorites';

interface FilterModalProps {
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 w-96 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Propiedades Favoritas</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            Cerrar
          </button>
        </div>
        <div className="p-4">
          <FavoriteCard />
        </div>
        <button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
