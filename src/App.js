import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "./features/transactions/TransactionsSlice";

// Komponenty ogólne
import ThemeToggle from "./components/ThemeToggle";
import SummaryCards from "./components/SummaryCards";

// Kurnik
import EggForm from "./components/EggForm";
import FlockManager from "./components/ChickenManager";
import EggChart from "./components/charts/EggChart";

// Finanse
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpensesChart from "./components/charts/ExpensesChart";
import MonthlyBarChart from "./components/charts/MonthlyBarChart";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Mój Kurnik 💰</h1>
      {/* Podsumowanie salda */}
      <SummaryCards />
      {/* Kurnik: jajka i stado */}
      <div className="widget-container">
        <div className="widget">
          <EggForm />
        </div>
        <div className="widget">
          <FlockManager />
        </div>
      </div>{" "}
      <div className="widget-container">
        <div className="widget-full">
          <EggChart />
        </div>
      </div>
      {/* Finanse: formularz i wykres kołowy */}
      <div className="side-by-side">
        <div className="left glass-box">
          <TransactionForm />
        </div>
        <div className="right glass-box">
          <div className="chart-box">
            <ExpensesChart />
          </div>
        </div>
      </div>
      {/* Finanse: wykres miesięczny */}
      <div className="glass-box">
        <div className="chart-box">
          <MonthlyBarChart />
        </div>
      </div>
      {/* Lista transakcji */}
      <div className="glass-box transaction-list">
        <TransactionList />
      </div>
    </div>
  );
}

export default App;
