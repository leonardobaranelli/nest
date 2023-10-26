import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


type User = {
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
    baseUrl: "el punto", // URL base de la API
  }),
  // Definición de los puntos finales de la API
  endpoints: (builder) => ({
    // Consulta para obtener una lista de usuarios
    getUsers: builder.query<User[], null>({
      query: () => "users",
    }),
    // Consulta para obtener un usuario por su ID
    getUserById: builder.query<User, { id: string }>({
      query: ({ id }) => `users/${id}`,
    }),
  }),
});

// Exportación de los ganchos generados automáticamente para cada punto final
export const { useGetUsersQuery, useGetUserByIdQuery } = immovablesApi;
