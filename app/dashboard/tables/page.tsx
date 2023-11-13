"use client";
import {useState} from "react"
import Alquiler from "../components/Tables/Alquiler";
import Venta from "../components/Tables/Venta";
import Usuarios from "../components/Tables/Usuarios";
import Header from "../components/Header/Header";

const TablesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  return (
    <>
      <Header/>
      <div className="flex flex-col gap-10">
        <Alquiler />
        <Venta />
        {/* <Usuarios /> */}
      </div>
    </>
  );
};

export default TablesPage;
