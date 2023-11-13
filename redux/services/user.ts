// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// require('dotenv').config();

// const { DEPLOY_BACK_URL } = process.env;

// export interface UserData {
//   id: string;
//   rol: string;
//   username: string;
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   personalId: string;
// }

// export const usersApi = createApi({
//   reducerPath: "usersApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
// //   baseQuery: fetchBaseQuery({ baseUrl: DEPLOY_BACK_URL }),
//   endpoints: (builder) => ({
//     getUserByEmail: builder.query<UserData, string>({
//       query: (email) => users/email/${email},
//     }),
//     getAllUsers: builder.query<UserData[], void>({
//       query: () => users,
//     }),
//     createUser: builder.mutation<UserData, Partial<UserData>>({
//       query: (newUser) => ({
//         url: users,
//         method: 'POST',
//         body: newUser,
//       }),
//     }),
//     getOneUser: builder.query<UserData, string>({
//       query: (id) => users/${id},
//     }),
//     updateUser: builder.mutation<UserData, { id: string, data: Partial<UserData> }>({
//       query: ({ id, data }) => ({
//         url: users/${id},
//         method: 'PATCH',
//         body: data,
//       }),
//     }),
//     deleteUser: builder.mutation<void, string>({
//       query: (id) => ({
//         url: users/${id},
//         method: 'DELETE',
//       }),
//     }),
//   }),
// });

// export const {
//   useGetUserByEmailQuery,
//   useGetAllUsersQuery,
//   useCreateUserMutation,
//   useGetOneUserQuery,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
// } = usersApi;