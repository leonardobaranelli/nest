
import React, { useState } from 'react';
import { remove } from '@/redux/features/Favorite';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface Property {
  id: string;
  title: string;
  price: number;
  images: string[];
}

function FavoriteCard() {
  const favoriteProperties = useAppSelector((state) => state.favorite.properties);
  const dispatch = useAppDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleRemove = (property: Property) => {
    dispatch(remove(property));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % favoriteProperties[currentImageIndex].images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + favoriteProperties[currentImageIndex].images.length) % favoriteProperties[currentImageIndex].images.length);
  };

  return (
    <div>
      <ul>
        {favoriteProperties.map((property, index) => (
          <li key={property.id} style={{ display: index === currentImageIndex ? 'block' : 'none' }}>
            <h3>{property.title}</h3>
            <p>Precio: ${property.price}</p>
            <div className="property-images">
              {property.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image}
                  width={25}
                  height={25}
                  alt={`Property Image ${imageIndex}`}
                  style={{ display: imageIndex === currentImageIndex ? 'block' : 'none' }}
                />
              ))}
            </div>
            <button onClick={prevImage}></button>
            <button onClick={nextImage}>NEXT</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteCard;



