// src/features/flock/flockSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3001/flock";

export const fetchFlock = createAsyncThunk("flock/fetchFlock", async () => {
  const res = await fetch(API_URL);
  return await res.json();
});

export const updateFlockCount = createAsyncThunk(
  "flock/updateFlockCount",
  async ({ id, count }) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count }),
    });
    return await res.json();
  }
);

const flockSlice = createSlice({
  name: "flock",
  initialState: {
    flock: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlock.fulfilled, (state, action) => {
        state.flock = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateFlockCount.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.flock.findIndex((f) => f.id === updated.id);
        if (index !== -1) {
          state.flock[index].count = updated.count;
        }
      });
  },
});

export default flockSlice.reducer;
