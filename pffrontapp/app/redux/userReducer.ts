import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Aquí puedes definir la estructura inicial del usuario
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
