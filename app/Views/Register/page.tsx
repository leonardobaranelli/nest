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
          </form>
        </div>
      )}      
    </div>
  );
};

export default Register;