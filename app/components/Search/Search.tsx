"use client";
import { useState, ChangeEvent, KeyboardEvent } from "react";
//
const Search = () => {
  const [inputValue, setInputValue] = useState("");


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value;
    setInputValue(values);
  };

  const handleKeyDowm =  (event:KeyboardEvent<HTMLInputElement>)=>{
    if(event.key === "Enter") {

        
    }
}
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDowm}
      ></input>
    </div>
  );
};

export default Search;
//