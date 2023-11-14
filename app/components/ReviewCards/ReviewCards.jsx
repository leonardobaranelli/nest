// ScoreComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScores } from '../../../redux/features/ScoreSlice'
import StarRating from '../StarRating/StarRating';

const ScoreComponent = ({postId}) => {
    const dispatch = useDispatch();
    const { scores, status, error } = useSelector((state) => state.scores);

    useEffect(() => {
        // Dentro de useEffect antes de dispatch(fetchScores())
        dispatch(fetchScores());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    // Filtra las reseñas por el ID del post
    const postScores = scores.filter((score) => score.postId === postId);

    if (postScores.length === 0) {
        return <div>Aún no hay ninguna... Sé el primero en hacer una valoracion! <br /></div>
    }
        
        return (
            <div className="max-w-4xl mx-auto">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {postScores.map((score) => (
                    <li key={score.id} className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                    <StarRating score={score.score} />
                    <p className="text-gray-700 mt-4">{score.feedBack}</p>
                    </li>
                ))}
                </ul>
            </div>
        );
};

export default ScoreComponent;
