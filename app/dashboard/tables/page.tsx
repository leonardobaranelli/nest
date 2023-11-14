'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Header from '../components/Header/Header';
import Alquiler from '../components/Tables/Alquiler';
import Venta from '../components/Tables/Venta';
import Usuarios from '../components/Tables/Usuarios';

const TablesPage = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {

    if (!isAuthenticated) {
      router.push('/Views/Login');
    }


    if (user?.rol !== 'admin') {
      router.push('/notfound');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || (user && user.rol !== 'admin')) {
    return null;
  }

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
};

export default TablesPage;
