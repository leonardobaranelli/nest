"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Header from "../components/Header/Header";
import Alquiler from "../components/Tables/Alquiler";
import Venta from "../components/Tables/Venta";
import Usuarios from "../components/Tables/Usuarios";
import { useState } from "react";

const TablesPage = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userRol = useSelector((state: RootState) => state.user?.rol.rol);
  const [show, setShow] = useState(false);
  useEffect(() => {
    console.log(userRol, isAuthenticated);
    
    if (userRol !== "admin") {
      router.push("/notfound");
    }
    if (isAuthenticated && userRol === "admin") setShow(true);
  }, [isAuthenticated, userRol]);

  if (show) {
    return (
      <>
        <Header />
        <div className="flex flex-col gap-10">
          <Alquiler />
          <Venta />
          <Usuarios />
        </div>
      </>
    );
  }
};

export default TablesPage;
