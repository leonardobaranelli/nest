"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetPostQuery } from "@/redux/features/PostSlice";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import Swal from 'sweetalert2'
import { Post } from "@/redux/features/PostSlice";

const Detail = () => {


  const { Detail } = useParams<{Detail: string }>();
  const [property, setPropertyServer] = useState<Post | undefined>(undefined);  
  const { data } = useGetPostQuery(Detail);

  function swapImages(imageIndex: number) {
    const largeImage = document.getElementById("largeImage") as HTMLImageElement;
    const smallImage = document.getElementById(`smallImage${imageIndex}`) as HTMLImageElement;
  
    if (largeImage && smallImage) {
      const tempSrc = largeImage.src;
      largeImage.src = smallImage.src;
      smallImage.src = tempSrc;
    }
  }
  
  useEffect(() => {
    setPropertyServer(data);
  }, [data]);
  const stripePayment = async () => {
    
      try {                
        const response = await fetch('http://localhost:3001/payment/createStripeCS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: property?.title, price: Number(property?.price) * 100, currency: 'usd' }),
        });
        
        const { sessionId } = await response.json();        
        
        //const stripe = await loadStripe(process.env.STRIPE_API_KEY);    
        const stripe = await loadStripe('pk_test_51O7Lk5E3EgztbbKV6X267MvDtNptBoyO9IgVGszAyV7eeNGWnZopkkWSvhml1PEBUqCQRdDnvS3vVpuEexT7qEek00t8b9jX5J');    
        const result = await stripe?.redirectToCheckout({ sessionId });
        
        if (result?.error) {
          console.error(result.error.message);
        }
      } catch (error) {
        console.error('Error al procesar el pago:', error);
      }
  };

  if (!property) {
    return <div>Propiedad no encontrada</div>;
  }

const coinbasePayment = async (): Promise<void> => {
    try {
      const response = await fetch('https://api.commerce.coinbase.com/charges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': 'a0cd1092-9f2d-44db-9632-7e2202018936', 
          'X-CC-Version': '2018-03-22',
        },
        body: JSON.stringify({
          name: property.title,
          description: property.description,      
          pricing_type: 'fixed_price',
          local_price: {
            amount: property.price, 
            currency: 'USD',
          },
        }),
      });      
  
      const charge = await response.json();      
      if (response.ok) {        
          window.location.href = charge.data.hosted_url;
      } else {
        console.error('Error al crear la carga en Coinbase Commerce:', charge.errors);        
      }
    } catch (error) {
      console.error('Error al procesar el pago con Coinbase Commerce:', error);
    }
};

  const handleReserv = () => {
    Swal.fire({
      title: 'Con qué quieres reservar?',
      icon: 'question',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Tarjeta',
      confirmButtonColor: 'blue',
      denyButtonText: 'Criptomonedas',
      denyButtonColor: 'blue',
      cancelButtonText: 'Cancelar', 
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {        
        stripePayment();
      } else if (result.isDenied) {        
        coinbasePayment();
      } else if (result.dismiss === Swal.DismissReason.cancel) {        
        Swal.fire({
          title: 'Reserva cancelada',
          html: '<i class="fas fa-times-circle"></i> Has cancelado la reserva', 
          icon: 'error' 
        });      }
    });
  };

  return (
    <div>
      <div className="p-4 bg-[#fc9a84] flex items-center justify-around">
        <Link href="../../Views/home" className="font-medium text-gray-500 hover:text-gray-900">Home</Link>
      </div>
        <div className="flex justify-center" /* className="flex flex-row justify-center aling-center w-6/12 p-4 rounded-3xl shadow-md transform transition-transform duration-300 ease-in-out" */>
          <div className="flex gap-32 mt-11">
            <div id="animation-carousel" className="relative w-full" data-carousel="static">
              <div className="grid gap-3">
                {/* La primera imagen en tamaño grande */}
                <div>               
                  <img id="largeImage" className="h-auto max-w-full rounded-lg" src={property.images[0]} alt="" />
                </div>
                {/* Las dos imágenes restantes en tamaño más pequeño */}
                <div className="flex gap-10">
                  <div>
                    <img id="smallImage1" className="h-24 w-24 rounded-lg cursor-pointer" src={property.images[1]} alt="" onClick={() => swapImages(1)} />
                  </div>
                  <div>
                    <img id="smallImage2" className="h-24 w-24 rounded-lg cursor-pointer" src={property.images[2]} alt="" onClick={() => swapImages(2)} />
                  </div>
                </div>                
              </div>
            </div>

            <div>
              <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">
                Precio: ${property.price}
              </p>
              <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">
                Dias: {property.days}
              </p>
              <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
                Tipo: {property.type}
              </p>
              <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
                Condicion: {property.condition}
              </p>
              <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
                Locacion: {property.country} {property.city}
              </p>
              <p className="md:w-96 text-base leading-normal text-gray-600 dark:text-gray-300 mt-4">
                Domicilio: {property.streetName} {property.streetNumber} {property.aptNumber}
              </p>
              <p>Descripción: {property.description}</p>
                <div className="border-t border-b py-4 mt-7 border-gray-200">
                  {/* Añadido el formulario para el botón de reserva */}
                  <form action="#" method="POST" /* onSubmit={stripePayment} */>
                    <button type="submit" onClick={handleReserv}>Reservar</button>
                  </form>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Detail;