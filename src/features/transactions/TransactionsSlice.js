import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL + "/rest/v1/transactions";
const apiKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(supabaseUrl, {
        method: "GET",
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        return rejectWithValue(
          `Błąd pobierania danych z Supabase: ${response.status} – ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Nieznany błąd");
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${supabaseUrl}?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          Prefer: "return=minimal",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        return rejectWithValue(`Błąd usuwania transakcji: ${errorText}`);
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Nieznany błąd");
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default transactionsSlice.reducer;
