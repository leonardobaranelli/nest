import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


require('dotenv').config();

const { DEPLOY_BACK_URL } = process.env;

export interface UserData {
  id: string;
  rol: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  personalId: string;
  emailverifique: boolean;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  // baseQuery: fetchBaseQuery({ baseUrl: DEPLOY_BACK_URL }),
  endpoints: (builder) => ({
    userVerify: builder.query<UserData, { email: string, token: string }>({
      query: ({ email, token }) => `auth/verify?email=${email}&token=${token}`,
    }),
  }),
});

export const { useUserVerifyQuery } = usersApi;