"use client";

import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import validate from "@/app/Handlers/validation";
import axios from "axios";

export default function Formulario() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    days: "",
    condition: "",
    type: "",
    images: [],
    title: "",
    country: "",
    city: "",
    streetName: "",
    streetNumber: "",
    floorNumber: "",
    aptNumber: "",
    price: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors(
      validate({
        ...values,
        [event.target.name]: event.target.value,
      })
    );
  }

  const handleImages = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      images: [...values.images, event.target.value],
    });
    setErrors(
      validate({
        ...values,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();    
    const formErrors = validate(values);
    setErrors(formErrors);


      try {        
        const response = await axios.post("http://localhost:3001/posts", values);
        console.log("Respuesta de la solicitud POST:", response.data);

      } catch (error) {
        console.error("Error al realizar la solicitud POST:", error);
      }
    //}
  };

  useEffect(() => {    
  }, []);

  return (
    <form
      className="bg-white p-10 rounded-lg shadow-md max-w-3xl"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="mb-5">
        <label className="block text-gray-700 font-bold mb-2">Título: </label>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          className="border p-2 w-full rounded-lg"
        />
        <div className="mb-2">
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label>Tipo: </label>
        <select name="type" value={values.type} onChange={handleChange}>
          <option value="empty"></option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <div className="mb-2">
          {errors.type && (
            <span className="text-red-500 text-sm">{errors.type}</span>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label>Días: </label>
        <input
          type="number"
          name="days"
          value={values.days}
          onChange={handleChange}
        />
        <div className="mb-2">
          {errors.days && (
            <span className="text-red-500 text-sm">{errors.days}</span>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label>Pais: </label>
        <input
          type="text"
          name="country"
          value={values.country}
          onChange={handleChange}
        />
        <div className="mb-2">
          {errors.country && (
            <span className="text-red-500 text-sm">{errors.country}</span>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label>Ciudad: </label>
        <input
          type="text"
          name="city"
          value={values.city}
          onChange={handleChange}
        />
        <div className="mb-2">
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city}</span>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label>Calle: </label>
        <input
          type="text"
          name="streetName"
          value={values.streetName}
          onChange={handleChange}
        />
        <div className="mb-2">
          {errors.street && (
            <span className="text-red-500 text-sm">{errors.streetName}</span>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label>Número de calle: </label>
        <input
          type="text"
          name="streetNumber"
          value={values.streetNumber}
          onChange={handleChange}
        />
        <div className="mb-2">
          {errors.streetNumber && (
            <span className="text-red-500 text-sm">{errors.streetNumber}</span>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label>Piso: </label>
        <input
          type="number"
          name="floorNumber"
          value={values.floorNumber}
          onChange={handleChange}
        />
        <div className="mb-2">
          {errors.floorNumber && (
            <span className="text-red-500 text-sm">{errors.floorNumber}</span>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label>Apartamento: </label>
        <input
          type="number"
          name="aptNumber"
          value={values.aptNumber}
          onChange={handleChange}
        />
        <div className="mb-2">
          {errors.aptNumber && (
            <span className="text-red-500 text-sm">{errors.aptNumber}</span>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label>Precio: </label>
        <input
          type="number"
          name="price"
          value={values.price}
          onChange={handleChange}
        />
        <div className="mb-2">
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price}</span>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-gray-700 font-bold mb-2">
          Descripción:{" "}
        </label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          className="border p-2 w-full rounded-lg"
        />
        <div className="mb-2">
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>
      </div>


      <div className="mb-5">
        <label className="block text-gray-700 font-bold mb-2">Imagen: </label>
        <input
          type="text"
          name="images"
          onChange={(event) => handleImages(event)}
          className="border p-2 w-full rounded-lg"
        />
        <div className="mb-2">
          {errors.images && (
            <span className="text-red-500 text-sm">{errors.images}</span>
          )}
        </div>
      </div>


      <button
        type="submit"
        className="bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-500 rounded-lg"
        onClick={handleSubmit}
      >
        {/* {isLoading ? 'Submitting...' : 'Submit'} */}
        Crear
      </button>
    </form>
  );
}
