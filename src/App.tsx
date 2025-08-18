import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "./features/transactions/TransactionsSlice";
import {SummarySection} from "./sections/SummarySection";
import {KurnikSection} from "./sections/KurnikSection";
import {FinanseSection} from "./sections/FinanseSection";
import type { AppDispatch } from "./redux/store"; 

import "./App.css";

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Mój Kurnik 💰</h1>
      <SummarySection />
      <KurnikSection />
      <FinanseSection />
    </div>
  );
}

