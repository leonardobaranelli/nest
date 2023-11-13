import React from 'react';
import {Score} from '../../../redux/services/api'; // Ajusta la ruta según la ubicación de tus interfaces

interface ReviewCardProps {
  review: Score;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div>
        <p>Texto de la reseña: {review.feedBack}</p>
        <p>Calificación: {review.score}</p>
        {/* Puedes agregar más información de la reseña según tu modelo */}
        </div>
    );
};

export default ReviewCard;