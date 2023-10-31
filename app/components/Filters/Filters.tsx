import React, { useState } from 'react';

interface PrecioFiltersProps {
  setFilterPrice: (priceFilter: string) => void;
}

function PrecioFilters({ setFilterPrice }: PrecioFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const priceFilter = event.target.value;
    setSelectedFilter(priceFilter);
    setFilterPrice(priceFilter);
  };

  return (
    <div>
      <label htmlFor="priceFilter">Precio:</label>
      <select id="priceFilter" value={selectedFilter} onChange={handleFilterChange}>
        <option value="lessThan1000">Menor a $1000</option>
        <option value="greaterThan1000">Mayor a $1000</option>
        <option value="all">Todos</option>
      </select>
    </div>
  );
}

export default PrecioFilters;
