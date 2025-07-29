// src/features/flock/flockSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

export const fetchFlock = createAsyncThunk("flock/fetchFlock", async () => {
  const { data, error } = await supabase.from("flock").select("*");
  if (error) throw error;
  return data;
});

export const updateFlockCount = createAsyncThunk(
  "flock/updateFlockCount",
  async ({ id, count }) => {
    const { data, error } = await supabase
      .from("flock")
      .update({ count })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);

const flockSlice = createSlice({
  name: "flock",
  initialState: {
    flock: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFlock.fulfilled, (state, action) => {
        state.flock = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchFlock.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
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
