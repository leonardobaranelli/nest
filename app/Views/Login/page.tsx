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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 my-2 rounded w-[100%] focus:outline-blue-600"/>
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 my-2 rounded w-[100%] focus:outline-blue-600"/>
        </label>
        <div className="flex justify-between">
          <button type="button" onClick={handleLogin}>Iniciar sesión</button>
          <Link href="../../Views/Register" passHref>
                <button type="button" >Registrarse</button>
          </Link>     
        </div>
      </form>
    </div>
  )}  
  {loginError && <p>Error en el inicio de sesión: {loginError}</p>}
</div>
  );
};

export default Login;