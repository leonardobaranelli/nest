import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store'; // Asegúrate de importar correctamente el tipo RootState
import { fetchScores } from '../../../redux/features/ScoreSlice';
import StarRating from '../StarRating/StarRating';

interface Score {
  id: string;
  postId: string; // Agrega la propiedad postId
  score: number;
  feedBack: string;
  // Otras propiedades según la estructura de tu objeto Score
}

interface ScoreComponentProps {
  postId: string | number;
}

const ScoreComponent: React.FC<ScoreComponentProps> = ({ postId }) => {
  const dispatch = useDispatch();
  const { scores, status, error } = useSelector((state: RootState) => state.scores);

  useEffect(() => {
    dispatch(fetchScores()as any);
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

    // Especifica el tipo de scores
    const typedScores = scores as Score[];
  // Filtra las reseñas por el ID del post
  const postScores = typedScores.filter((score) => score.postId === postId);

  if (postScores.length === 0) {
    return (
      <div>
        Aún no hay ninguna... Sé el primero en hacer una valoración! <br />
      </div>
    );
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

