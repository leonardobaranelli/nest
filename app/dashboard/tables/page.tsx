"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import Alquiler from "../components/Tables/Alquiler";
import Venta from "../components/Tables/Venta";
import Usuarios from "../components/Tables/Usuarios";
import { useState } from "react";
import { authenticateUserWithTokenAsync } from "../../../redux/features/UserSlice";
import { AppDispatch, RootState } from "../../../redux/store";

const TablesPage = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch()
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.user);
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) dispatch(authenticateUserWithTokenAsync(user.keys));
    if (user.user?.rol !== "admin") {
      router.push("/notfound");
    } else {
      setShow(true);
    }
  }, [isAuthenticated, user.keys]);

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
