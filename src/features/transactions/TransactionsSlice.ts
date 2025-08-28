import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TransactionsState, Transaction } from "./types";
import { fetchTransactions, addTransaction, deleteTransaction } from "./transactionsThunks";

const initialState: TransactionsState = {
  transactions: [],
  status: "idle",
  error: null,
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTransactions.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => { state.status = "succeeded"; state.transactions = action.payload; })
      .addCase(fetchTransactions.rejected, (state, action) => { state.status = "failed"; state.error = action.payload ?? action.error.message ?? null; })
      // ADD
      .addCase(addTransaction.pending, (state) => { state.status = "loading"; })
      .addCase(addTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => { state.status = "succeeded"; state.transactions.push(action.payload); })
      .addCase(addTransaction.rejected, (state, action) => { state.status = "failed"; state.error = action.payload ?? action.error.message ?? null; })
      // DELETE
      .addCase(deleteTransaction.pending, (state) => { state.status = "loading"; })
      .addCase(deleteTransaction.fulfilled, (state, action: PayloadAction<string>) => { state.status = "succeeded"; state.transactions = state.transactions.filter(t => t.id !== action.payload); })
      .addCase(deleteTransaction.rejected, (state, action) => { state.status = "failed"; state.error = action.payload ?? action.error.message ?? null; });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
