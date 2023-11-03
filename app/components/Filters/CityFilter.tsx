import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateState } from "@/redux/features/GlobalSlice"; // Importa la acción updateState

const CityFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.selec.properties);

  const [selectedCity, setLocalSelectedCity] = useState<string>("");

  useEffect(() => {

    let filtered = posts;
    if (selectedCity) {
      filtered = posts.filter((post) => post.city === selectedCity);
    }
    dispatch(updateState(filtered)); 
    console.log( "respuesta  de filtered  ",filtered); 
  }, [selectedCity, posts, dispatch]);

  const uniqueCities = Array.from(new Set(posts.map((post) => post.city)));

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setLocalSelectedCity(newCity);
  };

  return (
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
  );
};

export default CityFilter;
