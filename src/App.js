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
      <h1>Mój portfel 💰</h1>
      <div className="top-section">
        <SummaryCards />
        <div className="glass-box">
          <TransactionForm />
        </div>
      </div>
      <div className="glass-box">
        <div>
          <EggForm />
        </div>
      </div>
      <div className="chart-box">
        <div>
          <EggChart />
        </div>
      </div>
      <div className="glass-box transaction-list">
        <TransactionList />
      </div>
      <div className="glass-box">
        <FlockManager />
      </div>
      <div className="charts">
        <div className="chart-box">
          <IncomeChart />
        </div>
        <div className="chart-box">
          <ExpensesChart />
        </div>
      </div>
      <div className="chart-box">
        <MonthlyBarChart />
      </div>
    </div>
  );
}

export default App;
