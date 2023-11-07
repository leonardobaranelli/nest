"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { registerUserAsync, setUserStatus } from "../../../redux/features/UserSlice";
import { validate } from "./validate";
import Link from "next/link";
import Cookies from "js-cookie";

const Register: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  //const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  //useEffect(() => {
    //const router = require("next/router");

    //if (isAuthenticated) {
      // const redirectTimeout = setTimeout(() => {
      //   router.default.push("/Views/Login");
      // }, 3000);
      // return () => clearTimeout(redirectTimeout);
    //}
  //}, [isAuthenticated, dispatch]); 


  const handleRegister = async () => {
    setErrors(validate(fields));
    if (Object.keys(errors).length === 0) {
      try {
        const resultAction = await dispatch(registerUserAsync(fields));

        if (registerUserAsync.fulfilled.match(resultAction)) {
          const cookies = resultAction.payload.cookies;
          const responseData = resultAction.payload.responseData;
        
          console.log(responseData);
          console.log(cookies);
        
          dispatch(setUserStatus({ isAuthenticated: true, user: responseData }));        
          //setRegistrationSuccess(true);
        } else if (registerUserAsync.rejected.match(resultAction)) {
          console.error("Error en el registro:", resultAction.error);
        }
      } catch (error) {
        console.error("Error en el registro:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    setFields({ ...fields, [name]: trimmedValue });
    setErrors(validate({ ...fields, [name]: trimmedValue }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isAuthenticated ? (
        <div>          
          {/* {registrationSuccess && <p>¡Registro exitoso! Puedes iniciar sesión ahora.</p>} */}
          <Link href="../../Views/Login">¡Registro exitoso! Puedes iniciar sesión haciendo click aqui</Link>
        </div>
      ) : (
        <div className="card px-8 py-6 rounded-lg bg-[#a65523c1] w-72">
          <h2 className="text-center font-bold text-3xl text-white">Registrarse</h2>
          <form className="my-6">
            <label>
              First Name:
              <input type="text" name="firstName" value={fields.firstName} onChange={handleChange} className="p-2 my-2 rounded w-[100%] focus:outline-blue-600"/>
              {errors.firstName && <p className="text-red-600">{errors.firstName}</p>}
            </label>
            <label>
              Last Name:
              <input type="text" name="lastName" value={fields.lastName} onChange={handleChange} className="p-2 my-2 rounded w-[100%] focus:outline-blue-600"/>
              {errors.lastName && <p className="text-red-600">{errors.lastName}</p>}
            </label>       
            <label>
              Username:
              <input type="text" name="username" value={fields.username} onChange={handleChange} className="p-2 my-2 rounded w-[100%] focus:outline-blue-600"/>
              {errors.username && <p className="text-red-600">{errors.username}</p>}
            </label>
            <label>
              Email:
              <input type="email" name="email" value={fields.email} onChange={handleChange} className="p-2 my-2 rounded w-[100%] focus:outline-blue-600"/>
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </label>
            <label>
              Password:
              <input type="password" name="password" value={fields.password} onChange={handleChange} className="p-2 my-2 rounded w-[100%] focus:outline-blue-600"/>
              {errors.password && <p className="text-red-600">{errors.password}</p>}
            </label>
            <div className="text-center pt-5">
              <button type="button" onClick={handleRegister}>Registrarse</button>
            </div>
            <div>
              <a href="http://localhost:3001/auth/google" className="flex justify-center items-center mt-5 border rounded-3xl"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>Registrarse con Google</a>
            </div>
          </form>
        </div>
      )}      
    </div>
  );
};

export default Register;