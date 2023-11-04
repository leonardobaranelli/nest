import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/redux/features/PostSlice';

const Card: React.FC<Post> = (property) => {

  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () =>{
    if(currentImage < property.images.length -1){
      setCurrentImage(currentImage + 1)
    }
  }

  const prevImage = () =>{
    if(currentImage > 0){
      setCurrentImage(currentImage - 1)
    }
  }
  
  return (  
    <div className="w-96 p-4 bg-white rounded-3xl shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* <Link href={`/Views/${property.id}`}>Detalle</Link> */}
        <div className="h-52 w-90 relative">
          {property.images?.map((imagen, index) =>(
            <img key={index} src={imagen} alt={`image`} className={`rounded h-full w-full object-cover object-center absolute top-0 left-0 transition-opacity duration-300 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`} />
          ))}
          {property.images?.length > 1 && (
            <div className="absolute top-0 left-0 h-full w-1/2 flex items-center cursor-pointer" onClick={prevImage}>
              <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g transform="rotate(-90 12 12)"><g id="feArrowUp0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="feArrowUp1" fill="currentColor"><path id="feArrowUp2" d="m4 15l8-8l8 8l-2 2l-6-6l-6 6z"/></g></g></g></svg>
            </div>
          )}
          {property.images?.length > 1 && (
            <div className="absolute top-0 right-0 h-full w-1/2 flex items-center justify-end cursor-pointer" onClick={nextImage}>
              <svg className="text-white" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g transform="rotate(90 12 12)"><g id="feArrowUp0" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"><g id="feArrowUp1" fill="currentColor"><path id="feArrowUp2" d="m4 15l8-8l8 8l-2 2l-6-6l-6 6z"/></g></g></g></svg>
            </div>
          )}
        </div>
        <div className='flex flex-col justify-around gap-8'>
          <div>
              <h2 className="text-xl font-bold text-center"><Link href={`/Views/${property.id}`}>{property.title}</Link></h2>
              <h2 className='text-center mt-5 text-xl font-semibold'>${property.price}</h2>
          </div>
          <div className="p-4">
              <p className="text-gray-600">Inmueble: {property.type}</p>
              <p className="text-gray-600">Dirección: {property.streetName} {property.floorNumber}</p>
              <p className="text-gray-600">{property.country}, {property.city}</p>
  {/*             <div className="flex justify-end items-center mt-4">
                  <button className="text-2xl">❤️</button>
              </div> */}
          </div>
        </div>
    </div>
  );
};

export default Card;