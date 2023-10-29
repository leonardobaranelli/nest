'use client'

import { useState, useEffect } from 'react'
import 'tailwindcss/tailwind.css';
import validate from '@/app/Handlers/validation';
import { useCreatePostMutation, useGetPostsQuery } from '@/redux/features/PostSlice';
import { useAppDispatch } from '@/redux/hooks';


export default function Formulario() {

    const dispatch = useAppDispatch()
    const [errors, setErrors] = useState({});
    const initialFormValues = {
      days: "",
      condition: '',
      type: '',
      images: [],
      title: '',
      country: '',
      city: '',
      street: '',
      streetNumber: '',
      floorNumber: '',
      aptNumber: '',
      price: "",
      description: '',
      rooms: ""
    }
    const [values, setValues] = useState(
      initialFormValues
    )
    const { data: posts, isLoading, isError, refetch } = useGetPostsQuery();
    const createPost = useCreatePostMutation(values);

    const disable = () => {
      let disabled = true;
      for (let error in errors) {
          //console.log("soy error", error);
          if (errors[error] === "" || errors[error].length === 0) disabled = false;
          else {
          disabled = true;
          break;
          }
      }
      return disabled;
  };

    // Función para manejar cambios en los campos del formulario
    function handleChange(e) {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
      setErrors(
        validate({
            ...values,
            [e.target.name]: e.target.value,
        })
    );
    }
    
    const handleImages = (e) => {
      e.preventDefault();
      setValues({
      ...values,
      images: [...values.images, e.target.value],
  });
      setErrors(
          validate({
              ...values,
              [e.target.name]: e.target.value,
          })
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    }

  
  
    

    useEffect(() => {
      if (isError) {
        console.error('Error fetching posts:', isError);
      }
      // Se ejecuta cuando la lista de publicaciones cambia
      console.log('Posts:', posts);
    }, [isError, isLoading, posts]);

    return (
        <form className="bg-white p-10 rounded-lg shadow-md max-w-3xl" onSubmit={(e) => handleSubmit(e)}>        
          <div className="mb-5">
            <label className="block text-gray-700 font-bold mb-2">Title: </label>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              className="border p-2 w-full rounded-lg"
            />
            <div className="mb-2">
                  {errors.title && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.title}
                  </span>
                  )}
              </div>
          </div>

          <div className="mb-5">
            <label>Type: </label>
            <select
              name="type"
              value={values.type}
              onChange={handleChange}
            >
              <option value="empty"></option>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
            <div className="mb-2">
                  {errors.type && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.type}
                  </span>
                  )}
              </div>
          </div>

          <div className="mb-5">
            <label>Days: </label>
            <input
              type="number"
              name="days"
              value={values.days}
              onChange={handleChange}
            />
              <div className="mb-2">
                  {errors.days && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.days}
                  </span>
                  )}
              </div>
          </div>

          <div className="mb-5">
            <label>Rooms: </label>
            <input
              type="number"
              name="rooms"
              value={values.rooms}
              onChange={handleChange}
            />
              <div className="mb-2">
                  {errors.rooms && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.rooms}
                  </span>
                  )}
              </div>
          </div>

          <div className="mb-5">
            <label>Country: </label>
            <input
              type="text"
              name="country"
              value={values.country}
              onChange={handleChange}
            />
              <div className="mb-2">
                  {errors.country && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.country}
                  </span>
                  )}
              </div>
          </div>

          <div className="mb-5">
            <label>City: </label>
            <input
              type="text"
              name="city"
              value={values.city}
              onChange={handleChange}
            />
              <div className="mb-2">
                  {errors.city && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.city}
                  </span>
                  )}
              </div>
          </div>

          <div className="mb-5">
            <label>Street: </label>
            <input
              type="text"
              name="street"
              value={values.street}
              onChange={handleChange}
            />
              <div className="mb-2">
                  {errors.street && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.street}
                  </span>
                  )}
              </div>
          </div>

          <div className="mb-5">
            <label>Street Number: </label>
            <input
              type="text"
              name="streetNumber"
              value={values.streetNumber}
              onChange={handleChange}
            />
              <div className="mb-2">
                  {errors.streetNumber && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.streetNumber}
                  </span>
                  )}
              </div>
          </div>

          <div className="mb-5">
            <label>Floor Number: </label>
            <input
              type="number"
              name="floorNumber"
              value={values.floorNumber}
              onChange={handleChange}
            />
              <div className="mb-2">
                  {errors.floorNumber && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.floorNumber}
                  </span>
                  )}
              </div>
          </div>

          <div className="mb-5">
            <label>Apartment Number: </label>
            <input
              type="number"
              name="aptNumber"
              value={values.aptNumber}
              onChange={handleChange}
            />
          <div className="mb-2">
                  {errors.aptNumber && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.aptNumber}
                  </span>
                  )}
              </div>
          </div>

          <div className="mb-5">
            <label>Price: </label>
            <input
              type="number"
              name="price"
              value={values.price}
              onChange={handleChange}
            />
              <div className="mb-2">
                  {errors.price && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.price}
                  </span>
                  )}
              </div>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-bold mb-2">Description: </label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              className="border p-2 w-full rounded-lg"
            />
              <div className="mb-2">
                  {errors.description && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.description}
                  </span>
                  )}
              </div>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-bold mb-2">Image: </label>
            <input
              type="text"
              name="images"
              onChange={(e) => handleImages(e)}
              className="border p-2 w-full rounded-lg"
            />
              <div className="mb-2">
                  {errors.images && (
                  <span className="text-red-500 text-sm"
                  >
                      {errors.images}
                  </span>
                  )}
              </div>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-500 rounded-lg"
            onClick={handleSubmit}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )

}