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

interface favorite {
  properties: Property[];
}

const initialfavorite: favorite = {
  properties: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: initialfavorite,
  reducers: {
    add: (state, action) => {
      state.properties.push(action.payload);
    },
    remove: (state, action) => {
        // Busca el índice del objeto en el array
        const index = state.properties.findIndex(property => property.id === action.payload.id);
  
        if (index !== -1) {
          // Si se encuentra el objeto, lo elimina del array
          state.properties.splice(index, 1);
        }
      },
    },
});

export const { add,remove } = favoriteSlice.actions;

export default favoriteSlice.reducer;
