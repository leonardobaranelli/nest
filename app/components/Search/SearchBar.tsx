"use client";

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Property } from '@/redux/features/SelecSlice';
import { updateState } from '@/redux/features/GlobalSlice';



function SearchBar() {
  const dispatch = useAppDispatch();
  const posts: Property[] = useAppSelector((state) => state.selec.properties);
  const [searchTerm, setSearchTerm] = useState<string>(""); 

  const handleSearch = () => {
    const filteredPosts = posts.filter((post) => {
      const values = Object.values(post).filter((value) => typeof value === 'string');
      return values.some((value) => value.includes(searchTerm));
    });

    console.log("Objetos que contienen la palabra:", filteredPosts);
    dispatch(updateState(filteredPosts || []))
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default SearchBar;
