import React from 'react';

function Errors() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">¡Algo salió mal!</h1>
        <img src="/roboterror.png" width={200} height={200} alt="Error al cargar los datos" />
        <p className="text-lg text-gray-600 mt-4">
          Ocurrió un error al cargar los datos. Por favor, inténtalo de nuevo más tarde.
        </p>
      </div>
  );
}

export default Errors;
