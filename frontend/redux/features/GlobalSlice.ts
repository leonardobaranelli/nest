import { createSlice } from "@reduxjs/toolkit";
import { Property } from "./SelecSlice";


interface homeState {
  properties: Property[];
}

const initialHomeState: homeState = {
  properties: [],
};

const homeSlice = createSlice({
  name: "homeState",
  initialState: initialHomeState,
  reducers: {
    updateState: (state, action) => {
      state.properties = action.payload;
    },
  },
});

export const { updateState } = homeSlice.actions;

export default homeSlice.reducer;
