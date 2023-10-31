import React, { useState } from 'react';
import { useGetPostsByConditionQuery, Post } from "@/redux/features/PostSlice";

interface TipoInmuebleFiltersProps {
  setFilterTipoInmueble: (tipoInmuebleFilter: string) => void;
}

function TipoInmuebleFilters({ setFilterTipoInmueble }: TipoInmuebleFiltersProps) {
  const { data: sellData, isLoading: isSellLoading, isError: isSellError } = useGetPostsByConditionQuery("sell");
  const { data: rentData, isLoading: isRentLoading, isError: isRentError } = useGetPostsByConditionQuery("rent");

  const tiposInmuebleData = extractTiposInmuebleFromData(sellData, rentData);

  const [selectedTipoInmueble, setSelectedTipoInmueble] = useState("all");

  const handleTipoInmuebleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tipoInmuebleFilter = event.target.value;
    setSelectedTipoInmueble(tipoInmuebleFilter);
    setFilterTipoInmueble(tipoInmuebleFilter);
  };

  return (
    <div>
      <label htmlFor="tipoInmuebleFilter">Inmueble:</label>
      <select id="tipoInmuebleFilter" value={selectedTipoInmueble} onChange={handleTipoInmuebleChange}>
        <option value="all">Todos</option>
        {tiposInmuebleData.map((tipoInmueble) => (
          <option key={tipoInmueble} value={tipoInmueble}>
            {tipoInmueble}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TipoInmuebleFilters;

function extractTiposInmuebleFromData(sellData: Post[] | undefined, rentData: Post[] | undefined): string[] {
  const tiposInmueble = new Set<string>();

  if (Array.isArray(sellData)) {
    sellData.forEach((post) => tiposInmueble.add(post.type));
  }

  if (Array.isArray(rentData)) {
    rentData.forEach((post) => tiposInmueble.add(post.type));
  }

  return ["all", ...Array.from(tiposInmueble)];
}
