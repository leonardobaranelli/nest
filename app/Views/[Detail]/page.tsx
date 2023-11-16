"use client";
import React, { SyntheticEvent } from "react";
import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetPostQuery } from "@/redux/services/api";
 
import Navbar from "@/app/components/Navbar/Navbar";

import Swal from "sweetalert2";
import { Post } from "@/redux/services/getPost";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import ReviewForm from '../../components/ReviewForm/ReviewForm'
import ScoreComponent from "@/app/components/ReviewCards/ReviewCards";
import { ChangeEvent } from "react";
import axios from "axios";

export interface ReviewData {
  type: string,
  feedBack: string,
  score: number,
  postId: string,
}

function Detail() {

  const { Detail } = useParams<{ Detail: string }>();

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/createStripeCS`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: property?.title,
          price: Number(property?.price) * 100,
          currency: 'usd',
          postId: property?.id,
        }),
      });
  
      const { sessionId } = await response.json();      
  
      const stripeApiKey = process.env.NEXT_PUBLIC_STRIPE_API_KEY ?? '';
      const stripe = await loadStripe(stripeApiKey);
  
      if (!stripe) {
        console.error('Error al cargar la instancia de Stripe');
        return;
      }
  
      const result = await stripe.redirectToCheckout({ sessionId });
  
      if (result?.error) {
        console.error('Error al redirigir a checkout:', result.error.message);
      } else {
        console.log('Redirigiendo al pago desde el backend...');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };

  if (!property) {
    return <div className="text-center justify-center">Loading..</div>;
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
    <div className="flex flex-col lg:gap-24">
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col bg-[#c8a9a435] p-5 items-center border border-gray-200 rounded-lg shadow lg:flex-row lg:p-12">
          <div id="animation-carousel" className="relative w-full" data-carousel="static">
            <div className="grid gap-3 justify-center">
              {/* La primera imagen en tamaño grande */}
              <div>               
                <img id="largeImage" className="h-auto max-w-full rounded-lg" src={property.images[0]} alt="" />
              </div>
              {/* Las dos imágenes restantes en tamaño más pequeño */}
              <div className="flex gap-10">
                {property.images[1] &&                 
                <div>
                  <img id="smallImage1" className="rounded-lg cursor-pointer lg:h-24 w-24" src={property.images[1]} alt="" onClick={() => swapImages(1)} />
                </div>}
                {property.images[2] &&
                <div>
                  <img id="smallImage2" className="rounded-lg cursor-pointer lg:h-24 w-24" src={property.images[2]} alt="" onClick={() => swapImages(2)} />
                </div>
                }
              </div>                
            </div>
          </div>            
            <div className="flex flex-col justify-between p-4 leading-normal text-center w-full">
                <h4 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">{property.title}</h4>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">${property.price}</h5>
                <p className="mb-3 font-normal text-gray-700">{property.description}</p>
                <p>{property.condition === "sell" ? "En Venta" : "En Alquiler"}</p>
                
                <p>Locacion: {property.country} {property.city}</p>
                <p>Domicilio: {property.streetName} {property.streetNumber} {property.aptNumber}</p>
                <div className="py-4 mt-7">
                  {/* Añadido el formulario para el botón de reserva */}
{/*                   <form action="#" method="POST">
                    <button type="submit" onClick={handleReserv} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Reservar</button>
                  </form> */}
                  {property.available ? (
                    <form action="#" method="POST">
                      <button
                        type="submit"
                        onClick={handleReserv}
                        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Reservar
                      </button>
                    </form>
                  ) : (
                    <p className="text-red-700">Reservado</p>
                  )}
                </div>
            </div>
        </div>
  
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal text-center w-full">
                    {/* Otras partes del detalle del post */}
                    <h2 className="mt-10 text-3xl font-bold text-pink-600 mb-6">Reseñas</h2>
                  <ScoreComponent postId={property.id}/>
                  {property && <ReviewForm postId={property.id} />}
            </div>
    </div>
  );
}
export default Detail;