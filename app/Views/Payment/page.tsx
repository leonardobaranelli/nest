"use client";

import { useEffect } from 'react';
import axios from "axios"
import Link from 'next/link';
import { useRouter } from "next/navigation";

const Payment = () => {
  const router = useRouter();
  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {        
        const urlSearchParams = new URLSearchParams(window.location.search);
        const postId = urlSearchParams.get('postId');        
        
        router.push("/Views/home") 
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}`, {
            available: false,
        });        
      } catch (error) {
        console.error('Error al obtener información de pago:', error);
      }
    };

    fetchPaymentInfo();
  }, []);

  return (
    <div className="text-center justify-center">
      <p className="text-center justify-center">¡Compra finalizada con éxito! Redirigiendo al Home</p>
    </div>
  );
};

export default Payment;
