import { createSlice } from "@reduxjs/toolkit";

interface Property {
  priceRange: any;
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

interface SelecState {
  properties: Property[];
}

const initialSelecState: SelecState = {
  properties: [],
};

const selecSlice = createSlice({
  name: "SelecState",
  initialState: initialSelecState,
  reducers: {
    updateSelec: (state, action) => {
      state.properties = action.payload;
    },
  },
});

export const { updateSelec } = selecSlice.actions;

export default selecSlice.reducer;
