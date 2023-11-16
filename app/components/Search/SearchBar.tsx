"use client"
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
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      
      return values.some((value) => value.toLowerCase().includes(lowercaseSearchTerm));
    });

    dispatch(updateState(filteredPosts || []))
    setSearchTerm("")
  };

  return (
    <div className="relative sm:block">
      <label className="sr-only" htmlFor="search">Buscar</label>

      <input
        type="search"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-9 w-full rounded-lg border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56 border border-gray-300 p-1 mr-2 focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Buscar"
      />

      <button
        type="button"
        className="absolute end-2 top-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-red-500 transition hover:text-red-700"
        onClick={handleSearch}
      >
        <span className="sr-only">Buscar</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
