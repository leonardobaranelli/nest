import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

enum Rols {
  admin = "admin",
  user = "user",
}
type RolType = Rols;

export interface UserData {
  id: string;
  rol: RolType;
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
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),  
  endpoints: (builder) => ({
    userVerify: builder.query<UserData, { email: string, token: string }>({
      query: ({ email, token }) => `/auth/verify?email=${email}&token=${token}`,
    }),
  }),
});

export const { useUserVerifyQuery } = usersApi;