import React from 'react';
import Cards from '@/app/components/Cards/Cards';
import Link from 'next/link';
import axios from "axios";

const Page = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts/sell');
      const data = response.data;
      
      return data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      return [];
    }
  };

  const renderWithData = async () => {
    const properties = await fetchData();    
    return (
      <div>
        <button>
          <Link href="/Views/home">Home</Link>
        </button>
        <Cards properties={properties} />
      </div>
    );
  };

  return renderWithData();
};

export default Page;







