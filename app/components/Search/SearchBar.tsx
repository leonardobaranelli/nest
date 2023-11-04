"use client";

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Post } from '@/redux/services/getPost';
import { updateState } from '@/redux/features/GlobalSlice';

interface Property {
  [key: string]: string | number | null | string[];
}

function SearchBar() {
  const dispatch = useAppDispatch();
  const posts: Post[] = useAppSelector((state) => state.selec.properties);
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
