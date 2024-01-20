import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  userId: string;
  postId: string;
  images: string[];
  title: string;
  price: number;
}

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",

  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  

//   refetchOnFocus: true,
 

  endpoints: (builder) => ({
    getFavorites: builder.query<Post[], { userId: string }>({
      query: ({ userId }) => `/favorites/${userId}`,
    }),
    addFavorite: builder.mutation<void, Post>({
      query: (post) => ({
        url: '/favorites',
        method: 'POST',
        body: {
          userId: post.userId,
          postId: post.postId,
          images: post.images,
          title: post.title,
          price: post.price,
        },
      }),
    }),
    
    deleteFavorite: builder.mutation<void, { userId: string; postId: string }>({
      query: ({ userId, postId }) => ({
        url: '/favorites/delete',
        method: 'DELETE',
        body: {
          userId,
          postId,
        },
      }),
    }),
  }),
});


export const { useGetFavoritesQuery, useAddFavoriteMutation, useDeleteFavoriteMutation } = favoritesApi;
