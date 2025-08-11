import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTransactionsApi,
  addTransactionApi,
  deleteTransactionApi,
} from "../../api/supabaseApi";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const data = await fetchTransactionsApi();
    return data;
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction) => {
    const data = await addTransactionApi(transaction);
    return data;
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id) => {
    await deleteTransactionApi(id);
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
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export default transactionsSlice.reducer;
