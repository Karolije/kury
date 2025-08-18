import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/TransactionsSlice";
import flockReducer from "../features/flock/FlockSlice";


export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    flock: flockReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;