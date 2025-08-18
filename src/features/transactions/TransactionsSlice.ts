import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTransactionsApi,
  addTransactionApi,
  deleteTransactionApi,
} from "../../api/supabaseApi";
import type { Transaction } from "./types";

interface TransactionsState {
  transactions: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  status: "idle",
  error: null,
};


export const fetchTransactions = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>("transactions/fetchTransactions", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchTransactionsApi();
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message ?? "Błąd pobierania danych");
  }
});

export const addTransaction = createAsyncThunk<
  Transaction,
  Transaction,
  { rejectValue: string }
>("transactions/addTransaction", async (transaction, { rejectWithValue }) => {
  try {
    const data = await addTransactionApi(transaction);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message ?? "Błąd dodawania transakcji");
  }
});

export const deleteTransaction = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("transactions/deleteTransaction", async (id, { rejectWithValue }) => {
  try {
    await deleteTransactionApi(id);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.message ?? "Błąd usuwania transakcji");
  }
});


const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.status = "succeeded";
          state.transactions = action.payload;
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? null;
      })
      .addCase(addTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addTransaction.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.status = "succeeded";
          state.transactions.push(action.payload);
        }
      )
      .addCase(addTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? null;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteTransaction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.transactions = state.transactions.filter(
            (t) => t.id !== action.payload
          );
        }
      )
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? null;
      });
  },
});

export default transactionsSlice.reducer;
