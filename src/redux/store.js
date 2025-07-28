import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/TransactionsSlice";
import { loadState, saveState } from "../utils/localStorage";
import flockReducer from "../features/flock/FlockSlice";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    flock: flockReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    transactions: store.getState().transactions,
  });
});

export default store;
