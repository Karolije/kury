import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/TransactionsSlice";
import flockReducer from "../features/flock/FlockSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    flock: flockReducer,
  },
});
