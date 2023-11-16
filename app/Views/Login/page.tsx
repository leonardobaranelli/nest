"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { loginUserAsync, authenticateUserWithTokenAsync, logout } from "../../../redux/features/UserSlice";
import { useUserVerifyQuery } from "@/redux/services/authentication";
import Cookie from "js-cookie";
import Link from "next/link";
import axios from 'axios';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const keys = useSelector((state: RootState) => state.user.keys);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = () => {
    try {
      setLoginError(null);
      dispatch(loginUserAsync({
        email,
        password,
      }));
    } catch (error) {
      setLoginError((error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Error desconocido");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isAuthenticated) {
      if(keys) dispatch(authenticateUserWithTokenAsync());
      else {
        let cookieTkn = Cookie.get('token');
        let cookieMail = Cookie.get('email');
        if(cookieTkn && cookieMail)
          dispatch(authenticateUserWithTokenAsync({ email: cookieMail, token: cookieTkn }));
      }
    }
  }, [isAuthenticated, keys]);
  
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Log In</h1>

      {isAuthenticated ? (
        <div>
          <p>¡Inicio de sesión exitoso!</p>
          <Link href="/Views/home">Ir al Home</Link>
          {/* <button onClick={handleLogout}>Cerrar sesión</button> */}
        </div>
      ) : (
        <form className="space-y-4 max-w-md mx-auto mt-8">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />
              </div>
              <button
                  type="button"
                  onClick={handleLogin}
                  className="inline-block rounded-lg bg-blue-500 px-12 py-3 text-lg font-medium text-white"
                >
                  Iniciar sesión
                </button>

             
                <div className="items-center justify-between">
                  <p className="text-sm text-gray-500">
                   No tienes cuenta?</p>
                  <Link href="../../Views/Register" passHref>
                    <p className="underline cursor-pointer">Regístrate</p>
                  </Link> 
                </div>  
           
              <div className="flex justify-center items-center">
                    <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`} className="flex justify-center items-center mt-5 border rounded-3xl"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" /><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" /><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" /><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" /></svg>Ingresar con Google</a>
                    {/* <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`} onClick={handleLogGoogle}>

                    // Ingresar con Google
                    // </a> */}

                    {/* <button onClick={handleLogGoogle}>
                        Ingresar con Google
                    </button> */}
              </div>   
          </form>
       )}

       {loginError && <p className="text-red-500">Error en el inicio de sesión: {loginError}</p>}
     </div>
   </div>

   <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
     <img
       alt="Welcome"
       src="https://www.skolskenoviny.sk/wp-content/uploads/2021/07/immo2.png.webp"
       className="absolute inset-0 h-full w-full object-cover"
     />
   </div>
 </section>
);
};


export default Login;