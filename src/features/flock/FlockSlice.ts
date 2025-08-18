import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

export type FlockItem = {
  id: string;
  type: string;
  count: number;
};

export interface FlockState {
  flock: FlockItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FlockState = {
  flock: [],
  status: "idle",
  error: null,
};


export const fetchFlock = createAsyncThunk<FlockItem[]>(
  "flock/fetchFlock",
  async () => {
    const { data, error } = await supabase.from("flock").select("*");
    if (error) throw error;
    return data as FlockItem[];
  }
);

export const updateFlockCount = createAsyncThunk<
  FlockItem,
  { id: string; count: number },
  { rejectValue: string }
>("flock/updateFlockCount", async ({ id, count }, { rejectWithValue }) => {
  const { data, error } = await supabase
    .from("flock")
    .update({ count })
    .eq("id", id)
    .select()
    .single();

  if (error || !data) return rejectWithValue(error?.message || "Nie udało się zaktualizować");
  return data as FlockItem;
});


export const flockSlice = createSlice({
  name: "flock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlock.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFlock.fulfilled, (state, action: PayloadAction<FlockItem[]>) => {
        state.flock = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchFlock.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Błąd pobierania stada";
      })
      .addCase(updateFlockCount.fulfilled, (state, action: PayloadAction<FlockItem>) => {
        const updated = action.payload;
        const index = state.flock.findIndex((f) => f.id === updated.id);
        if (index !== -1) {
          state.flock[index].count = updated.count;
        }
      })
      .addCase(updateFlockCount.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? "Błąd aktualizacji stada";
      });
  },
});


export const flockReducer = flockSlice.reducer;
