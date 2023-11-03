"use client";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useGetPostsQuery } from "@/redux/features/PostSlice";
import { Post } from "@/redux/features/PostSlice";

interface NavbarProps {  
  busqueda: React.Dispatch<React.SetStateAction<Post[]>>;  
}
const Search: React.FC<NavbarProps> = ({ busqueda }) => {
  const [inputValue, setInputValue] = useState("");
  const { data } = useGetPostsQuery("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value;
    setInputValue(values);
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const filterData = data?.filter((dataSearch: Post) =>
        dataSearch.title.toLowerCase().includes(inputValue.toLowerCase())
        );
        if(filterData) busqueda(filterData)
        console.log(filterData);
      }
    };
    
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder="Buscar propiedad"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="relative bg-gray-50ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-1 checked:bg-emerald-500"
      ></input>
    </div>
  );
};

export default Search;
