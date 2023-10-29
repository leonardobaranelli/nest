"use client";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useGetPostsQuery } from "@/redux/features/PostSlice";

interface Property {
  days: number | null;
  type: string;
  condition: string;
  image: string[];
  title: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  floorNumber: string;
  aptNumber: string;
  price: number;
  description: string;
}
const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [valueServer, setValueServer] = useState<Property[] | undefined>(undefined);
  const { data } = useGetPostsQuery("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value;
    setInputValue(values);
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const filterData = data?.filter((dataSearch: Property) =>
        dataSearch.title.toLowerCase().includes(inputValue.toLowerCase())
        );
        setValueServer(filterData);
      }
    };
    console.log(valueServer);
    
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  );
};

export default Search;
