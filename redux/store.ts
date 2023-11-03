/*import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./features/PostSlice";
import { filterSlice } from "../redux/services/Filter"; 
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    filter: filterSlice.reducer, // Agrega el reducer del slice de filtro
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([postsApi.middleware]),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;*/


import { configureStore } from '@reduxjs/toolkit';
import postReducer from "./services/getPost";
import homeReducer from "./features/GlobalSlice";
import { postsApi } from '@/redux/services/api';
import selecReducer from "./features/SelecSlice"
import favoriteReducer from "./features/Favorite"

export const store = configureStore({
    reducer: {
      posteo: postReducer,
      home: homeReducer,
      selec: selecReducer,
      favorite: favoriteReducer,
      [postsApi.reducerPath]: postsApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
