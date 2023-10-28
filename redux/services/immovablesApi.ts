import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk("user/fetchUserData", async () => {
  const response = await axios.get("http://localhost:3001/posts/condition/sell"); // Reemplaza con la URL de tu servidor
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null, // Inicializa data como null
    loading: "idle",
    error: null, // Inicializa error como null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload; // Asigna el valor solo si no es undefined
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message; // Asigna el valor solo si no es undefined
      });
  },
});

export default userSlice.reducer;
