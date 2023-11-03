import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateState } from "@/redux/features/GlobalSlice";

const DisplayFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.selec.properties);

  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Obtén las opciones únicas para los filtros
  const uniquePriceRanges = Array.from(new Set(posts.map((post) => post.priceRange)));
  const uniqueCountries = Array.from(new Set(posts.map((post) => post.country)));
  const uniqueCities = Array.from(new Set(posts.map((post) => post.city)));

  const [filteredPosts, setFilteredPosts] = useState(posts);

  const applyFilters = () => {
    let filtered = posts;

    if (selectedPriceRange === "lessThan1000") {
      filtered = filtered.filter((post) => post.price < 1000);
    } else if (selectedPriceRange === "1000To10000") {
      filtered = filtered.filter((post) => post.price >= 1000 && post.price <= 10000);
    } else if (selectedPriceRange === "greaterThan10000") {
      filtered = filtered.filter((post) => post.price > 10000);
    }

    if (selectedCountry) {
      filtered = filtered.filter((post) => post.country === selectedCountry);
    }

    if (selectedCity) {
      filtered = filtered.filter((post) => post.city === selectedCity);
    }

    setFilteredPosts(filtered);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriceRange(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const clearFilters = () => {
    setSelectedPriceRange("");
    setSelectedCountry("");
    setSelectedCity("");
    setFilteredPosts(posts);
  };

  return (
    <div>
      <h2>Búsqueda</h2>
      <div>
        <label htmlFor="selectedPriceRange">Filtrar por Precio:</label>
        <select
          id="selectedPriceRange"
          value={selectedPriceRange}
          onChange={handlePriceChange}
        >
          <option value="">Selecciona un rango de precio</option>
          {uniquePriceRanges.map((priceRange) => (
            <option key={priceRange} value={priceRange}>
              {priceRange}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="selectedCountry">Filtrar por País:</label>
        <select
          id="selectedCountry"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Selecciona un país</option>
          {uniqueCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="selectedCity">Filtrar por Ciudad:</label>
        <select
          id="selectedCity"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">Selecciona una ciudad</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <button onClick={applyFilters}>Buscar</button>
      <button onClick={clearFilters}>Limpiar</button>
    </div>
  );
};

export default DisplayFilter;
