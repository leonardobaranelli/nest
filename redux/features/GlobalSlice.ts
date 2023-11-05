import { createSlice } from "@reduxjs/toolkit";

interface Property {
  days: number | null;
  type: string;
  condition: string;
  image: string[];
  title: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  floorNumber: string;
  aptNumber: string;
  price: number;
  description: string;
  id: string;
  images: string[];
  userId: string | null;
}

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
