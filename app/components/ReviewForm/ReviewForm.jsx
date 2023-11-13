import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import StarRating from '../StarRating/StarRating';

const   DEPLOY_BACK_URL = "http://localhost:3001";

const ReviewForm = ({ postId }) => {
  const [reviewData, setReviewData] = useState({
    "score": 0,
    "type": "user",
    "feedBack": "",
    "postId": postId,
  });

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleScoreChange = (e) => {
    const inputValue = e.target.value;
  
    // Validación: solo permite dígitos del 1 al 10
    const validatedValue = inputValue.replace(/\D/g, ''); 
  
    // Actualiza el estado con el valor validado
    setReviewData((prevData) => ({
      ...prevData,
      score: validatedValue,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(DEPLOY_BACK_URL)
        if (!postId) {
            console.error("postId is undefined");
            // Puedes manejar este caso de otra manera, como mostrar un mensaje de error al usuario
            return;
        }
        console.log('Datos de la reseña:', reviewData);
        const response = await axios.post(`${DEPLOY_BACK_URL}/score/create`, reviewData);

    
    if (response.status === 200 || response.status === 201) {
        if (response.data && response.data.id) {
          Swal.fire({
            icon: "success",
            title: "Creado con Éxito",
            showConfirmButton: false,
            timer: 1500,
            didClose: () => {
                // Recarga la página después de que se ha cerrado la alerta
                window.location.reload();
              },
          });

        } else {
          Swal.fire({
            icon: "error",
            title: "Error al Crear",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al Crear",
          showConfirmButton: false,
          timer: 1500,
        });
      }

    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);

      Swal.fire({
        icon: "error",
        title: "Error al Crear",
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
              type="number" // Cambiado de "number" a "text"
              pattern="[0-9]|10" // Patrón para permitir solo dígitos del 1 al 10
              maxLength="2" // Limita la longitud a 2 caracteres
              value={reviewData.score}
              onChange={handleScoreChange}
              onBlur={() => {
                // Convierte el valor a un número después de que el usuario haya terminado de escribir
                const parsedValue = parseInt(reviewData.score);
                if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
                  setReviewData((prevData) => ({
                    ...prevData,
                    score: parsedValue,
                  }));
                } else {
                  // Si el valor no es válido, restablece a 0
                  setReviewData((prevData) => ({
                    ...prevData,
                    score: 0,
                  }));
                }
              }}
              className="w-16 px-3 py-2 border rounded-md mr-2"
            />
            <StarRating score={parseFloat(reviewData.score)} onChange={handleScoreChange} />
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
