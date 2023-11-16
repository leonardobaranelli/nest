import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios"; 



export interface Post {
  userId: string;
  postId: string;
  images: string[];
  title: string;
  price: number;
}

interface FavoritesState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  posts: [],
  loading: false,
  error: null,
};

export const getFavorite = createAsyncThunk(
  "favorites/getFavorite",
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/favorites/${userId}`);

      return response.data;
    } catch (error) {
      console.error('Error en la solicitud GET:', error);
      return rejectWithValue("Hubo un error al obtener favoritos");
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export default favoritesSlice.reducer;

