import React, { useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpensesChart from "./components/charts/ExpensesChart";
import IncomeChart from "./components/charts/IncomeChart";
import MonthlyBarChart from "./components/charts/MonthlyBarChart";
import SummaryCards from "./components/SummaryCards";
import ThemeToggle from "./components/ThemeToggle";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "./features/transactions/TransactionsSlice";
import EggForm from "./components/EggForm";
import "./App.css";
import EggChart from "./components/charts/EggChart";
import FlockManager from "./components/ChickenManager";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="App">
      <ThemeToggle />
      <h1>Mój Kurnik 💰</h1>
      <SummaryCards />
      <div className="dashboard-grid">
        <div className="widget-container">
          <div className="widget">
            <EggForm />
          </div>
          <div className="widget">
            <FlockManager />
          </div>
          <div className="widget-full">
            <EggChart />
          </div>
        </div>
      </div>

      <div className="side-by-side">
        <div className="left">
          <TransactionForm />
        </div>
        <div className="right">
          <div className="chart-box">
            <IncomeChart /> <ExpensesChart />
          </div>
        </div>
      </div>
      <div className="charts">
        <div className="chart-box">
          <MonthlyBarChart />
        </div>
      </div>
      <div className="glass-box transaction-list">
        <TransactionList />
      </div>
    </div>
  );
}

export default App;
