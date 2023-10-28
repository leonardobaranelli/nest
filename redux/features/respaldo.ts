/*
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
    days: number | null;
    type: string;
    condition: string;
    image: string[];
    title: string;
    country: string;
    city: string;
    streetName: string;
    streetNumber: string;
    floorNumber: string;
    aptNumber: string;
    price: number;
    description: string;
}

//este  es  el  punto  de conexion de la api este punto es de todo lo que sea posts/conditional
export const postsApi = createApi({
    reducerPath: "postsApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    endpoints: (builder) => ({
        getPostsByCondition: builder.query<Post[], string>({
            query: (condition) => `posts/condition/${condition}`,  
        }),
    }),
});

export const { useGetPostsByConditionQuery } = postsApi;
*/