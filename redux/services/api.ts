import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

require('dotenv').config();

const  DEPLOY_BACK_URL = 'http://localhost:3001';

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
  floorNumber: number;
  aptNumber: number;
  price: number;
  description: string;
  id: string;
  images: string[];
  userId: string | null;
  score: number | null;
}
export interface Score {
  id: string,
  type: string
  score: string;
  feedBack: number;
  postId: string;
  userId: string;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({ baseUrl: DEPLOY_BACK_URL }),
  //baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  
  endpoints: (builder) => ({
    getPostsByCondition: builder.query<Post[], string>({
      query: (condition) => `posts/condition/${condition}`,
    }),

    getPosts: builder.query<Post[], string>({
      query: () => "posts",
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
    }),
    getPost: builder.query<Post, string | number>({
      query: (id) => `posts/${id}`,
    }),
    updatePost: builder.mutation<
      Post,
      { id: number; updatedPost: Partial<Post> }
    >({
      query: ({ id, updatedPost }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: updatedPost,
      }),
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
    getScore: builder.query<number | null, string>({
      query: (postId) => `score/${postId}`, // Ruta actualizada para obtener el score de un post
    }),
    getReviews: builder.query<Score[], string>({
      query: (postId) => `score/${postId}`, // Ruta actualizada para obtener las reseñas de un post
    }),
    createScore: builder.mutation<Score, Partial<Score>>({
      query: (newScore) => ({
        url: 'score/create', // Ruta actualizada para crear un score
        method: 'POST',
        body: newScore,
      }),
    }),
  }),
});

export const {
  useGetPostsByConditionQuery,
  useGetPostsQuery, // GET all
  useCreatePostMutation, // POST
  useGetPostQuery, // GET one
  useUpdatePostMutation, // PATCH (Update)
  useDeletePostMutation, // DELETE

  useGetScoreQuery, // GET score of a post
  useGetReviewsQuery, // GET reviews for a specific post
  useCreateScoreMutation, // POST a review to a post
} = postsApi;

