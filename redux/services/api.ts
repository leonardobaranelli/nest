import { User } from "@/app/shared/userTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type } from "os";

require("dotenv").config();

const { DEPLOY_BACK_URL } = process.env;

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
}
enum Rols {
  admin = "admin",
  user = "user",
}
type RolType = Rols;

export interface Users {
  id: string;
  rol: RolType;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: null;
  personalId: null;
  deletedAt: Date | string;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),

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
    getUser: builder.query<Users[], string>({
      query: () => "users",
    }),
    deleteUser: builder.mutation<User, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
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
  useDeleteUserMutation,
  useGetUserQuery,
} = postsApi;
