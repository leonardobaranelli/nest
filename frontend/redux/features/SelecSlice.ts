import { createSlice } from "@reduxjs/toolkit";

export interface Property {
  priceRange: any;  
  available: boolean;
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
  score: number | null;
}

export interface PropertyReview {
  type: string
  score: string;
  feedBack: number;
  postId: string;
  userId: string;
}

interface SelecState {
  properties: Property[];
  propertyReviews: PropertyReview[];
}

const initialSelecState: SelecState = {
  properties: [],
  propertyReviews:[],
};

const selecSlice = createSlice({
  name: "SelecState",
  initialState: initialSelecState,
  reducers: {
    updateSelec: (state, action) => {
      state.properties = action.payload;
    },
    addPropertyReview: (state, action) => {
      state.propertyReviews.push(action.payload);
    },
    
  },
});

export const { updateSelec, addPropertyReview } = selecSlice.actions;

export default selecSlice.reducer;
