'use client'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Header from '../components/Header/Header';
import Alquiler from '../components/Tables/Alquiler';
import Venta from '../components/Tables/Venta';
import Usuarios from '../components/Tables/Usuarios';



const TablesPage = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user, 'Usuario')
  const router = useRouter();

  if (!isAuthenticated) {
  
    router.push('/Views/Login');
    return null; 
  }

  if (user?.rol !== 'admin') {
  
    //router.push('/notfound');
    return <>no se puede</>;
  }
  console.log("isAuthenticated.rol")
  // Usuario autenticado y es un administrador, mostrar la página de tablas
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
