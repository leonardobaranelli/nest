import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// la carpeta feactures los archivos  se colocan como  funciones con el estado  se coloca  NombredelafuncionSlice

// El esto  en donde estan los estados  y  las funciones que modifican  el  estado 

// estos son los estados  
type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 30,
};

// Funciones que modifican el  estado 

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Exporta la fincion 

export const {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  reset,
} = counterSlice.actions;

export default counterSlice.reducer;
