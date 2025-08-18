import React from "react";
import SectionBox from "../components/SectionBox";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ExpensesChart from "../components/charts/ExpensesChart";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";

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

export default FinanseSection;
