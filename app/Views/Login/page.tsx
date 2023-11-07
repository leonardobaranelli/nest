"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { loginUserAsync, logout } from "../../../redux/features/UserSlice";
import Link from "next/link";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoginError(null);
      const response = await dispatch(loginUserAsync({
        email,
        password,
      }));
      console.log(response);
    } catch (error) {
      setLoginError((error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Error desconocido");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      {isAuthenticated ? (
        <div>
          <p>¡Inicio de sesión exitoso!</p>
          <Link href="/Views/home">Ir al Home</Link>
          {/* <button onClick={handleLogout}>Cerrar sesión</button> */}
        </div>
      ) : (
        <div className="card px-8 py-6 rounded-lg bg-[#a65523c1] w-72">
          <h2 className="text-center font-bold text-3xl text-white">Iniciar Sesión</h2>
          <form className="my-6" /* style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', width: '100%' }} */>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 my-2 rounded w-[100%] focus:outline-blue-600" />
            </label>
            <label>
              Contraseña:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 my-2 rounded w-[100%] focus:outline-blue-600" />
            </label>
            <div className="flex justify-between">
              <button type="button" onClick={handleLogin}>Iniciar sesión</button>
              <Link href="../../Views/Register" passHref>
                <button type="button" >Registrarse</button>
              </Link>
            </div>
            <div>
              <a href="https://nest-refj.onrender.com/auth/google" className="flex justify-center items-center mt-5 border rounded-3xl"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" /><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" /><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" /><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" /></svg>Ingresar con Google</a>
            </div>
          </form>
        </div>
      )}
      {loginError && <p>Error en el inicio de sesión: {loginError}</p>}
    </div>
  );
};

export default Login;