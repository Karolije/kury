import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const supabaseUrl =
  "https://swvtsttgmzpoyogwnzqg.supabase.co/rest/v1/transactions";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dnRzdHRnbXpwb3lvZ3duenFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NzExNjcsImV4cCI6MjA2OTM0NzE2N30.VF13EPbvzZsKA0wstWuo9EkjHDSM8_Mw7IAK-FGRCeE";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
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
      throw new Error(
        `Błąd pobierania danych z Supabase: ${response.status} – ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  }
);
export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id) => {
    await fetch(`${supabaseUrl}?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        Prefer: "return=minimal",
      },
    });
    return id;
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
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default transactionsSlice.reducer;
