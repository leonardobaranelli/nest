import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Post {
  days: number | null;
  type: string;
  condition: string;
  title: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  floorNumber: number;
  aptNumber: number;
  price: number;
  description: string;
  id: string | number;
  images: string[];
  userId: string | null;
}

interface PostState {
  posts: Post[];
  originalPosts: Post[];
}

const initialState: PostState = {
  posts: [],
  originalPosts: [],
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get("http://localhost:3001/posts");
    console.log("respuesta backend", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
});

const postSlice = createSlice({
  name: "posteo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.originalPosts = action.payload;
    });
  },
});

export default postSlice.reducer;
