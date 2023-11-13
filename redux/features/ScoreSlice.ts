import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define una acción asincrónica para cargar todos los puntajes desde el servidor
export const fetchScores = createAsyncThunk('fetchScores', async () => {
  const response = await axios.get('http://localhost:3001/score');
  return response.data;
});

const scoresSlice = createSlice({
  name: 'scores',
  initialState: { scores: [], status: 'idle', error: null },
  reducers: {
    // Puedes agregar acciones síncronas aquí para modificar el estado directamente si es necesario
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchScores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.scores = action.payload;
      })
      .addCase(fetchScores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default scoresSlice.reducer;

// Exporta acciones si es necesario
// export const { actionName } = scoresSlice.actions;
