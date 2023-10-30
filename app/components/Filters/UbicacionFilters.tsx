import React, { useState } from 'react';
import { useGetPostsByConditionQuery, Post } from "@/redux/features/PostSlice";

interface UbicacionFiltersProps {
  setFilterUbicacion: (ubicacionFilter: string) => void;
}

function UbicacionFilters({ setFilterUbicacion }: UbicacionFiltersProps) {
  const { data: sellData, isLoading: isSellLoading, isError: isSellError } = useGetPostsByConditionQuery("sell");
  const { data: rentData, isLoading: isRentLoading, isError: isRentError } = useGetPostsByConditionQuery("rent");

  const ubicacionesData = extractUbicacionesFromData(sellData, rentData);

  const [selectedUbicacion, setSelectedUbicacion] = useState("all");

  const handleUbicacionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const ubicacionFilter = event.target.value;
    setSelectedUbicacion(ubicacionFilter);
    setFilterUbicacion(ubicacionFilter);
  };

  return (
    <div>
      <label htmlFor="ubicacionFilter">Ubicación:</label>
      <select id="ubicacionFilter" value={selectedUbicacion} onChange={handleUbicacionChange}>
        <option value="all">Todos</option>
        {ubicacionesData.map((ubicacion) => (
          <option key={ubicacion} value={ubicacion}>
            {ubicacion}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UbicacionFilters;

function extractUbicacionesFromData(sellData: Post[] | undefined, rentData: Post[] | undefined): string[] {
  const ubicaciones = new Set<string>();

  if (Array.isArray(sellData)) {
    sellData.forEach((post) => ubicaciones.add(post.city));
  }

  if (Array.isArray(rentData)) {
    rentData.forEach((post) => ubicaciones.add(post.city));
  }

  return ["all", ...Array.from(ubicaciones)];
}

