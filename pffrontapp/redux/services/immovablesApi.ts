import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


type Inmovalbles = {
  id: number;
  name: string;
  usuario:string
};

// Creación del conjunto de herramientas de Redux Toolkit Query para la API
export const immovablesApi = createApi({
  // Nombre del slice de Redux
  reducerPath: "userApi",
  // Refrescar los datos cuando la aplicación vuelve a enfocarse
  refetchOnFocus: true, 
  // Configuración de la función base para las solicitudes HTTP
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001 ", // URL base de la API
  }),
  // Definición de los puntos finales de la API
  endpoints: (builder) => ({
    // Consulta para obtener una lista de usuarios
    getInmovables: builder.query<Inmovalbles[], null>({
      query: () => "post",
    }),
    // Consulta para obtener un usuario por su ID
    getInmovablesById: builder.query<Inmovalbles, { id: string }>({
      query: ({ id }) => `post/${id}`,
    }),
  }),
});

// Exportación de los ganchos generados automáticamente para cada punto final
export const { useGetInmovablesQuery, useGetInmovablesByIdQuery } = immovablesApi;
