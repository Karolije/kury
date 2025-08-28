import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTransactionsApi, addTransactionApi, deleteTransactionApi } from "../../api/supabaseApi";
import type { Transaction, TransactionInput } from "./types";

export const fetchTransactions = createAsyncThunk<Transaction[], void, { rejectValue: string }>(
  "transactions/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchTransactionsApi();
      return data.map(item => ({
        id: item.id ?? "",
        type: item.type,
        amount: item.amount,
        category: item.category ?? "",
        note: item.note ?? "",
        date: item.date,
        quantity: item.quantity ?? null,
        price: item.price ?? null,
      }));
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Błąd pobierania danych");
    }
  }
);

export const addTransaction = createAsyncThunk<
  Transaction,          // to co zwraca backend (już z id)
  TransactionInput,     // to co wysyłamy (bez id)
  { rejectValue: string }
>(
  "transactions/addTransaction",
  async (transaction, { rejectWithValue }) => {
    try {
      const data = await addTransactionApi(transaction); // backend zwraca pełny Transaction z id
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Błąd dodawania transakcji");
    }
  }
);


export const deleteTransaction = createAsyncThunk<string, string, { rejectValue: string }>(
  "transactions/deleteTransaction",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTransactionApi(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Błąd usuwania transakcji");
    }
  }
);
