"use client";

import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import validate from "@/app/Handlers/validation";
import axios from "axios";
import Swal from "sweetalert2"
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from "@/app/components/Navbar/Navbar";
import Image from 'next/image';
import Link from 'next/link';

export default function Formulario() {
  //Estados
  const [focused, setFocused] = useState(null);
  
  const [files, setFile] = useState([]);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    days: "",
    condition: "",
    type:"",
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
  
  //Dropzone
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: (files) => {
      // Aquí puedes manejar las imágenes aceptadas
      handleImages(files);
    }
  });

  //Disable
  const disable = () => {
    for (let error in errors) {
      if (errors[error] !== "" && errors[error].length !== 0) {
          // Si encuentra un campo con error, habilita el botón
          return true;
      }
  }
  // Si no encuentra ningún campo con error, deshabilita el botón
  return false;
};


  //Handlers
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

  const handleImages = async (files) => {
    const promises = files.map(async (file) => {
        const formFile = new FormData();
        formFile.append('files', file);

        try {
            const response = await axios.post("http://localhost:3001/posts/upload", formFile);
            return response.data;
        } catch (error) {
            console.error("Error al realizar la solicitud POST:", error);
            throw error; // Propaga el error para que sea manejado en el bloque catch externo
        }
    });

    try {
        const newImages = await Promise.all(promises);

        setValues((prevValues) => ({
            ...prevValues,
            images: [...prevValues.images, ...newImages],
        }));

        setErrors(
            validate({
                ...values,
                images: [...values.images, ...newImages],
            })
        );
    } catch (error) {
        // Maneja el error de manera adecuada, si es necesario
        console.error(error)
    }
};


  const handleSubmit = async (event) => {
    console.log(event.target.files)
    event.preventDefault();
    const formErrors = validate(values);
    setErrors(formErrors);
    try {
      const response = await axios.post("http://localhost:3001/posts", values);

      console.log("respuesta de la solicitud post:",response.data)

      if (response.status === 200 || response.status === 201) {
          // Verifica el contenido de la respuesta
          if (response.data && response.data.id) {
              Swal.fire({
                  icon: 'success',
                  title: 'Creado con Éxito',
                  showConfirmButton: false,
                  timer: 1500
              });
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Error al Crear',
                  showConfirmButton: false,
                  timer: 1500
              });
          }
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Error al Crear',
              showConfirmButton: false,
              timer: 1500
          });
      }
  } catch (error) {

      console.error("Error al realizar la solicitud POST:", error);

      // Aquí puedes agregar un manejo de errores más específico si es necesario

      Swal.fire({
          icon: 'error',
          title: 'Error al Crear',
          showConfirmButton: false,
          timer: 1500
      });
  }
}


  useEffect(() => {
  }, []);

  return (
    <div>
    <div className=" p-4 bg-[#fc9a84]">
      <nav className=" flex items-center justify-between sm:h-10">
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
          <Link href="../../Views/home" className="font-medium text-gray-500 hover:text-gray-900">
              Home

            </Link>
            <Link
              href="../../Views/Buy"
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Venta
            </Link>
            <Link
              href="../../Views/Rent"
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Alquiler
            </Link>
            <Link
              href="../../Views/Login"
              className=" font-medium text-indigo-600 rounded-full py-2 pl-3 pr-4 hover:bg-yellow-400"
            >
              Log in
            </Link>
          </div>
      </nav>
    </div>

    <div className="flex items-center justify-center min-h-screen p-5 md:p-10 mt-0 z-10">

    <div className="md:flex md:items-center z-10">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-100 p-5 md:p-5 rounded-lg shadow-md max-w-3x1 z-10"
        onSubmit={(e) => handleSubmit(e)}
      >
    <div className="mb-5">
    <label className="block text-gray-800 font-bold mb-2">Título: </label>
    <input
      type="text"
      name="title"
      value={values.title}
      onChange={handleChange}
      onFocus={() => setFocused('title')} 
      onBlur={() => setFocused(null)}
      className="border-2 border-gray-300 p-2 w-3/4 rounded-lg"
    />
    <div className="mb-2">
      {errors.title && focused === 'title' && (
        <span className="text-red-500 text-sm">{errors.title}</span>
      )}
    </div>
    </div>

    <div className="mb-5">
    <label className="block text-gray-700 font-bold mb-2">Condicion: </label>
    <div className="relative">
      <select
        name="type"
        value={values.type}
        onChange={handleChange}
        className="border-2 border-gray-300 p-2 w-2/4 rounded-lg"
        onFocus={() => setFocused('type')} 
        onBlur={() => setFocused(null)}
      >
        <option value="empty"></option>
        <option value="rent">Rent</option>
        <option value="sale">Sale</option>
      </select>
    </div>
    <div className="mb-2">
      {errors.type && focused === "type" && (
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
      onFocus={() => setFocused('days')} 
      onBlur={() => setFocused(null)}
      className="border-2 border-gray-300 p-2 w-2/4 rounded-lg"
    />
    <div className="mb-2">
      {errors.days && focused === "days" &&(
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
      onFocus={() => setFocused('country')} 
      onBlur={() => setFocused(null)}
      className="border-2 border-gray-300 p-2 w-2/4 rounded-lg"
    />
    <div className="mb-2">
      {errors.country && focused === "country" &&(
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
      onFocus={() => setFocused('city')} 
      onBlur={() => setFocused(null)}
      className="border-2 border-gray-300 p-2 w-3/4 rounded-lg"
    />
    <div className="mb-2">
      {errors.city && focused === "city" &&(
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
      onFocus={() => setFocused('streetName')} 
      onBlur={() => setFocused(null)}
      className="border-2 border-gray-300 p-2 w-3/4 rounded-lg"
    />
    <div className="mb-2">
      {errors.streetName && focused === "streetName" &&(
        <span className="text-red-500 text-sm">{errors.streetName}</span>
      )}
    </div>
    </div>

    <div className="mb-5">
    <label>Número de calle: </label>
    <input
      type="number"
      name="streetNumber"
      value={values.streetNumber}
      onChange={handleChange}
      onFocus={() => setFocused('streetNumber')} 
      onBlur={() => setFocused(null)}
      className="border-2 border-gray-300 p-2 w-2/4 rounded-lg"
    />
    <div className="mb-2">
      {errors.streetNumber && focused === "streetNumber" &&(
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
      className="border-2 border-gray-300 p-2 w-2/4 rounded-lg"
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
      className="border-2 border-gray-300 p-2 w-3/4 rounded-lg"
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
      step="0.01" 
      min="0"
      max="999999999999999" 
      value={values.price}
      onChange={handleChange}
      onFocus={() => setFocused('price')} 
      onBlur={() => setFocused(null)}
      
      className="border-2 border-gray-300 p-2 w-3/4 rounded-lg"
    />
    <div className="mb-2">
      {errors.price && focused === "price" &&(
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
      onFocus={() => setFocused('description')} 
      onBlur={() => setFocused(null)}
      className="border p-2 w-3/4 rounded-lg"
    />
    <div className="mb-2">
      {errors.description && focused === "description" &&(
        <span className="text-red-500 text-sm">{errors.description}</span>
      )}
    </div>
    </div>
    <div className="mb-5">
    <label className="block text-gray-700 font-bold mb-2">Imagen: </label>
    <div
      {...getRootProps()}
      className={`border p-5 w-full rounded-lg ${isDragActive ? 'bg-gray-100' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      <input {...getInputProps()} onFocus={() => setFocused('images')} 
      onBlur={() => setFocused(null)} className="border p-2 w-1/4 rounded-lg"/>
      <div className="text-center">
        <FontAwesomeIcon icon={faCloudUploadAlt} size="2x" color="#718096" />
        <p className="mt-2">
          {isDragActive ? 'Suelta las imágenes aquí' : 'Arrastra y suelta imágenes o haz clic para seleccionarlas'}
        </p>
      </div>
    </div>
    <div className="mb-2">
      {acceptedFiles.length > 0 && (
        <span className="text-green-500 text-sm">
          {acceptedFiles.length} imagen{acceptedFiles.length > 1 ? 'es' : ''} seleccionada{acceptedFiles.length > 1 ? 's' : ''}
        </span>
      )}
    </div>
    <div className="mb-2">
      {acceptedFiles.length === 0 && errors.image && focused === "images" && (
        <span className="text-red-500 text-sm">{errors.images}</span>
      )}
    </div>
    <div className="mb-5 z-10">
      <button
        type="submit"
        className="button_lg bg-[#fc9a84] text-white py-3 px-6 md:px-16 rounded-lg hover:bg-[#fc9a74] transition-all duration-300 mt-0 md:mt-0 ml-2 mb-0 z-10 relative overflow-hidden focus:outline-none text-lg md:text-xl"
        onClick={handleSubmit}
        disabled={disable()}
      >

        <span className="button_text">Crear</span>
        <span className="button_sl"></span>

      </button>
      </div>
    </div>
    </form>
    </div>
    </div> 
        </div>

  );
}
