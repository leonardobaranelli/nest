"use client";
import React, { SyntheticEvent } from "react";
import { useRouter } from 'next/navigation';
import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import validate from "@/app/Handlers/validation";
import axios from "axios";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/app/components/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent } from "react";
import { Post } from "@/redux/services/getPost";
import { error } from "console";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";

export interface Errors {
  days: string;
  condition: string;
  type: string;
  images: string[];
  title: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string | number;
  floorNumber: string | number;
  aptNumber: string | number;
  price: string | number;
  description: string;
  [key: string]: string | string[] | number | null;
}

export interface Values {
  days: number | null;
  type: string;
  condition: string;
  title: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  floorNumber: number;
  aptNumber: number;
  price: number;
  description: string;
  images: string[];
}

export default function Formulario() {
  //Estados

  const [focused, setFocused] = useState<string | null>(null);

  const [files, setFile] = useState([]);
  const [errors, setErrors] = useState<Errors>({
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
  const [values, setValues] = useState<Values>({
    days: null,
    condition: "",
    type: "",
    images: [],
    title: "",
    country: "",
    city: "",
    streetName: "",
    streetNumber: "",
    floorNumber: 0,
    aptNumber: 0,
    price: 0,
    description: "",
  });

  //Dropzone
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
      },
      multiple: true,
      onDrop: (files) => {
        // Aquí puedes manejar las imágenes aceptadas
        handleImages(files);
      },
    });

  //Disable

  const disable = (errors: Errors): boolean => {
    for (let fieldName in errors) {
      const errorValue = errors[fieldName];
      if (typeof errorValue === "string" && errorValue.length !== 0) {
        // Si es una cadena y no está vacía, habilita el botón
        return true;
      }
    }
    // Si no encuentra ningún campo con error, deshabilita el botón
    return false;
  };
  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors(
      validate({
        ...values,
        [event.target.name]: event.target.value,
      })
    );
  }

  //Handlers
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    // Solo aplica parseInt en campos numéricos
    if (["days", "floorNumber", "aptNumber", "price"].includes(name)) {
      setValues({
        ...values,
        [name]: value === "" ? null : parseInt(value, 10),
      });
    } else {
      setValues({ ...values, [name]: value });
    }
    setErrors(
      validate({
        ...values,
        [event.target.name]: value,
      })
    );
  }

  async function handleImages(files: File[]): Promise<void> {
    try {
      const newImages = await Promise.all(
        files.map(async (file) => {
          const formFile = new FormData();
          formFile.append("files", file);
          let response: AxiosResponse;
  
          try {
            response = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/upload`,
              formFile
            );
            return response.data; // Asume que newImages es una matriz de cualquier tipo, ya que no proporcionaste información sobre su tipo.
          } catch (error) {
            console.error("Error al realizar la solicitud POST:", error);
            throw error; // Propaga el error para que sea manejado en el bloque catch externo
          }
        })
      );

      console.log(newImages)
  
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
      console.error(error);
    }
  }

  type ValidateFunction = (input: Post) => Errors;

  // Define el tipo para la función handleSubmit
  type SubmitFunction = (
    event: SyntheticEvent,
    values: Values
  ) => Promise<void>;

  const handleSubmit: SubmitFunction = async (event, values) => {
    event.preventDefault();
    const formErrors = validate(values);
    setErrors(formErrors);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, values);

      console.log("respuesta de la solicitud post:", response.data);

      if (response.status === 200 || response.status === 201) {
        // Verifica el contenido de la respuesta
        if (response.data && response.data.id) {
          Swal.fire({
            icon: "success",
            title: "Creado con Éxito",
            showConfirmButton: false,
            timer: 1500,
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

      // Aquí puedes agregar un manejo de errores más específico si es necesario

      Swal.fire({
        icon: "error",
        title: "Error al Crear",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  useEffect(() => {
    // const storedToken = localStorage.getItem("token");
    // if (storedToken) {
    //   dispatch(storedToken);
    // }
  }, []);

  if (isAuthenticated) {return (


  useEffect(() => {}, []);

  // useEffect(() => {
  //   // veo  si  hay  algo en  el  local 
  //       const dataInLocalStorage = localStorage.getItem('user');
    
  //       if (dataInLocalStorage) {
  //         console.log("esto es ellocal storage:", dataInLocalStorage);
  //       } else {
  //         console.log("Holis");
  //       }
  //     }, []); 
    
  //     if (!localStorage.getItem('tuClave')) {
  //       return null; 
  //       // si  no  hay  nada  no renderiza nada 
  //       // aqui  tien  que  renderizar un  componente  que  te mande  a  otro lado 
    
  //     }

  return (

    <div>
      <div className=" p-4 bg-[#fc9a84]">
        <nav className=" flex items-center justify-between sm:h-10">
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            <Link
              href="../../Views/home"
              className="font-medium text-gray-500 hover:text-gray-900"
            >
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
              href=""
              className=" font-medium text-indigo-600 hover:text-indigo-500"
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
            onSubmit={(e) => handleSubmit(e, values)}
          >
            <div className="mb-5">
              <label className="block text-gray-800 font-bold mb-2">
                Título:{" "}
              </label>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onFocus={() => setFocused("title")}
                onBlur={() => setFocused(null)}
                className="border-2 border-gray-300 p-2 w-3/4 rounded-lg"
              />
              <div className="mb-2">
                {errors.title && focused === "title" && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-bold mb-2">
                Condicion:{" "}
              </label>
              <div className="relative">
                <select
                  name="type"
                  value={values.type}
                  onChange={handleSelectChange}
                  className="border-2 border-gray-300 p-2 w-2/4 rounded-lg"
                  onFocus={() => setFocused("type")}
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
                value={values.days !== null ? values.days.toString() : ""}
                onChange={handleChange}
                onFocus={() => setFocused("days")}
                className="border-2 border-gray-300 p-2 w-2/4 rounded-lg"
                onBlur={() => setFocused(null)}
              />

              <div className="mb-2">
                {errors.days && focused === "days" && (
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
                onFocus={() => setFocused("country")}
                onBlur={() => setFocused(null)}
                className="border-2 border-gray-300 p-2 w-2/4 rounded-lg"
              />
              <div className="mb-2">
                {errors.country && focused === "country" && (
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
                onFocus={() => setFocused("city")}
                onBlur={() => setFocused(null)}
                className="border-2 border-gray-300 p-2 w-3/4 rounded-lg"
              />
              <div className="mb-2">
                {errors.city && focused === "city" && (
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
                onFocus={() => setFocused("streetName")}
                onBlur={() => setFocused(null)}
                className="border-2 border-gray-300 p-2 w-3/4 rounded-lg"
              />
              <div className="mb-2">
                {errors.streetName && focused === "streetName" && (
                  <span className="text-red-500 text-sm">
                    {errors.streetName}
                  </span>
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
                onFocus={() => setFocused("streetNumber")}
                onBlur={() => setFocused(null)}
                className="border-2 border-gray-300 p-2 w-2/4 rounded-lg"
              />
              <div className="mb-2">
                {errors.streetNumber && focused === "streetNumber" && (
                  <span className="text-red-500 text-sm">
                    {errors.streetNumber}
                  </span>
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
                  <span className="text-red-500 text-sm">
                    {errors.floorNumber}
                  </span>
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
                  <span className="text-red-500 text-sm">
                    {errors.aptNumber}
                  </span>
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
                onFocus={() => setFocused("price")}
                onBlur={() => setFocused(null)}
                className="border-2 border-gray-300 p-2 w-3/4 rounded-lg"
              />
              <div className="mb-2">
                {errors.price && focused === "price" && (
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
                onFocus={() => setFocused("description")}
                onBlur={() => setFocused(null)}
                className="border p-2 w-3/4 rounded-lg"
              />
              <div className="mb-2">
                {errors.description && focused === "description" && (
                  <span className="text-red-500 text-sm">
                    {errors.description}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 font-bold mb-2">
                Imagen:{" "}
              </label>
              <div
                {...getRootProps()}
                className={`border p-5 w-full rounded-lg ${
                  isDragActive ? "bg-gray-100" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                <input
                  {...getInputProps()}
                  onFocus={() => setFocused("images")}
                  onBlur={() => setFocused(null)}
                  className="border p-2 w-1/4 rounded-lg"
                />
                <div className="text-center">
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    size="2x"
                    color="#718096"
                  />
                  <p className="mt-2">
                    {isDragActive
                      ? "Suelta las imágenes aquí"
                      : "Arrastra y suelta imágenes o haz clic para seleccionarlas"}
                  </p>
                </div>
              </div>
              <div className="mb-2">
                {acceptedFiles.length > 0 && (
                  <span className="text-green-500 text-sm">
                    {acceptedFiles.length} imagen
                    {acceptedFiles.length > 1 ? "es" : ""} seleccionada
                    {acceptedFiles.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="mb-2">
                {acceptedFiles.length === 0 &&
                  errors.image &&
                  focused === "images" && (
                    <span className="text-red-500 text-sm">
                      {errors.images}
                    </span>
                  )}
              </div>
              <div className="mb-5 z-10">
                <button
                  type="submit"
                  className="button_lg bg-[#fc9a84] text-white py-3 px-6 md:px-16 rounded-lg hover:bg-[#fc9a74] transition-all duration-300 mt-0 md:mt-0 ml-2 mb-0 z-10 relative overflow-hidden focus:outline-none text-lg md:text-xl"
                  //disabled={disable(errors)}
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
} else {
  const router = useRouter();
  router.push('/Views/Login');
}} 
