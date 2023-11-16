
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import StarRating from '../StarRating/StarRating';

interface ReviewFormProps {
  postId: string | number;
}


interface ReviewData {
  score: number;
  type: string;
  feedBack: string;
  postId: string | number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ postId }) => {
  const [reviewData, setReviewData] = useState<ReviewData>({
    score: 1,
    type: 'user',
    feedBack: '',
    postId: postId,
  });

  const handleFeedbackChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
  
    // Validación: solo permite dígitos del 1 al 10
    const validatedValue = inputValue.replace(/\D/g, '');
  
    // Actualiza el estado con el valor validado
    setReviewData((prevData) => ({
      ...prevData,
      score: validatedValue === '' ? 0 : parseInt(validatedValue),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!postId) {
        console.error("postId is undefined");
        return;
      }

      console.log('Datos de la reseña:', reviewData);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/score/create`, reviewData);

      

      if (response.status === 200 || response.status === 201) {
        if (response.data && response.data.id) {
          Swal.fire({
            icon: 'success',
            title: 'Reseña creada con Éxito',
            showConfirmButton: false,
            timer: 1500,
            didClose: () => {
              window.location.reload();
            },
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al Crear',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al Crear',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error al Crear',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Haz tu propia reseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-gray-700 font-bold mb-2">
            Comentario:
          </label>
          <textarea
            id="feedback"
            name="feedBack"
            value={reviewData.feedBack}
            onChange={handleFeedbackChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">
            Calificación del 1 al 10 ?
          </label>
          <div className="flex items-center">
            <input
              type="text"
              pattern="[0-9]|10"


// <!--               maxLength={2} -->

              value={reviewData.score}
              onChange={handleScoreChange}
              onBlur={() => {
                const parsedValue = parseInt(reviewData.score.toString());
                if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
                  setReviewData((prevData) => ({
                    ...prevData,
                    score: parsedValue,
                  }));
                } else {
                  setReviewData((prevData) => ({
                    ...prevData,
                    score: 0,
                  }));
                }
              }}
              className="w-16 px-3 py-2 border rounded-md mr-2"
            />
            <StarRating score={parseFloat(reviewData.score.toString())} />
          </div>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-br from-pink-500 to-orange-400 text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200"
        >
          Enviar reseña
        </button>
      </form>
    </div>
  );
};


export default ReviewForm;

