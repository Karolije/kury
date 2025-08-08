import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "./features/transactions/TransactionsSlice";
import SectionBox from "./components/SectionBox";
import SummaryCards from "./components/SummaryCards";
import EggForm from "./components/EggForm";
import FlockManager from "./components/ChickenManager";
import EggChart from "./components/charts/EggChart";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpensesChart from "./components/charts/ExpensesChart";
import MonthlyBarChart from "./components/charts/MonthlyBarChart";

import "./App.css";

const KurnikSection = () => (
  <>
    <SectionBox>
      <div className="widget-container">
        <div className="widget">
          <EggForm />
        </div>
        <div className="widget">
          <FlockManager />
        </div>
      </div>
    </SectionBox>

    <SectionBox>
      <div className="widget-container">
        <div className="widget-full">
          <EggChart />
        </div>
      </div>
    </SectionBox>
  </>
);

const FinanseSection = () => (
  <>
    <SectionBox>
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
    </SectionBox>

    <SectionBox>
      <div className="chart-box">
        <MonthlyBarChart />
      </div>
    </SectionBox>

    <SectionBox>
      <TransactionList />
    </SectionBox>
  </>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Mój Kurnik 💰</h1>
      <SectionBox>
        <SummaryCards />
      </SectionBox>
      <KurnikSection />
      <FinanseSection />
    </div>
  );
}

export default App;
