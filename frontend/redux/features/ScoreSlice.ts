import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchScores = createAsyncThunk('fetchScores', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/score`);
  return response.data;
});


  const scoresSlice = createSlice({
    name: 'scores',
    initialState: { scores: [], status: 'idle', error: null as string | null },
  reducers: {   


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
        // Utiliza el operador ?? para proporcionar un valor predeterminado en caso de que action.error.message sea undefined
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export default scoresSlice.reducer;

