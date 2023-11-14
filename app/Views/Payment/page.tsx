"use client";

import { useEffect } from 'react';
import axios from "axios"
import Link from 'next/link';

const Payment = () => {
  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {        
        const urlSearchParams = new URLSearchParams(window.location.search);
        const postId = urlSearchParams.get('postId');        
        
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
    <div>
      
      <Link href="../../">¡Compra finalizada con éxito! click aquí para ir a home</Link>
      
    </div>
  );
};

export default Payment;
