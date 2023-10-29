import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./features/PostSlice"; 
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer, // Agrega el reducer de la API
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([postsApi.middleware]), // Agrega el middleware de  la API
});
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
