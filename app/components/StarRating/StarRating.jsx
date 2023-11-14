import React from 'react';

const StarRating = ({ score }) => {
    const maxScore = 5;
    // Dividir el score promediado por dos
    const adjustedScore = score / 2;
    const fullStars = Math.round(adjustedScore);
    const halfStar = adjustedScore - fullStars >= 0.5;

    const stars = Array(maxScore).fill(null).map((_, index) => {
        if (index < fullStars) {
            return <span key={index}>⭐</span>;
        } else if (index === fullStars && halfStar) {
            return <span key={index}>⭐️</span>;
        } else {
            return <span key={index}>☆</span>;
        }
    });

    return <div>{stars}</div>;
};

export default StarRating;
