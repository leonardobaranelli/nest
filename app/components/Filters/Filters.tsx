import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateState } from "@/redux/features/GlobalSlice"; // Importa la acción updateState

const PriceFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.selec.properties);

  const [selectedPriceRange, setLocalSelectedPriceRange] = useState<string>("");

  useEffect(() => {

    let filtered = posts;
    if (selectedPriceRange === "lessThan1000") {
      filtered = posts.filter((post) => post.price < 1000);
    } else if (selectedPriceRange === "1000To10000") {
      filtered = posts.filter((post) => post.price >= 1000 && post.price <= 10000);
    } else if (selectedPriceRange === "greaterThan10000") {
      filtered = posts.filter((post) => post.price > 10000);
    }
    dispatch(updateState(filtered)); 
    console.log("Respuesta de filtered", filtered); 
  }, [selectedPriceRange, posts, dispatch]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriceRange = e.target.value;
    setLocalSelectedPriceRange(newPriceRange);
  };

  return (
    <div>
      <label htmlFor="selectedPriceRange">Filtrar por Precio:</label>
      <select
        id="selectedPriceRange"
        value={selectedPriceRange}
        onChange={handlePriceChange}
      >
        <option value="">Selecciona un rango de precio</option>
        <option value="lessThan1000">Menor que 1000</option>
        <option value="1000To10000">Entre 1000 y 10000</option>
        <option value="greaterThan10000">Mayor que 10000</option>
      </select>
    </div>
  );
};

export default PriceFilter;
