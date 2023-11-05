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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
  <h1>Autenticación</h1>
  
  {isAuthenticated ? (
    <div>
      <p>¡Inicio de sesión exitoso!</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  ) : (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', width: '100%' }}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="button" onClick={handleLogin}>Iniciar sesión</button>
        <Link href="../../Views/Register" passHref>
              <button type="button" >Registrarse</button>
        </Link>     
      </div>
    </form>
  )}  
  {loginError && <p>Error en el inicio de sesión: {loginError}</p>}
</div>
  );
};

export default Login;