import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Definición del tipo de dato para objetos de usuario
type User = {
  id: number;
  name: string;
  email: number;
};

// Creación del conjunto de herramientas de Redux Toolkit Query para la API
export const userApi = createApi({
  // Nombre del slice de Redux
  reducerPath: "userApi",
  // Refrescar los datos cuando la aplicación vuelve a enfocarse
  refetchOnFocus: true, 
  // Configuración de la función base para las solicitudes HTTP
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:3001", // URL base de la API
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
export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;

