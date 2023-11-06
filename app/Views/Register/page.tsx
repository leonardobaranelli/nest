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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>Autenticación</h1>
      {isAuthenticated ? (
        <div>          
          {/* {registrationSuccess && <p>¡Registro exitoso! Puedes iniciar sesión ahora.</p>} */}
          <Link href="../../Views/Login">¡Registro exitoso! Puedes iniciar sesión haciendo click aqui</Link>
        </div>
      ) : (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', width: '100%' }}>
          <label>
            First Name:
            <input type="text" name="firstName" value={fields.firstName} onChange={handleChange} />
            {errors.firstName && <p>{errors.firstName}</p>}
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={fields.lastName} onChange={handleChange} />
            {errors.lastName && <p>{errors.lastName}</p>}
          </label>       
          <label>
            Username:
            <input type="text" name="username" value={fields.username} onChange={handleChange} />
            {errors.username && <p>{errors.username}</p>}
          </label>
          <label>
            Email:
            <input type="email" name="email" value={fields.email} onChange={handleChange} />
            {errors.email && <p>{errors.email}</p>}
          </label>
          <label>
            Password:
            <input type="password" name="password" value={fields.password} onChange={handleChange} />
            {errors.password && <p>{errors.password}</p>}
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={handleRegister}>Registrarse</button>
          </div>
        </form>
      )}      
    </div>
  );
};

export default Register;